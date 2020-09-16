from django.http import JsonResponse

from rest_framework.response import Response
from rest_framework.views import APIView


class TestView(APIView):
    def get(self, request, *args, **kwargs):
        data = {'hello':'test response'}
        return Response(data)