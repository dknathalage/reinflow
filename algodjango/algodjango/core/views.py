from django.http import JsonResponse
import json

from rest_framework.response import Response
from rest_framework.views import APIView

# API Test endpoint
# http://localhost:8000/test
class TestView(APIView):
    def get(self, request, *args, **kwargs):
        data = {'test':'test response'}
        return Response(data)


# http://localhost:8000/routes
class RouteView(APIView):
    def post(self, request, *argsm, **kwargs):
        print(request)
        return Response("Hello")