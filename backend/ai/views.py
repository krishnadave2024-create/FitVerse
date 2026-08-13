from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


class AIRecommendationView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = request.user.profile

        bmi = 0

        if profile.height and profile.current_weight:
            h = profile.height / 100
            bmi = profile.current_weight / (h * h)

        recommendation = {}

        if bmi == 0:
            recommendation["bmi"] = "Complete your profile."

        elif bmi < 18.5:
            recommendation["bmi"] = "Underweight"
            recommendation["workout"] = "Focus on strength training 3-4 days/week."
            recommendation["nutrition"] = "Increase protein and healthy calories."
            recommendation["water"] = "Drink at least 2.5L water daily."

        elif bmi < 25:
            recommendation["bmi"] = "Normal"
            recommendation["workout"] = "Maintain a balanced workout schedule."
            recommendation["nutrition"] = "Continue a balanced diet."
            recommendation["water"] = "Drink 2.5-3L water daily."

        elif bmi < 30:
            recommendation["bmi"] = "Overweight"
            recommendation["workout"] = "Increase cardio sessions."
            recommendation["nutrition"] = "Reduce sugar and processed foods."
            recommendation["water"] = "Drink around 3L water daily."

        else:
            recommendation["bmi"] = "Obese"
            recommendation["workout"] = "Start with low-impact cardio."
            recommendation["nutrition"] = "Maintain a calorie deficit with professional guidance."
            recommendation["water"] = "Drink 3L water daily."

        recommendation["motivation"] = (
            "Consistency beats perfection. Small daily improvements lead to lasting results."
        )

        return Response(recommendation)