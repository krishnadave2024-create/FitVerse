from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponse
from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet
from django.utils import timezone
from .analytics import Analytics


class ProgressView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = request.user.profile

        bmi = Analytics.calculate_bmi(profile)

        data = {
            "bmi": bmi,
            "bmi_category": Analytics.bmi_category(bmi),

            "total_workouts": Analytics.total_workouts(request.user),
            "total_duration": Analytics.total_duration(request.user),
            "total_calories": Analytics.total_calories(request.user),
            "total_water": Analytics.total_water(request.user),

            "nutrition": Analytics.nutrition_summary(request.user),

            "weekly_workouts": Analytics.weekly_workouts(request.user),
            "weekly_calories": Analytics.weekly_calories(request.user),
            "weekly_water": Analytics.weekly_water(request.user),
        }

        return Response(data)

class ProgressReportView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = request.user.profile

        bmi = Analytics.calculate_bmi(profile)

        nutrition = Analytics.nutrition_summary(request.user)

        response = HttpResponse(content_type="application/pdf")
        response["Content-Disposition"] = 'attachment; filename="FitVerse_Report.pdf"'

        doc = SimpleDocTemplate(response)
        styles = getSampleStyleSheet()

        story = []

        story.append(Paragraph("<b>FitVerse Progress Report</b>", styles["Title"]))
        story.append(Paragraph(f"Generated: {timezone.now().strftime('%d %B %Y %H:%M')}", styles["Normal"]))
        story.append(Paragraph("<br/>", styles["Normal"]))

        story.append(Paragraph(f"<b>Name:</b> {profile.full_name}", styles["Normal"]))
        story.append(Paragraph(f"<b>Email:</b> {request.user.email}", styles["Normal"]))
        story.append(Paragraph(f"<b>Fitness Goal:</b> {profile.fitness_goal}", styles["Normal"]))
        story.append(Paragraph("<br/>", styles["Normal"]))

        story.append(Paragraph("<b>Health Summary</b>", styles["Heading2"]))
        story.append(Paragraph(f"BMI: {bmi}", styles["Normal"]))
        story.append(Paragraph(f"BMI Category: {Analytics.bmi_category(bmi)}", styles["Normal"]))
        story.append(Paragraph(f"Total Workouts: {Analytics.total_workouts(request.user)}", styles["Normal"]))
        story.append(Paragraph(f"Workout Duration: {Analytics.total_duration(request.user)} minutes", styles["Normal"]))
        story.append(Paragraph(f"Calories Burned: {Analytics.total_calories(request.user)} kcal", styles["Normal"]))
        story.append(Paragraph(f"Water Intake: {Analytics.total_water(request.user)} mL", styles["Normal"]))
        story.append(Paragraph("<br/>", styles["Normal"]))

        story.append(Paragraph("<b>Nutrition Summary</b>", styles["Heading2"]))
        story.append(Paragraph(f"Protein: {nutrition['protein']} g", styles["Normal"]))
        story.append(Paragraph(f"Carbohydrates: {nutrition['carbs']} g", styles["Normal"]))
        story.append(Paragraph(f"Fats: {nutrition['fats']} g", styles["Normal"]))
        story.append(Paragraph(f"Calories Consumed: {nutrition['calories']} kcal", styles["Normal"]))
        story.append(Paragraph("<br/>", styles["Normal"]))

        story.append(
            Paragraph(
                "Keep tracking your workouts, nutrition, and hydration. Consistency is the key to achieving your fitness goals!",
                styles["Italic"],
            )
        )

        doc.build(story)

        return response