from django.contrib.auth.models import User
from django.db import models
from libranote.api.schools.models import School

# It's a bit confusing, but User contains authentication information,
# and Account data about the user/account
class Account(models.Model):
    user = models.OneToOneField(User)
    gender = models.CharField(blank=False, default='X')
    birthday = models.DateField()
    avatar_url = models.ImageField()
    school = models.ForeignKey(School)
