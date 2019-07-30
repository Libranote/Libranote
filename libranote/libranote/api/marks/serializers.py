from rest_framework import serializers
from libranote.api.marks.models import Mark
from libranote.api.students.models import Student
from libranote.api.tests.models import Test

class MarkSerializer(serializers.ModelSerializer):
    student = serializers.PrimaryKeyRelatedField(queryset=Student.objects.all())
    test = serializers.PrimaryKeyRelatedField(queryset=Test.objects.all())

    class Meta:
        model = Mark
        fields = ('student', 'test', 'mark', 'comment')
