from django.db import models
from accounts.models import User


class Meal(models.Model):
    MEAL_CHOICES = [
        ("Breakfast", "Breakfast"),
        ("Lunch", "Lunch"),
        ("Dinner", "Dinner"),
        ("Snack", "Snack"),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="meals",
    )

    meal_type = models.CharField(
        max_length=20,
        choices=MEAL_CHOICES,
    )

    food_name = models.CharField(max_length=100)

    calories = models.PositiveIntegerField()

    water_intake = models.PositiveIntegerField(default=0)
    
    protein = models.FloatField(default=0)

    carbs = models.FloatField(default=0)

    fats = models.FloatField(default=0)

    meal_date = models.DateField(auto_now_add=True)

    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.email} - {self.food_name}"