from django.db import models
from libranote.api.levels.models import Level
from libranote.api.accounts.models import Account

class Class(models.Model):
    name = models.CharField(max_length=10, blank=True, default='')
    main_teacher = models.ForeignKey(Account)
    level = models.ForeignKey(Level)

    def get_display_name (self):
        return self.level.title + " " + self.name
