from rest_framework import serializers
from libranote.api.subjects.models import Subject
from libranote.api.accounts.models import Account

class SubjectSerializer(serializers.ModelSerializer):
    teachers = serializers.PrimaryKeyRelatedField(queryset=Account.objects.all(), many=True)

    class Meta:
        model = Subject
        fields = ( 'id', 'name', 'optional', 'teachers')
