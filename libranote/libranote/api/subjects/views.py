from libranote.api.subjects.models import Subject
from libranote.api.subjects.serializers import SubjectSerializer
from rest_framework import status, generics

class SubjectList(generics.ListCreateAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer


class SubjectDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer
