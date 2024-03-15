import time

from celery import shared_task
from celery.utils.log import get_task_logger
from root.testdata import RESULT
from .models import Recognition, RecognitionChoices

logger = get_task_logger('root')


@shared_task
def recognition_task(obj_id):
    qs = Recognition.objects.filter(id=obj_id)
    instance = qs.last()
    if instance:
        time.sleep(15)
        qs.update(result=RESULT, status=RecognitionChoices.SUCCESS)
        return True
