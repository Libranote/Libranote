from django.db import models
from libranote.api.accounts.models import Account
from libranote.api.classes.models import Class
from libranote.api.subjects.models import Subject

class Student(models.Model):
    account = models.ForeignKey(Account)
    klass = models.ForeignKey(Class)
    group = models.IntegerField()
    options = models.ManyToManyField(Subject)
