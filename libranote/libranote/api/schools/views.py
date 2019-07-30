from libranote.api.schools.models import School
from libranote.api.schools.serializers import SchoolSerializer
from rest_framework import status, generics

class SchoolList(generics.ListCreateAPIView):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer


class SchoolDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = School.objects.all()
    serializer_class = SchoolSerializer
