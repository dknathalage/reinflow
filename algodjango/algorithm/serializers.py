from rest_framework import serializers
from .model import RouteCoordinates


class RouteDataSerializer(serializers.ModelSerializer):
    class Meta:
        model= RouteCoordinates
        fields = ("point1_longitude", "point1_latitude", "point2_longitude", "point2_latitude")