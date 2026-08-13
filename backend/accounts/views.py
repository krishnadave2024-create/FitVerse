from django.shortcuts import render

# Create your views here.
from rest_framework import generics
from .models import User
from .serializers import RegisterSerializer

from rest_framework.permissions import IsAuthenticated

from .models import Profile
from .serializers import ProfileSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer


class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.profile

from rest_framework.permissions import IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response

class AdminUsersView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        users = User.objects.all().select_related('profile')
        data = []
        for u in users:
            profile = getattr(u, 'profile', None)
            data.append({
                'id': u.id,
                'name': profile.full_name if profile else u.username,
                'email': u.email,
                'is_staff': u.is_staff,
                'date_joined': u.date_joined if hasattr(u, 'date_joined') else u.created_at,
                'workouts_logged': u.workouts.count() if hasattr(u, 'workouts') else 0,
                'current_weight': profile.current_weight if profile else None,
                'target_weight': profile.target_weight if profile else None,
                'fitness_goal': profile.fitness_goal if profile else None,
                'membership_plan': profile.membership_plan if profile else 'Free',
            })
        return Response(data)