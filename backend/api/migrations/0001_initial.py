# Generated by Django 5.0.3 on 2024-03-13 17:21

import api.utils
import django.core.validators
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='File',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dt_create', models.DateTimeField(auto_now_add=True, verbose_name='Время добавления')),
                ('file', models.FileField(upload_to=api.utils.get_file_path, validators=[django.core.validators.FileExtensionValidator(allowed_extensions=['wav'])], verbose_name='Файл')),
                ('name', models.CharField(blank=True, max_length=255, null=True, verbose_name='Имя файла')),
                ('author', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='author_%(class)s', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Файл',
                'verbose_name_plural': 'Файлы',
            },
        ),
        migrations.CreateModel(
            name='Recognition',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dt_create', models.DateTimeField(auto_now_add=True, verbose_name='Время добавления')),
                ('status', models.CharField(choices=[('new', 'создан'), ('in_process', 'обработка'), ('compleated', 'завершено'), ('error', 'ошибка')], default='new', max_length=255, verbose_name='Статус')),
                ('author', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='author_%(class)s', to=settings.AUTH_USER_MODEL)),
                ('file', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='api.file', verbose_name='Файл')),
            ],
            options={
                'verbose_name': 'Запрос на распознование',
                'verbose_name_plural': 'Запросы на распознование',
            },
        ),
    ]