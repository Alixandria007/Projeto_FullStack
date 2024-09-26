from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from . import models, serializers
# Create your views here.

@api_view()
def clientes_api_list(request): 
    clientes = models.Cliente.objects.all()
    serializer = serializers.ClienteSerializer(
        instance = clientes,
        many = True
    )
    return Response(serializer.data)