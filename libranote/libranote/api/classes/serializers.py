from rest_framework import serializers
from libranote.api.classes.models import Class
from libranote.api.accounts.serializers import AccountSerializer
from libranote.api.students.serializers import StudentSerializer

class ClassSerializer(serializers.ModelSerializer):
    main_teacher = AccountSerializer(read_only=True)
    students = StudentSerializer(read_only=True, many=True)
    display_name = serializers.CharField(source='get_display_name')

    class Meta:
        model = Class
        fields = ('name', 'main_teacher', 'students', 'display_name')
