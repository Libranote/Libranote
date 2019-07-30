from libranote.api.classes.models import Class
from libranote.api.classes.serializers import ClassSerializer
from rest_framework import status, generics

class ClassList(generics.ListCreateAPIView):
    queryset = Class.objects.all()
    serializer_class = ClassSerializer


class ClassDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Class.objects.all()
    serializer_class = ClassSerializer
