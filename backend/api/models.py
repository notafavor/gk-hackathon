import os
from django.db import models
from api.utils import USER_MODEL, get_file_path
from django.core.validators import FileExtensionValidator


class BaseProtected(models.Model):
    class Meta:
        abstract = True

    dt_create = models.DateTimeField("Время добавления", auto_now_add=True)
    author = models.ForeignKey(
        USER_MODEL,
        related_name="author_%(class)s",
        blank=True,
        null=True,
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return "%s: %s" % (self.__class__.__name__, self.pk)


class File(BaseProtected):
    file = models.FileField(
        verbose_name="Файл", upload_to=get_file_path, validators=[FileExtensionValidator(allowed_extensions=["wav"])]
    )
    name = models.CharField("Имя файла", max_length=255, null=True, blank=True)

    class Meta:
        verbose_name = "Файл"
        verbose_name_plural = "Файлы"

    def __str__(self):
        return "%s %s" % (super().__str__(), self.name)

    def save(self, *args, **kwargs):
        if not self.name:
            self.name = os.path.basename(self.file.name)
        return super().save(*args, **kwargs)


class RecognitionChoices(models.TextChoices):
    NEW = ("new", "создан")
    IN_PROCESS = ("in_process", "обработка")
    COMPLEATED = ("compleated", "завершено")
    ERROR = ("error", "ошибка")


class Recognition(BaseProtected):
    file = models.ForeignKey(File, verbose_name="Файл", null=True, blank=True, on_delete=models.CASCADE)
    status = models.CharField(
        "Статус", max_length=255, choices=RecognitionChoices.choices, default=RecognitionChoices.NEW
    )
    result = models.JSONField(verbose_name="Реузльтат распознавания", null=True, blank=True)

    class Meta:
        verbose_name = "Запрос на распознавание"
        verbose_name_plural = "Запросы на распазнвание"
