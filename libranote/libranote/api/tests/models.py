from django.db import models

class Test(models.Model):
    title = models.CharField(max_length=100, blank=True, default='')
    date = models.DateField()
    show_at = models.DateField(auto_now=True)
    coefficient = models.FloatField(default=1.0)
    out_of = models.IntegerField()
