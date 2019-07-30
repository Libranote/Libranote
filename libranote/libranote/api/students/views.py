from libranote.api.students.models import Student
from libranote.api.students.serializers import StudentSerializer
from rest_framework import status, generics

class StudentList(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer


class StudentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
