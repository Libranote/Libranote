from django.contrib import admin
from libranote.api.school.models import School
from libranote.api.level.models import Level

admin.site.register(School)
admin.site.register(Level)
