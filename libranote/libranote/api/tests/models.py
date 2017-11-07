from django.db import models
from libranote.api.subjects.models import Subject

class Test(models.Model):
    title = models.CharField(max_length=100, blank=True, default='')
    date = models.DateField(auto_now=True)
    show_at = models.DateField(auto_now=True)
    coefficient = models.FloatField(default=1.0)
    out_of = models.IntegerField()
    subject = models.ForeignKey(Subject)
