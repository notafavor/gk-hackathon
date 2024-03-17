# import boto3
import torch
import torchaudio
from transformers import T5ForConditionalGeneration, T5Tokenizer, AutoModelForSequenceClassification, BertTokenizerFast
from pyannote.audio import Pipeline
from faster_whisper import WhisperModel
import utils
import requests
import time
import tempfile
import os

HF_TOKEN = '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'
WHISPER_SIZE = 'medium'
SUMMARY_MODEL = 'd0rj/rut5-base-summ'
CLASSIFIER_MODEL = 'cointegrated/rubert-tiny-bilingual-nli'
URL = "https://team5.opvk.tech/api/v1/recognitions/?q=new"


class AudioProcessor:
    def __init__(self, hf_token, whisper_model_size, summary_model_name, classifier_model_name):
        self.hf_token = hf_token
        self.whisper_model_size = whisper_model_size
        self.summary_model_name = summary_model_name
        self.classifier_model_name = classifier_model_name
        self.classes = ['поручение','информация','вопрос']
        self._initialize_models()

    def _initialize_models(self):
        self.diarization_pipeline = Pipeline.from_pretrained("pyannote/speaker-diarization-3.1", use_auth_token=self.hf_token)
        self.whisper_model = WhisperModel(self.whisper_model_size, device="cuda", compute_type="int8")
        self.summary_model = T5ForConditionalGeneration.from_pretrained(self.summary_model_name)
        self.summary_tokenizer = T5Tokenizer.from_pretrained(self.summary_model_name)
        self.classifier_model = AutoModelForSequenceClassification.from_pretrained(self.classifier_model_name)
        self.classifier_tokenizer = BertTokenizerFast.from_pretrained(self.classifier_model_name)

    # def read_file_from_s3(self, bucket_name, file_key):
    #     s3_client = boto3.client('s3', aws_access_key_id=self.aws_access_key_id, aws_secret_access_key=self.aws_secret_access_key, region_name=self.region_name)
    #     obj = s3_client.get_object(Bucket=bucket_name, Key=file_key)
    #     return obj['Body'].read()

    def transcribe_and_diarize(self, audio_content):
        asr_result, _ = self.whisper_model.transcribe(audio_content)
        waveform, sample_rate = torchaudio.load(audio_content)
        self.diarization_pipeline.to(torch.device("cuda"))  
        diarization_result = self.diarization_pipeline({"waveform": waveform, "sample_rate": sample_rate})
        final_result = utils.diarize_text(asr_result, diarization_result)
        return final_result

    def group_speaker_replies(self, text):
        replies = text.split('|||')  
        segments = []
        current_segment = []
        for reply in replies:
            if len(self.summary_tokenizer.encode(' '.join(current_segment + [reply]))) > 512:
                segments.append(' '.join(current_segment))
                current_segment = [reply]
            else:
                current_segment.append(reply)
        if current_segment:
            segments.append(' '.join(current_segment))
        return segments
    
    def summarize_segments(self, segments):
        summaries = []
        for segment in segments:
            input_ids = self.summary_tokenizer(segment, return_tensors="pt").to(torch.device("cuda"))
            generated_tokens = self.summary_model.generate(**input_ids)
            summary = self.summary_tokenizer.decode(generated_tokens[0], skip_special_tokens=True)
            summaries.append(summary)
        return summaries
    
    def summarize(self, transcription):
        segments = self.group_speaker_replies(transcription)
        self.summary_model.to(torch.device("cuda")) 
        summaries = self.summarize_segments(segments)
        return ' '.join(summaries)


    def predict_zero_shot(text, label_texts, model, tokenizer, label='entailment', normalize=True):
        tokens = tokenizer([text] * len(label_texts), label_texts, truncation=True, return_tensors='pt', padding=True).to(torch.device("cuda"))
        with torch.inference_mode():
            result = torch.softmax(model(**tokens.to(model.device)).logits, -1)
        proba = result[:, model.config.label2id[label]].cpu().numpy()
        if normalize:
            proba /= sum(proba)
        return proba

    def process_wav_to_json(self, file_path):
        # audio_content = self.read_file_from_s3(bucket_name, file_key)
        transcription = self.transcribe_and_diarize(file_path)
        torch.cuda.empty_cache
        self.classifier_model.to(torch.device("cuda"))
        text = ''
        text_buf = ''
        seg_buf = ''
        spk_buf = ''
        results = {
            "status": "success", 
            "result": [],
            "summary": "",
            "tasks": []            
        }
        for seg, spk, sent in transcription:
            if spk == spk_buf:
                text += f'{sent} '
            else:
                text += f'{spk}: {sent}'
            results["result"].append({
                'msg': sent,
                'speaker': spk,
                'time': seg.start  
            })
            spk_buf = spk

            for s in sent.split():
                proba = self.predict_zero_shot(s, self.classes, self.classifier_model, self.classifier_tokenizer)
                if proba.argmax() == 0:
                    tasks += f'{spk}: {s}'
                    results["tasks"].append({
                        'msg': s,
                        'speaker': spk,
                        'time': 'время вышло'
                    })
        
        summ = self.summarize(text)
        results['summary'] = summ
        print(text)
        print()
        print()
        print()
        print(summ)
        return results




proc = AudioProcessor(HF_TOKEN, WHISPER_SIZE, SUMMARY_MODEL, CLASSIFIER_MODEL)
while True:
    try:
        response = requests.get(URL, verify=False, auth=('admin', 'admin'))
        status = response.json()
        if status:
            print(status)
            audio_content = status[0]['_file']['file']
            # audio_content = "https://team5.opvk.tech/media/files/3d0/3d0815f23fa60d40.15c95406695e0d95ouch-5_x4xrac2.wav"
            response_file = requests.get(audio_content, verify=False, auth=('admin', 'admin'))
            with tempfile.NamedTemporaryFile(delete=False) as tmp_file:
                tmp_file.write(response_file.content)
                tmp_file_name = tmp_file.name
            print(f"Файл временно сохранен как {tmp_file_name}")
            URL_patch = f"https://team5.opvk.tech/api/v1/recognitions/{status[0]['id']}/"
            data = proc.process_wav_to_json(tmp_file_name)
            response = requests.patch(URL_patch, json=data, verify=False, auth=('admin', 'admin'))
            os.remove(tmp_file_name)
            print(f"Файл {tmp_file_name} был удален")
        else:
            print(f"Отдых")

        time.sleep(10)    

    except requests.exceptions.HTTPError as errh:
        print(f"HTTP Error: {errh}")
    except requests.exceptions.ConnectionError as errc:
        print(f"Error Connecting: {errc}")
    except requests.exceptions.Timeout as errt:
        print(f"Timeout Error: {errt}")
    except requests.exceptions.RequestException as err:
        print(f"Oops: Something Else: {err}")