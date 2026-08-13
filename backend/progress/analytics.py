from workouts.models import Workout
from nutrition.models import Meal
from water.models import WaterIntake

from datetime import timedelta
from django.utils import timezone


class Analytics:

    @staticmethod
    def calculate_bmi(profile):
        if not profile.height or not profile.current_weight:
            return 0

        height = profile.height / 100
        return round(profile.current_weight / (height ** 2), 2)

    @staticmethod
    def bmi_category(bmi):
        if bmi == 0:
            return "Unknown"
        elif bmi < 18.5:
            return "Underweight"
        elif bmi < 25:
            return "Normal"
        elif bmi < 30:
            return "Overweight"
        return "Obese"

    @staticmethod
    def total_workouts(user):
        return Workout.objects.filter(user=user).count()

    @staticmethod
    def total_duration(user):
        return sum(
            w.duration
            for w in Workout.objects.filter(user=user)
        )

    @staticmethod
    def total_calories(user):
        return sum(
            w.calories_burned
            for w in Workout.objects.filter(user=user)
        )

    @staticmethod
    def total_water(user):
        return sum(
            water.amount
            for water in WaterIntake.objects.filter(user=user)
        )

    @staticmethod
    def nutrition_summary(user):
        meals = Meal.objects.filter(user=user)

        return {
            "protein": sum(m.protein for m in meals),
            "carbs": sum(m.carbs for m in meals),
            "fats": sum(m.fats for m in meals),
            "calories": sum(m.calories for m in meals),
        }

    @staticmethod
    def weekly_workouts(user):
        today = timezone.now().date()

        data = []

        for i in range(6, -1, -1):
            day = today - timedelta(days=i)

            count = Workout.objects.filter(
                user=user,
                workout_date=day
            ).count()

            data.append({
                "date": day.strftime("%a"),
                "count": count
            })

        return data

    @staticmethod
    def weekly_calories(user):
        today = timezone.now().date()

        data = []

        for i in range(6, -1, -1):
            day = today - timedelta(days=i)

            calories = sum(
                w.calories_burned
                for w in Workout.objects.filter(
                    user=user,
                    workout_date=day
                )
            )

            data.append({
                "date": day.strftime("%a"),
                "calories": calories
            })

        return data

    @staticmethod
    def weekly_water(user):
        today = timezone.now().date()

        data = []

        for i in range(6, -1, -1):
            day = today - timedelta(days=i)

            amount = sum(
                w.amount
                for w in WaterIntake.objects.filter(
                    user=user,
                    intake_date=day
                )
            )

            data.append({
                "date": day.strftime("%a"),
                "amount": amount
            })

        return data