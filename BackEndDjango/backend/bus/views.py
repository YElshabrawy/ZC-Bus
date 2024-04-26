from rest_framework import generics
from rest_framework.response import Response
from .models import BusRoute
from .serializers import BusRouteSerializer
from user.models import UserModel
from rest_framework import  status

# Create your views here.
class BusRouteListCreateAPIView(generics.ListCreateAPIView):
    queryset = BusRoute.objects.all()
    serializer_class = BusRouteSerializer


    def create(self, request, *args, **kwargs):
        route_name = request.data.get('route_name')
        driver_email = request.data.get('driver')
        print(f"create From View. route_name = {route_name}, driver_email = {driver_email}")
        user = request.user
        # Ensure the user is a university staff member
        if not user.is_authenticated or not user.is_uni_staff:
            return Response({"detail": "Only University Staff can create a route"}, status=status.HTTP_403_FORBIDDEN)

        # Retrieve the driver instance from UserModel using the provided email
        try:
            driver = UserModel.objects.get(email=driver_email)
        except UserModel.DoesNotExist:
            return Response({"detail": f"User with email {driver_email} does not exist."}, status=status.HTTP_400_BAD_REQUEST)
        print("Driver", driver.email, driver.is_driver)
        if not driver.is_driver:
            return Response({"detail": f"Provided email for driver is not a driver mail."}, status=status.HTTP_400_BAD_REQUEST)
        # Create a mutable copy of request.data
        mutable_data = request.data.copy()
        # Replace the 'driver' value in the mutable copy with the driver's primary key
        mutable_data['driver'] = driver.pk
        # Create a new request object with modified data
        new_request = request._request
        new_request.data = mutable_data
        # Call the super's create method with the modified request
        response = self.create_new(new_request, *args, **kwargs)
        
        return response

    def create_new(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)
    


class BusRouteRetrieveUpdateAPIView(generics.RetrieveUpdateAPIView):
    queryset = BusRoute.objects.all()
    serializer_class = BusRouteSerializer

    def update(self, request, *args, **kwargs):
        # only uni staff can update
        # driver email
        instance = self.get_object()
        route_name = request.data.get('route_name')
        driver_email = request.data.get('driver')
        user = request.user
        # Ensure the user is a university staff member
        if not user.is_authenticated or not user.is_uni_staff:
            return Response({"detail": "Only University Staff can update a route"}, status=status.HTTP_403_FORBIDDEN)
        # Retrieve the driver instance from UserModel using the provided email
        try:
            driver = UserModel.objects.get(email=driver_email)
        except UserModel.DoesNotExist:
            return Response({"detail": f"User with email {driver_email} does not exist."}, status=status.HTTP_400_BAD_REQUEST)
        if not driver.is_driver:
            return Response({"detail": f"Provided email for driver is not a driver mail."}, status=status.HTTP_400_BAD_REQUEST)
        # Update the instance with the new data
        instance.route_name = route_name
        instance.driver = driver
        instance.save()

        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class BusRouteDestroyAPIView(generics.DestroyAPIView):
    queryset = BusRoute.objects.all()
    serializer_class = BusRouteSerializer

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        user = request.user
        # Ensure the user is a university staff member
        if not user.is_authenticated or not user.is_uni_staff:
            return Response({"detail": "Only University Staff can delete a route"}, status=status.HTTP_403_FORBIDDEN)
            
        # Delete the instance
        instance.delete()

        return Response({"detail": "Bus route deleted successfully."}, status=status.HTTP_204_NO_CONTENT)