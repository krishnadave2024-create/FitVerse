from django.urls import path
from .views import weight_prediction_view, workout_recommendation_view

urlpatterns = [
    path('weight-prediction/', weight_prediction_view, name='weight-prediction'),
    path('workout-recommendation/', workout_recommendation_view, name='workout-recommendation'),
]
