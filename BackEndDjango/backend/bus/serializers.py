from rest_framework import serializers
from .models import BusRoute
from user.models import UserModel  # Import your UserModel

class BusRouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusRoute
        fields = '__all__'


    # def create(self, validated_data):
    #     print("create from ModelSerializer")
    #     driver_email = validated_data.get('driver')
    #     driver = UserModel.objects.get(email=driver_email)
    #     if not driver.is_driver:
    #         print("The email given is not for a driver.")
    #         raise serializers.ValidationError("The email given is not for a driver.")
        
    #     request = self.context.get('request')
    #     if request and request.user.is_authenticated and request.user.is_uni_staff:
    #         print("User is a university staff.")
    #         return super().create(validated_data)
    #     else:
    #         print("Only university staff can create bus routes.")
    #         raise serializers.ValidationError("Only university staff can create bus routes.")