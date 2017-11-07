from libranote.api.accounts.models import Account
from libranote.api.accounts.serializers import AccountSerializer
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import list_route

class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    @list_route(methods=['get'])
    def me (self, request):
        account = Account.objects.filter(user__username=request.user.username).first()
        serializer = self.get_serializer(account)
        return Response(serializer.data)
