from rest_framework import serializers
from libranote.api.students.models import Student

class StudentSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    klass = serializers.PrimaryKeyRelatedField()
    options = serializers.SlugRelatedField(slug_field='name', read_only=True)

    class Meta:
        model = Student
        fields = ('username', 'first_name', 'last_name', 'gender', 'birthday',
                    'avatar_url', 'school', 'klass', 'group', 'options')
        depth = 1
