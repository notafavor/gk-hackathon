import os
import mimetypes
from celery import shared_task
from celery.utils.log import get_task_logger
from root.testdata import RESULT
from .models import Recognition, RecognitionChoices
from .utils import convert_to_wav
from .models import File
from django.core.files.base import ContentFile


logger = get_task_logger("root")


@shared_task
def recognition_task(obj_id):
    qs = Recognition.objects.filter(id=obj_id)
    instance = qs.last()
    if instance:
        # проверка формата
        mt = mimetypes.guess_type(instance.file.file.path)
        logger.warning(mt)
        if mt[0] == "video/mp4":
            path, basename = convert_to_wav(instance.file.file.path)
            with open(path, "rb") as f:
                instance.file.file.save(basename, f)
        else:
            path = instance.file.file.path
        qs.update(status=RecognitionChoices.RECEIVED)
        return True
