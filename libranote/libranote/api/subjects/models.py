from django.db import models
from libranote.api.accounts.models import Account

class Subject(models.Model):
    name = models.CharField(blank=True, default='')
    optional = models.BooleanField()
    teachers = models.ManyToManyField(Account)
