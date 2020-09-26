import json
import requests
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from . models import Light, Route
from . serializers import lightSerializer, routeSerializer
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
import os

# http://localhost:8000/


class LightView(APIView):

    ### Once off method to populate model! ###
    # def create_sample(self):
    #     module_dir = os.path.dirname(__file__)  # get current directory
    #     file_path = os.path.join(module_dir, 'lightdata.json')

    #     with open(file_path, 'r') as data_file:
    #         data = json.load(data_file)
    #     for i in data:
    #         Light.objects.create(_id=i['_id'], SITE_NO=i['SITE_NO'], SITE_NAME=i['SITE_NAME'], lat=i['lat'], lon=i['lon'], SIGNAL=i['SIGNAL'])

    def get(self, request):
        queryset = Light.objects.all()
        serializer = lightSerializer(queryset, many=True)
        return Response(serializer.data)

    def get_socket(self, id, colour):
        r = requests.get(f'http://localhost:5001/lights/{id}/{colour}')
        return Response("LIGHT UPDATED")

    def reset_socket(self):
        r = requests.get(f'http://localhost:5001/lights/all/1')
        return Response("LIGHTS UPDATED")

    def post(self, request):
            data = request.data
            queryset = Light.objects.all()
            serializer = lightSerializer(queryset, many=True)
            self.reset_socket()
            for i in serializer.data:
                dict(i)
                for j in data:
                    if (round(i['lat'], 6) == j[1]):
                        self.get_socket(i['_id'], 0)
                        break
            return Response("SUCCESS")

        
class RouteView():
    queryset = Route.objects.all()
    serializer = routeSerializer

    def post(self, request):
        serializer = routeSerializer(data=request.data)
        if(serializer.is_valid()):
            serializer.save()
            print(serializer.data)