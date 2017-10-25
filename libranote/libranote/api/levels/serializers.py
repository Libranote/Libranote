from rest_framework import serializers
from libranote.api.levels.models import Level

class LevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Level
        fields = ('title')
