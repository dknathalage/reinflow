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
        r = requests.get(f'https://localhost:5000/lights/{id}/{colour}')
        return Response("LIGHT UPDATED")

    def post(self, request, data):
        queryset = Light.objects.all()
        serializer = lightSerializer(queryset, many=True)
        for i in serializer.data:
            dict(i)
            self.get_socket(i['_id'], 0)
            for j in data:
                if (i['lat'] == j[1] and i['lon'] == j[0]):
                    self.get_socket(i['_id'], 1)
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

#https://reinflow-backend.vercel.app/routedata/requests

# import osmnx as ox
# import matplotlib.pyplot as plt
# from shapely.geometry import Polygon

# poly_map = Polygon([[144.951495, -37.813152],
# [144.955083, -37.821145],
# [144.974903, -37.815366],
# [144.971369, -37.807383]])

# graph = ox.graph_from_polygon(poly_map, network_type='drive')
# nodes, edges = ox.graph_to_gdfs(graph)

# def change_light(input_list):
#     # Manipulate input list

#     node_list = list(nodes[nodes['x'].isin(input_list)].index)

#     for i in nlist:
#         # Do some post request


    # url = 'http://api.example.com/...' 
    # params = {'id': id, 'signal': signal}
    # r = requests.get(url, params=params)