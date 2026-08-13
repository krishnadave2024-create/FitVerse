from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from .models import WaterIntake
from .serializers import WaterSerializer


class WaterViewSet(viewsets.ModelViewSet):
    serializer_class = WaterSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return WaterIntake.objects.filter(
            user=self.request.user
        ).order_by("-created_at")

    def perform_create(self, serializer):
        serializer.save(
            user=self.request.user
        )