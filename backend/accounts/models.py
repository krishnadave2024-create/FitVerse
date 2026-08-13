from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    email = models.EmailField(unique=True)
    is_verified = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.email
    
class Profile(models.Model):
    GENDER_CHOICES = [
        ("Male", "Male"),
        ("Female", "Female"),
        ("Other", "Other"),
    ]

    GOAL_CHOICES = [
        ("Lose Weight", "Lose Weight"),
        ("Maintain Weight", "Maintain Weight"),
        ("Gain Weight", "Gain Weight"),
        ("Build Muscle", "Build Muscle"),
    ]

    ACTIVITY_CHOICES = [
        ("Sedentary", "Sedentary"),
        ("Light", "Light"),
        ("Moderate", "Moderate"),
        ("Active", "Active"),
        ("Very Active", "Very Active"),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")

    full_name = models.CharField(max_length=100)
    age = models.PositiveIntegerField(null=True, blank=True)
   
    height = models.FloatField(help_text="Height (cm)", null=True, blank=True)
    current_weight = models.FloatField(help_text="Current Weight (kg)", null=True, blank=True)
    target_weight = models.FloatField(help_text="Target Weight (kg)", null=True, blank=True)
    gender = models.CharField(
        max_length=10,
        choices=GENDER_CHOICES,
        null=True,
        blank=True,
    )

    MEMBERSHIP_CHOICES = [
        ("Free", "Free"),
        ("Pro", "Pro"),
        ("Elite", "Elite"),
    ]

    activity_level = models.CharField(
        max_length=20,
        choices=ACTIVITY_CHOICES,
        null=True,
        blank=True,
    )

    membership_plan = models.CharField(
        max_length=20,
        choices=MEMBERSHIP_CHOICES,
        default="Free"
    )

    fitness_goal = models.CharField(
        max_length=30,
        choices=GOAL_CHOICES,
        null=True,
        blank=True,
    )
    bio = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    daily_water_goal = models.PositiveIntegerField(
    default=3000,
    help_text="Daily water goal in ml"
    )

    daily_calorie_goal = models.PositiveIntegerField(
    null=True,
    blank=True
    )
    
    def __str__(self):
        return f"{self.user.email}'s Profile"