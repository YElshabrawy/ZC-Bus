from rest_framework import generics, status
from rest_framework.response import Response
from .models import UserModel
from .serializers import UserRegistrationSerializer
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated

class UserRegistrationAPIView(generics.CreateAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserRegistrationSerializer

    
class UserDetailsAPIView(RetrieveAPIView):
    serializer_class = UserRegistrationSerializer
    # permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user
