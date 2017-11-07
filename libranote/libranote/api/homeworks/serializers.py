from rest_framework import serializers
from libranote.api.homeworks.models import Homework
from libranote.api.courses.models import Course

class HomeworkSerializer(serializers.ModelSerializer):
    due_course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all())

    class Meta:
        model = Homework
        fields = ('description', 'due_course', 'due_week')
