from django.utils import timezone
from datetime import timedelta
from ml.predictor import predictor
from water.models import WaterIntake
from workouts.models import Workout
from accounts.models import Profile

class PredictionService:
    @staticmethod
    def get_weight_prediction(user, client_current_weight=None):
        try:
            profile = user.profile
        except Profile.DoesNotExist:
            # Handle case where profile doesn't exist
            return None

        # Gather user metrics
        age = profile.age if profile.age else 30
        gender = profile.gender if profile.gender else 'Male'
        height_cm = profile.height if profile.height else 170.0
        current_weight = profile.current_weight if profile.current_weight else 70.0
        
        if client_current_weight and client_current_weight != '0' and client_current_weight != 'undefined':
            try:
                current_weight = float(client_current_weight)
            except ValueError:
                pass
                
        goal = profile.fitness_goal if profile.fitness_goal else 'Maintain Weight'
        
        # Map DB goal to ML goal
        goal_mapping = {
            'Lose Weight': 'Weight Loss',
            'Gain Weight': 'Muscle Gain',
            'Build Muscle': 'Muscle Gain',
            'Maintain Weight': 'Maintenance'
        }
        ml_goal = goal_mapping.get(goal, 'General Fitness')

        height_m = height_cm / 100.0
        bmi = round(current_weight / (height_m ** 2), 1) if height_m > 0 else 0

        # Gather last 7 days data
        seven_days_ago = timezone.now().date() - timedelta(days=7)
        
        # Water
        recent_water = WaterIntake.objects.filter(user=user, intake_date__gte=seven_days_ago)
        daily_water_ml = int(sum(w.amount for w in recent_water) / max(1, recent_water.count())) if recent_water.exists() else 2000
        
        # Workouts
        recent_workouts = Workout.objects.filter(user=user, workout_date__gte=seven_days_ago)
        weekly_workouts = recent_workouts.count()
        weekly_workout_duration = sum(w.duration for w in recent_workouts)
        weekly_calories_burned = sum(w.calories_burned for w in recent_workouts)

        features = {
            'age': age,
            'gender': gender,
            'height_cm': height_cm,
            'current_weight': current_weight,
            'bmi': bmi,
            'goal': ml_goal,
            'daily_water_ml': daily_water_ml,
            'weekly_workouts': weekly_workouts,
            'weekly_workout_duration': weekly_workout_duration,
            'weekly_calories_burned': weekly_calories_burned
        }

        predicted_weight = predictor.predict(features)
        
        if predicted_weight is None:
            return None

        # Determine trend
        if predicted_weight < current_weight:
            trend = "Losing Weight"
        elif predicted_weight > current_weight:
            trend = "Gaining Weight"
        else:
            trend = "Maintaining Weight"

        # Simple confidence estimation based on how much data we have
        confidence = 75
        if weekly_workouts > 0:
            confidence += 10
        if recent_water.exists():
            confidence += 6
        if profile.current_weight and profile.height:
            confidence = min(98, confidence + 10)

        return {
            "current_weight": current_weight,
            "predicted_weight": predicted_weight,
            "days": 30,
            "confidence": confidence,
            "trend": trend
        }
