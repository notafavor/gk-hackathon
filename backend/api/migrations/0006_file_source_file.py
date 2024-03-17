# Generated by Django 5.0.3 on 2024-03-17 07:30

import api.utils
import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_recognition_summary_recognition_tasks_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='file',
            name='source_file',
            field=models.FileField(blank=True, null=True, upload_to=api.utils.get_file_path, validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['wav', 'mp4'])], verbose_name='Файл'),
        ),
    ]
