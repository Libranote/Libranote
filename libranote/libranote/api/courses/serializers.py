from rest_framework import serializers
from libranote.api.courses.models import Course
from libranote.api.classes.models import Class
from libranote.api.accounts.serializers import AccountSerializer

class CourseSerializer(serializers.ModelSerializer):
    subject = serializers.SlugRelatedField(slug_field='name', read_only=True)
    teacher = AccountSerializer(read_only=true)
    klass = serializers.PrimaryKeyRelatedSerializer()

    class Meta:
        model = Account
        fields = ('week', 'subject', 'teacher', 'klass', 'group', 'day', 'start', 'end')
