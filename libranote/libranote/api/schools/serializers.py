from rest_framework import serializers
from libranote.api.schools.models import School

class SchoolSerializer(serializers.ModelSerializer):
    class Meta:
        model = School
        fields = ('title', 'adress', 'illustration')
