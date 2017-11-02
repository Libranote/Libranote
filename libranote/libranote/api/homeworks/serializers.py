from rest_framework import serializers
from libranote.api.homeworks.models import Homework

class HomeworkSerializer(serializers.ModelSerializer):
    due_course = serializers.PrimaryKeyRelatedField()

    class Meta:
        model = Homework
        fields = ('description', 'due_course', 'due_week')
