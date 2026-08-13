from django.db import models
from accounts.models import User

class Workout(models.Model):
    CATEGORY_CHOICES = [
        ("Strength", "Strength"),
        ("Cardio", "Cardio"),
        ("Flexibility", "Flexibility"),
        ("Sports", "Sports"),
        ("Other", "Other"),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="workouts"
    )

    workout_name = models.CharField(max_length=100)

    category = models.CharField(
        max_length=20,
        choices=CATEGORY_CHOICES
    )

    duration = models.PositiveIntegerField(
        help_text="Duration in minutes"
    )

    calories_burned = models.PositiveIntegerField()

    workout_date = models.DateField(auto_now_add=True)

    notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - {self.workout_name}"