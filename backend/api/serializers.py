from rest_framework import serializers
from . import models


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.File
        fields = ["id", "file", "name", "dt_create", "author"]

class RecognitionSerializer(serializers.ModelSerializer):
    _file = FileSerializer(read_only=True, source="file")
    class Meta:
        model = models.Recognition
        fields = ["id", "file", "_file", "status", "dt_create", "author"]
