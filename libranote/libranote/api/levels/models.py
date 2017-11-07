from django.db import models
from libranote.api.schools.models import School

class Level(models.Model):
    school = models.ForeignKey(School, on_delete=models.CASCADE)
    title = models.CharField(max_length=100, blank=True, default='')
