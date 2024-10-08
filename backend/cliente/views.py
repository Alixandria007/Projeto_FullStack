from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from . import models, serializers
from django.db import transaction
# Create your views here.

@api_view(['GET'])
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
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
def create_cliente(request):
    if request.method == 'POST':
        usuario_data = {
            'username': request.data.get('username'),
            'first_name': request.data.get('first_name'),
            'last_name': request.data.get('last_name'),
            'email': request.data.get('email')
        }

        cliente_data = {
            'telefone': request.data.get('telefone'),
            'cpf': request.data.get('cpf')
        }

        with  transaction.atomic():
            usuario_serializer = serializers.UsuarioSerializer(data=usuario_data)
            if usuario_serializer.is_valid(raise_exception=True):
                usuario = usuario_serializer.save()

                # Associando o usuário criado ao cliente
                cliente_data["usuario"] = usuario.id
                cliente_serializer = serializers.ClienteSerializerPOST(data=cliente_data)
                
                if cliente_serializer.is_valid(raise_exception=True):
                    cliente_serializer.save()
                    return Response({
                        "usuario": usuario_serializer.data,
                        "cliente": cliente_serializer.data
                    }, status=status.HTTP_201_CREATED)
            return Response({"error": "Erro na criação do cliente ou usuário"}, status=status.HTTP_400_BAD_REQUEST)