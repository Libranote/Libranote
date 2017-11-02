from rest_framework import serializers
from libranote.api.classes.models import Class
from libranote.api.accounts.serializers import AccountSerializer

class ClassSerializer(serializers.ModelSerializer):
    main_teacher = AccountSerializer(read_only=true)
    students = StudentSerializer(read_only=true, many=true)
    display_name = serializers.CharField(source='get_display_name')

    class Meta:
        model = Account
        fields = ('name', 'main_teacher', 'students', 'display_name')
