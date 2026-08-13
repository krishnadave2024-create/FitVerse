from rest_framework import serializers
from .models import WaterIntake


class WaterSerializer(serializers.ModelSerializer):
    class Meta:
        model = WaterIntake
        fields = "__all__"
        read_only_fields = ["user"]