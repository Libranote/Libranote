from rest_framework import serializers
from libranote.api.subjects.models import Subject

class SubjectSerializer(serializers.ModelSerializer):
    teachers = serializers.PrimaryKeyRelatedField(many=True)

    class Meta:
        fields = ('name', 'optional', 'teachers')
