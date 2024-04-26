from django.urls import path
from .views import BusRouteListCreateAPIView, BusRouteRetrieveUpdateAPIView, BusRouteDestroyAPIView

urlpatterns = [
    path('bus-route/', BusRouteListCreateAPIView.as_view(), name='user-registration'),
    path('bus-route/<int:pk>/', BusRouteRetrieveUpdateAPIView.as_view(), name='bus-route-update'),
    path('bus-route-del/<int:pk>/', BusRouteDestroyAPIView.as_view(), name='bus-route-delete'),

]