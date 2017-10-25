from django.db import models
from libranote.api.subjects.models import Subject
from libranote.api.accounts.models import Account
from libranote.api.classes.models import Class


class Course(models.Model):
    week = models.CharField(blank=True, default='')
    subject = models.ForeignKey(Subject)
    teacher = models.ForeignKey(Account)
    klass = models.ForeignKey(Class)
    group = models.IntegerField(null=True, default=None)
    day = models.CharField(default='Monday')
    start = models.TimeField()
    end = models.TimeField()
