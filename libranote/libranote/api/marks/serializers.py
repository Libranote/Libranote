from rest_framework import serializers
from libranote.api.marks.models import Mark

class MarkSerializer(serializers.ModelSerializer):
    student = serializers.PrimaryKeyRelatedField()
    test = serializers.PrimaryKeyRelatedField()

    class Meta:
        model = Mark
        fields = ('student', 'test', 'mark', 'comment')
