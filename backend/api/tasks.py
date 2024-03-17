import os
import mimetypes
from celery import shared_task
from celery.utils.log import get_task_logger
from root.testdata import RESULT
from .models import Recognition, RecognitionChoices
from .utils import convert_to_wav
from . models import File


logger = get_task_logger('root')


@shared_task
def recognition_task(obj_id):
    qs = Recognition.objects.filter(id=obj_id)
    instance = qs.last()
    if instance:
        # проверка формата
        mt = mimetypes.guess_type(instance.file.file.path)
        if mt == 'video/mp4':
            path = convert_to_wav(instance.file.file.path)
            instance.file.save(os.path.basename(path), File(open(path ,"wb")), save=True)
        else:
            path = instance.file.file.path
        qs.update(status=RecognitionChoices.RECEIVED)
        return True
