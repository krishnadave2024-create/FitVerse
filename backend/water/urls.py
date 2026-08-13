from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import WaterViewSet


router = DefaultRouter()

router.register(
    "",
    WaterViewSet,
    basename="water"
)


urlpatterns = [
    path("", include(router.urls)),
]