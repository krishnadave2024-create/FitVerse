from django.db import models
from accounts.models import User


class WaterIntake(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="water_entries"
    )

    amount = models.PositiveIntegerField(
        help_text="Water consumed in mL"
    )

    intake_date = models.DateField(auto_now_add=True)

    created_at = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f"{self.user.email} - {self.amount} mL"