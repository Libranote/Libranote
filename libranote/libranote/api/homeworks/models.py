from django.db import models
from libranote.api.courses.models import Course

class Homework(models.Model):
    description = models.TextField(default='')
    due_course = models.ForeignKey(Course)
    due_week = models.IntegerField()
