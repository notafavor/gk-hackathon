from django.contrib import admin
from . import models

@admin.register(models.Recognition)
class RecognitionAdmin(admin.ModelAdmin):
    pass

@admin.register(models.File)
class FileAdmin(admin.ModelAdmin):
    pass