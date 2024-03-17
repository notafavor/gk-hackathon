from django.contrib.auth.models import User
from rest_framework import permissions, viewsets, views
from rest_framework.response import Response
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
    """список пользователей [admin]"""
    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]


class RecognitionViewSet(PotectedViewMixin, viewsets.ModelViewSet):
    """создание задания на распознавание"""
    queryset = models.Recognition.objects.prefetch_related("file").all()
    serializer_class = serializers.RecognitionSerializer
    
    def get_queryset(self):
        qs = super().get_queryset()
        qp = self.request.query_params.get('q')
        only_new = qp and qp == 'new'
        if only_new:
            qs = qs.filter(result__isnull=True, status=models.RecognitionChoices.RECEIVED)
        return qs


class FileViewSet(PotectedViewMixin, viewsets.ModelViewSet):
    """загрузка файла"""
    queryset = models.File.objects.all()
    serializer_class = serializers.FileSerializer


class SendMessageView(views.APIView):
    """
    обработка сообщений в чат
    """
    def post(self, request, *args, **kwargs):
        channel, text = request.data.get("channel"), request.data.get("text")
        if channel:
            qs = models.Recognition.objects.filter(channel=channel)
            if qs.exists():
                instance = qs.last()
                if instance.file:
                    url = request.build_absolute_uri()
                    send_channel_message(instance.channel, {"type": "file", "msg": url})
                
                # TODO: обработать команды
                if text and str(text).startswith('/summary') and instance.summary:
                    send_channel_message(instance.channel, {"type": "chat_message", "msg": str(text)})
                elif text and str(text).startswith('/tasks') and instance.tasks:
                    send_channel_message(instance.channel, {"type": "chat_message", "msg": str(text)})
                else:
                    send_channel_message(
                        instance.channel, {"type": "chat_message", "msg": "in process.."}
                    )
                return Response({"status": "ok"}, status=200)
        return Response({"status": "not found"}, status=404)
