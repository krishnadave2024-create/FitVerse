from workouts.models import Workout
from accounts.models import Profile

class RecommendationService:
    @staticmethod
    def get_workout_recommendation(user, client_current_weight=None):
        try:
            profile = user.profile
        except Profile.DoesNotExist:
            return None

        height_cm = profile.height if profile.height else 170.0
        current_weight = profile.current_weight if profile.current_weight else 70.0
        
        if client_current_weight and client_current_weight != '0' and client_current_weight != 'undefined':
            try:
                current_weight = float(client_current_weight)
            except ValueError:
                pass
                
        goal = profile.fitness_goal if profile.fitness_goal else 'Maintain Weight'

        height_m = height_cm / 100.0
        bmi = round(current_weight / (height_m ** 2), 1) if height_m > 0 else 22.0

        # Intelligent Rule Engine
        plan = ""
        difficulty = "Beginner"
        duration = "30 mins"
        focus = ""
        reason = ""
        exercises = []

        if bmi > 30:
            plan = "Low Impact Fat Burn"
            difficulty = "Beginner"
            duration = "45 mins"
            focus = "Cardio"
            reason = "Based on BMI (focus on joint-friendly movement)"
            exercises = ["Brisk Walking", "Stationary Cycling", "Swimming", "Water Aerobics"]
            
        elif bmi < 18.5:
            plan = "Weight Gain Program"
            difficulty = "Intermediate"
            duration = "45 mins"
            focus = "Full Body"
            reason = "Based on BMI (focus on building mass)"
            exercises = ["Squats", "Deadlifts", "Bench Press", "Overhead Press"]
            
        else:
            # BMI is in normal or slightly overweight range, look at goal
            if goal in ["Lose Weight"]:
                plan = "HIIT & Cardio"
                difficulty = "Intermediate"
                duration = "40 mins"
                focus = "Fat Loss"
                reason = "Targeted for your weight loss goal"
                exercises = ["Burpees", "Jump Rope", "Mountain Climbers", "Kettlebell Swings"]
            elif goal in ["Build Muscle", "Gain Weight"]:
                plan = "Hypertrophy Program"
                difficulty = "Advanced"
                duration = "60 mins"
                focus = "Strength"
                reason = "Designed for muscle growth"
                exercises = ["Barbell Rows", "Pull Ups", "Incline Dumbbell Press", "Leg Press"]
            else:
                plan = "Balanced Fitness"
                difficulty = "Intermediate"
                duration = "45 mins"
                focus = "General Fitness"
                reason = "Perfect for maintaining current physique"
                exercises = ["Push Ups", "Bodyweight Squats", "Plank", "Dumbbell Lunges"]

        # Optional: Adjust based on recent history to avoid repetition
        last_workout = Workout.objects.filter(user=user).order_by('-workout_date').first()
        if last_workout:
            # Simple check, if last was Cardio, recommend Strength, etc.
            if last_workout.category == "Cardio" and focus == "Cardio":
                plan = "Light Strength Training"
                focus = "Strength"
                reason = "Switching focus from your last cardio session"
                exercises = ["Dumbbell Curls", "Tricep Dips", "Shoulder Press", "Goblet Squats"]

        return {
            "plan": plan,
            "difficulty": difficulty,
            "duration": duration,
            "focus": focus,
            "reason": reason,
            "exercises": exercises
        }
