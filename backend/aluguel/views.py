from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from . import models, serializers

# Create your views here.

@api_view(['POST'])
def insert_item_aluguel(request):
    if request.method == 'POST':
        serializer = serializers.ItemAluguelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    
@api_view(['POST'])
def create_aluguel(request):
    serializer = serializers.AluguelSerializer(data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def aluguel_list(request):
    model = models.Aluguel.objects.all()
    serializer = serializers.AluguelSerializerGet(instance = model, many = True)
    
    return Response(serializer.data)

@api_view(['GET'])
def aluguel_list_atrasos(request):
    model = models.Aluguel.objects.filter(status = 'A')
    serializer = serializers.AluguelSerializerGet(instance = model, many = True)
    
    return Response(serializer.data)
