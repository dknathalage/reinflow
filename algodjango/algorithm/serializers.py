from rest_framework import serializers
<<<<<<< HEAD
from .model import RouteCoordinates


class RouteDataSerializer(serializers.ModelSerializer):
    class Meta:
        model= RouteCoordinates
        fields = ("point1_longitude", "point1_latitude", "point2_longitude", "point2_latitude")
=======
from . models import Light, Route


class lightSerializer(serializers.ModelSerializer):
    class Meta:
        model=Light
        fields = '__all__'

class routeSerializer(serializers.ModelSerializer):
    class Meta:
        model=Route
        fields = '__all__'
>>>>>>> 0ce67eb0dd8c2485cf481a95fbdb7b56e2e5aa41
