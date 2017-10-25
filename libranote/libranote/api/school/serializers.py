from rest_framework import serializers
from libranote.api.school.models import School

class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = ('title', 'adress')
