from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from . models import Light, Route
from . serializers import lightSerializer, routeSerializer

# http://localhost:8000/

class LightView(APIView):
    
    def get(self, request):
        queryset = Light.objects.all()
        serializer_class = lightSerializer(queryset, many=True)
        return Response(serializer_class.data)

    def post(self, request):
        pass

class RouteView():
    queryset = Route.objects.all()
    serializer_class = routeSerializer

    def post(self, request):
        serializer = routeSerializer(data=request.data)
        if(serializer.is_valid()):
            serializer.save()
            print(serializer.data)


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