from libranote.api.courses.models import Course
from libranote.api.courses.serializers import CourseSerializer
from rest_framework import status, generics

class CourseList(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


class CourseDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
