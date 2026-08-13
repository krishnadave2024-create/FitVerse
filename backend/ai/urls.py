from django.urls import path
from .views import AIRecommendationView

urlpatterns = [
    path("", AIRecommendationView.as_view()),
]