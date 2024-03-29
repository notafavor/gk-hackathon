import subprocess
from hashlib import md5
import os
from django.conf import settings
from rest_framework.response import Response
from django.utils.text import slugify
from django.contrib.auth import get_user_model
from celery.result import AsyncResult


USER_MODEL = get_user_model()
WAV_FORMAT = '.wav'


def get_file_params(filename):
    name, ext = os.path.splitext(filename)
    hash_code = md5((settings.SECRET_KEY + name).encode("utf-8")).hexdigest()
    return name, ext, hash_code

def get_file_path(instance, filename):
    name, ext, hash_code = get_file_params(filename)
    path = os.path.join("media", "files", hash_code[:3])
    return os.path.join(path, "%s.%s%s" % (hash_code[:16], slugify(name, allow_unicode=True), ext))

def get_source_file_path(instance, filename):
    name, ext, hash_code = get_source_file_path(filename)
    path = os.path.join("media", "files", "sources", hash_code[:3])
    return os.path.join(path, "%s.%s%s" % (hash_code[:16], slugify(name, allow_unicode=True), ext))

def get_status(request, task_id):
    task_result = AsyncResult(task_id)
    result = {"task_id": task_id, "task_status": task_result.status, "task_result": task_result.result}
    return Response(result, status=200)

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

def send_channel_message(channel_name, message):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.send)(channel_name, message)

def convert_to_wav(file_path):
    path, filenamne = os.path.split(file_path)
    basename, ext = os.path.splitext(filenamne)
    new_path = os.path.join(path, basename + WAV_FORMAT)
    print(new_path, path)
    command = f"ffmpeg -i {file_path} {new_path}"
    if os.path.exists(new_path):
        os.remove(new_path)
    subprocess.call(command, shell=True) # TODO: нужна проверка на дорожку
    return new_path, basename + WAV_FORMAT