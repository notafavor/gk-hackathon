import React, { useContext, useEffect } from "react";
import TranscriptionItem from "./TranscriptionItem";
import { observer } from "mobx-react-lite";
import "./style.scss";
import { fetchRecognitionsOne } from "../../http/fileApi";
import { useParams } from "react-router-dom";
import { Context } from "../..";

export const TranscriptionList = observer(() => {
  const { recognition } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    const fetchRecognition = async () => {
      recognition.setChannel("");
      try {
        const data = await fetchRecognitionsOne(id);
        recognition.setRecognition(data.result);
        recognition.setChannel(data.channel);
        recognition.setFetchWebSocket(true);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecognition();
    recognition.setFetchWebSocket(false);
  }, []);

  return (
    <div className="TranscriptionListStyle">
      {recognition.recognition.map((item) => (
        <TranscriptionItem key={item.id} item={item} />
      ))}
    </div>
  );
});
