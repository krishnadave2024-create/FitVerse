from django.urls import path
from .views import HealthCheckView, DashboardView

urlpatterns = [
    path("health/", HealthCheckView.as_view()),
    path("dashboard/", DashboardView.as_view()),
    
]