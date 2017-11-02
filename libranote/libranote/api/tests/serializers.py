from rest_framework import serializers
from libranote.api.tests.models import Test

class TestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Test
        fields = ('title', 'date', 'show_at', 'coefficient', 'out_of')
