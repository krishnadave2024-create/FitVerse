from django.urls import path
from .views import WorkoutListCreateView, WorkoutDetailView

urlpatterns = [
    path("", WorkoutListCreateView.as_view()),
    path("<int:pk>/", WorkoutDetailView.as_view()),
]