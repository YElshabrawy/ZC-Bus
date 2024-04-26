from django.conf import settings
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin
)
from django.core.validators import RegexValidator, validate_email
from django.db import models

phone_regex = RegexValidator(
    regex=r"^\d{11}", message="Phone number must be 11 digits only."
)

class UserManager(BaseUserManager):
    """
    User Manager.
    To create superuser.
    """

    def create_user(self, email, password=None):
        if not email:
            raise ValueError("Users must have an email")
        user = self.model(email=email)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password):
        user = self.create_user(
            email=email, password=password
        )
        user.is_active = True
        user.is_staff = True
        user.is_superuser = True
        user.set_password(password)  # Hash the password
        user.save(using=self._db)
        return user

    
class UserModel(AbstractBaseUser, PermissionsMixin):
    """
    Custom User model.
    """

    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=50, null=False, blank=False)
    last_name = models.CharField(max_length=50, null=False, blank=False)
    email = models.EmailField(
        unique=True,
        max_length=50,
        blank=True,
        null=True,
        validators=[validate_email],
    )
    phone_number = models.CharField(
        unique=True, max_length=11, null=False, blank=False, validators=[phone_regex]
    )
    password = models.CharField(max_length=128)  # Store hashed password
    is_driver = models.BooleanField(default=False)
    is_uni_staff = models.BooleanField(default=False)
    is_zc_student = models.BooleanField(default=False)
    bus_route_subscribed = models.CharField(max_length=50, blank=True, null=True)

    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    user_registered_at = models.DateTimeField(auto_now_add=True)

    last_login = models.DateTimeField(auto_now=True)  # Add last_login field
    is_superuser = models.BooleanField(default=False)  # Add is_superuser field


    USERNAME_FIELD = "email"

    objects = UserManager()

    def __str__(self):
        return self.email


class UserProfile(models.Model):
    """
    User profile model.

    Every user should have only one profile.
    """

    user = models.OneToOneField(
        UserModel,
        related_name="profile",
        on_delete=models.CASCADE,
        primary_key=True,
    )
    first_name = models.CharField(max_length=50, null=False, blank=False)
    last_name = models.CharField(max_length=50, null=False, blank=False)
    address = models.TextField(null=False, blank=False)