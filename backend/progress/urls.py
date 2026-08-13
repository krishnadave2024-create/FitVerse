from django.urls import path
from .views import ProgressView, ProgressReportView

urlpatterns = [
    path("", ProgressView.as_view()),
    path("report/", ProgressReportView.as_view()),
]