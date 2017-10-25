from django.db import models

class School(models.Model):
    title = models.CharField(max_length=100, blank=True, default='')
    adress = models.CharField(max_length=100, blank=True, default='')
