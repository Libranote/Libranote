from django.db import models
from libranote.api.levels.models import Level
from libranote.api.accounts.models import Account

class Class(models.Model):
    name = models.CharField(blank=True, default='')
    main_teacher = models.ForeignKey(Account)
    level = models.ForeignKey(Level)
