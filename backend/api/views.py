from django.contrib.auth.models import User
from rest_framework import permissions, viewsets

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
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]


class RecognitionViewSet(PotectedViewMixin, viewsets.ModelViewSet):
    queryset = models.Recognition.objects.all()
    serializer_class = serializers.RecognitionSerializer


class FileViewSet(PotectedViewMixin, viewsets.ModelViewSet):
    queryset = models.File.objects.all()
    serializer_class = serializers.FileSerializer
