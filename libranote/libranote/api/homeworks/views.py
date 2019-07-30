from libranote.api.homeworks.models import Homework
from libranote.api.homeworks.serializers import HomeworkSerializer
from rest_framework import status, generics

class HomeworkList(generics.ListCreateAPIView):
    queryset = Homework.objects.all()
    serializer_class = HomeworkSerializer


class HomeworkDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Homework.objects.all()
    serializer_class = HomeworkSerializer
