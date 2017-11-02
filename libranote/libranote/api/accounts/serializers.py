from rest_framework import serializers
from libranote.api.accounts.models import Account

class AccountSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')

    class Meta:
        model = Account
        fields = ('username', 'first_name', 'last_name', 'gender', 'birthday',
                    'avatar_url', 'school')
