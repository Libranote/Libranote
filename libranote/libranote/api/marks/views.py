from libranote.api.marks.models import Mark
from libranote.api.marks.serializers import MarkSerializer
from rest_framework import status, generics

class MarkList(generics.ListCreateAPIView):
    queryset = Mark.objects.all()
    serializer_class = MarkSerializer


class MarkDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Mark.objects.all()
    serializer_class = MarkSerializer
