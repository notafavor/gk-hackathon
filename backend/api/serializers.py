from rest_framework import serializers
from . import models


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Recognition
        fields = ["file", "name", "dt_create", "author"]

class RecognitionSerializer(serializers.ModelSerializer):
    file = FileSerializer()
    class Meta:
        model = models.Recognition
        fields = ["file", "status", "dt_create", "author"]
