from django.contrib import admin
from libranote.api.schools.models import School
from libranote.api.levels.models import Level

admin.site.register(School)
admin.site.register(Level)
