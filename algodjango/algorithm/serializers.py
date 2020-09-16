from rest_framework import serializers
from .model import RouteCoordinates


class RouteDataSerializer(serializers.ModelSerializer):
    class Meta:
        model: RouteCoordinates
        fields = ["p1_lon", "p1_lat", "p2_lon", "p2_lat"]