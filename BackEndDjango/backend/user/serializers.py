from rest_framework import serializers
from django.core.exceptions import ValidationError
from django.contrib.auth.hashers import make_password
from .models import UserModel

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    bus_route_subscribed = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = UserModel
        fields = ['id', 'first_name', 'last_name', 'email', 'phone_number', 'password', 'is_driver', 'is_uni_staff', 'is_zc_student', 'bus_route_subscribed']

    def validate(self, data):
        # Check that only one of the is_driver, is_uni_staff, is_zc_student fields is True
        driver_fields = ['is_driver', 'is_uni_staff', 'is_zc_student']
        true_fields = [field for field in driver_fields if data.get(field)]
        if len(true_fields) != 1:
            raise ValidationError("Exactly one of 'is_driver', 'is_uni_staff', 'is_zc_student' must be True.")

        # Check if email is from the specified domain
        email = data.get('email', '')
        if not email.endswith('@zewailcity.edu.eg'):
            raise ValidationError("Email must be from the domain 'zewailcity.edu.eg'.")

        return data

    def validate_password(self, value):
        """
        Hash value passed by user.

        :param value: password of a user
        :return: a hashed version of the password
        """
        return make_password(value)
