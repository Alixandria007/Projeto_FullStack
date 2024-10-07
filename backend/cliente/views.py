from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from . import models, serializers
# Create your views here.

@api_view(['GET', 'POST'])
def clientes(request):

    if request.method == 'GET':
        clientes = models.Cliente.objects.all()
        serializer = serializers.ClienteSerializer(
            instance = clientes,
            many = True
        )
        return Response(serializer.data)
    
    elif request.method == 'POST':
        data = request.data

        serializer = serializers.ClienteSerializerPOST(
            data = data
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status='201')
        else:
            return Response(serializer.errors, status='404')

@api_view(['GET', 'POST'])    
def usuario(request):
    if request.method == 'GET':
        model = models.User
        serializer = serializers.UsuarioSerializer(instance = model, many = True)

        return Response(serializer.data)
        
    elif request.method == 'POST':
        data = request.data

        serializer = serializers.UsuarioSerializer(
            data = data
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status='201')
        else:
            return Response(serializer.errors, status='404')