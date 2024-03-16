from django.contrib.auth.models import User
from rest_framework import permissions, viewsets
from api.utils import send_channel_message
from django.shortcuts import get_object_or_404
from root.serializers import UserSerializer
from . import models
from . import serializers


class PotectedViewMixin:
    def get_queryset(self):
        queryset = super().get_queryset()
        if not self.request.user.is_staff:
            queryset = queryset.filter(author=self.request.user)
        return queryset


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]


class RecognitionViewSet(PotectedViewMixin, viewsets.ModelViewSet):
    queryset = models.Recognition.objects.all()
    serializer_class = serializers.RecognitionSerializer
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        send_channel_message(instance.channel, {"msg": "test", "type": "chat_message"})
        return super().retrieve(request, *args, **kwargs)


class FileViewSet(PotectedViewMixin, viewsets.ModelViewSet):
    queryset = models.File.objects.all()
    serializer_class = serializers.FileSerializer
