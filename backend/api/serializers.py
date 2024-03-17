from rest_framework import serializers
from . import models


class ProtectedSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        user = self.context["view"].request.user
        if user.is_authenticated:
            validated_data["author"] = user
        return super().create(validated_data)

    def update(self, instance, validated_data):
        user = self.context["view"].request.user
        if user.is_authenticated:
            validated_data["author"] = user
        return super().update(instance, validated_data)


class FileSerializer(ProtectedSerializer):
    class Meta:
        model = models.File
        fields = ["id", "file", "name", "dt_create", "author"]


class RecognitionSerializer(ProtectedSerializer):
    _file = FileSerializer(read_only=True, source="file")

    class Meta:
        model = models.Recognition
        fields = ["id", "file", "_file", "status", "dt_create", "author", "result", "channel", "tasks", "summary"]
