from libranote.api.tests.models import Test
from libranote.api.tests.serializers import TestSerializer
from rest_framework import status, generics

class TestList(generics.ListCreateAPIView):
    queryset = Test.objects.all()
    serializer_class = TestSerializer


class TestDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Test.objects.all()
    serializer_class = TestSerializer
