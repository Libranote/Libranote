from django.db import models
from libranote.api.students.models import Student
from libranote.api.tests.models import Test

class Mark(models.Model):
    student = models.ForeignKey(Student)
    test = models.ForeignKey(Test)
    mark = models.FloatField()
    comment = models.TextField(blank=True, default='')
