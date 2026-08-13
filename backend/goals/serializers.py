from rest_framework import serializers
from .models import Goal


class GoalSerializer(serializers.ModelSerializer):
    progress = serializers.SerializerMethodField()

    class Meta:
        model = Goal
        fields = "__all__"
        read_only_fields = ["user", "progress"]

    def get_progress(self, obj):
        if obj.target == 0:
            return 0

        progress = (obj.current / obj.target) * 100
        return min(round(progress, 1), 100)