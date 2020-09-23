from rest_framework import serializers
from . models import Light, Route


class lightSerializer(serializers.ModelSerializer):
    class Meta:
        model=Light
        fields = '__all__'

class routeSerializer(serializers.ModelSerializer):
    class Meta:
        model=Route
        fields = '__all__'