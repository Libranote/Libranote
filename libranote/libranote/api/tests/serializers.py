from rest_framework import serializers
from libranote.api.tests.models import Test
from libranote.api.subjects.models import Subject

class TestSerializer(serializers.ModelSerializer):
    subject = serializers.PrimaryKeyRelatedField(queryset=Subject.objects.all())

    class Meta:
        model = Test
        fields = ('id', 'title', 'date', 'show_at', 'coefficient', 'out_of', 'subject')
