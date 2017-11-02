from rest_framework import serializers
from libranote.api.students.models import Student
from libranote.api.classes.models import Class

class StudentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='account.user.username')
    first_name = serializers.CharField(source='account.user.first_name')
    last_name = serializers.CharField(source='account.user.last_name')
    birthday = serializers.CharField(source='account.birthday')
    school = serializers.CharField(source='account.school')
    avatar_url = serializers.CharField(source='account.avatar_url')
    gender = serializers.CharField(source='account.gender')
    klass = serializers.PrimaryKeyRelatedField(queryset=Class.objects.all())
    options = serializers.SlugRelatedField(slug_field='name', read_only=True)

    class Meta:
        model = Student
        fields = ('username', 'first_name', 'last_name', 'gender', 'birthday',
                    'avatar_url', 'school', 'klass', 'group', 'options')
        depth = 1
