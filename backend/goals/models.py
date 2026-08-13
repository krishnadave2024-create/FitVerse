from django.db import models
from accounts.models import User


class Goal(models.Model):
    GOAL_TYPES = [
        ("Weight", "Weight"),
        ("Workout", "Workout"),
        ("Water", "Water"),
        ("Calories", "Calories"),
    ]

    STATUS_CHOICES = [
        ("Pending", "Pending"),
        ("Completed", "Completed"),
    ]

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="goals"
    )

    goal_type = models.CharField(
        max_length=20,
        choices=GOAL_TYPES
    )

    target = models.FloatField()

    current = models.FloatField(default=0)

    target_date = models.DateField()

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="Pending"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - {self.goal_type}"