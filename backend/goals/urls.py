from django.urls import path
from .views import GoalListCreateView, GoalDetailView

urlpatterns = [
    path("", GoalListCreateView.as_view()),
    path("<int:pk>/", GoalDetailView.as_view()),
]