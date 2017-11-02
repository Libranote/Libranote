from libranote.api.accounts.models import Account
from libranote.api.accounts.serializers import AccountSerializer
from rest_framework import status, generics

class AccountList(generics.ListCreateAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer


class AccountDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer
