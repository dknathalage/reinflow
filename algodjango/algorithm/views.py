from django.http import JsonResponse
import json
from .model import RouteCoordinates
from .serializers import RouteDataSerializer

from rest_framework.response import Response
from rest_framework.views import APIView

# API Test endpoint
# http://localhost:8000/test
class TestView(APIView):
    def get(self, request, *args, **kwargs):
        data = {'test':'test response'}
        return Response(data)



# the route clearance requests sent by backend is handled here
# http://localhost:8000/routes
# post body
# {
#     "point1_longitude":1.1,
#     "point1_latitude":2.3,
#     "point2_longitude":2.3,
#     "point2_latitude":2.3
# }
class RouteView(APIView):
    queryset = RouteCoordinates.objects.all()
    serializer_class = RouteDataSerializer

    def post(self, request, *argsm, **kwargs):
        serializer = RouteDataSerializer(data=request.data)
        if(serializer.is_valid()):
            serializer.save()
            print(serializer.data)
        
        return Response("Called")