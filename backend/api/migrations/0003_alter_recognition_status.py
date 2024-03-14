# Generated by Django 5.0.3 on 2024-03-14 11:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_recognition_options_recognition_result'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recognition',
            name='status',
            field=models.CharField(choices=[('retry', 'Перезапуск'), ('success', 'Успешно'), ('failure', 'Ошибка'), ('revoked', 'Отменено'), ('started', 'Запущено'), ('pending', 'В очереди'), ('received', 'Получено'), ('rejected', 'Отклонено')], default='pending', max_length=255, verbose_name='Статус'),
        ),
    ]
