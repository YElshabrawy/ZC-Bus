from django.db import models
from user.models import UserModel  # Import your UserModel

class BusRoute(models.Model):
    id = models.AutoField(primary_key=True)
    route_name = models.CharField(max_length=100, unique=True, blank=False)
    driver = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name='bus_routes', unique=True,)
    
    def __str__(self):
        return self.route_name
