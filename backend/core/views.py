from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from workouts.models import Workout
from water.models import WaterIntake


class HealthCheckView(APIView):
    permission_classes = []

    def get(self, request):
        return Response({
            "status": "success",
            "message": "FitVerse API is running!"
        })


class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = request.user.profile

        workouts = Workout.objects.filter(user=request.user)
        water = WaterIntake.objects.filter(user=request.user)

        total_workouts = workouts.count()

        total_duration = sum(
            workout.duration
            for workout in workouts
        )

        total_calories = sum(
            workout.calories_burned
            for workout in workouts
        )

        total_water = sum(
            intake.amount
            for intake in water
        )

        bmi = None

        if profile.height and profile.current_weight:
            height = profile.height / 100
            bmi = round(
                profile.current_weight / (height * height),
                2
            )

        recent = workouts.order_by("-created_at")[:5]

        recent_data = [
            {
                "workout_name": workout.workout_name,
                "duration": workout.duration,
                "category": workout.category,
            }
            for workout in recent
        ]

        return Response({
            "name": profile.full_name,
            "goal": profile.fitness_goal,
            "bmi": bmi,
            "total_workouts": total_workouts,
            "total_duration": total_duration,
            "total_calories": total_calories,
            "total_water": total_water,
            "recent_workouts": recent_data,
        })