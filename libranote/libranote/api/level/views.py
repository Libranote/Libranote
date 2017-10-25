from libranote.api.level.models import Level
from libranote.api.level.serializers import LevelSerializer
from rest_framework import status, generics

class LevelList(generics.ListCreateAPIView):
    queryset = Level.objects.all()
    serializer_class = LevelSerializer


class LevelDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Level.objects.all()
    serializer_class = LevelSerializer
