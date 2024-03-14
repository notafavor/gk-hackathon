from hashlib import md5
import os
from django.conf import settings
from rest_framework.response import Response
from django.utils.text import slugify
from django.contrib.auth import get_user_model
from celery.result import AsyncResult

USER_MODEL = get_user_model()


def get_file_path(instance, filename):
    name, ext = os.path.splitext(filename)
    hash_code = md5((settings.SECRET_KEY + name).encode('utf-8')).hexdigest()
    path = os.path.join('media', 'files', hash_code[:3])
    return os.path.join(path, '%s.%s%s' % (hash_code[:16], slugify(name, allow_unicode=True), ext))

def get_status(request, task_id):
    task_result = AsyncResult(task_id)
    result = {
        "task_id": task_id,
        "task_status": task_result.status,
        "task_result": task_result.result
    }
    return Response(result, status=200)