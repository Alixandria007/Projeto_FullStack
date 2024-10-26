from django.shortcuts import render
from django.db import transaction
from django.db.models import Q
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from . import models, serializers


@api_view(['GET'])
def clientes(request):

    if request.method == 'GET':
        search = request.GET.get("search")
        if search:
            
            clientes = models.Cliente.objects.filter(Q(usuario__first_name__icontains = search) | Q(usuario__last_name__icontains = search))
        else:
            clientes = models.Cliente.objects.all()

        serializer = serializers.ClienteSerializer(
            instance = clientes,
            many = True
        )
        return Response(serializer.data)


@api_view(['GET'])
def clientes_detail(request, id):
    if request.method == 'GET':
        cliente = get_object_or_404(models.Cliente, id = id)
        
        serializer = serializers.ClienteSerializer(
            instance = cliente,
            many = False
        )
        return Response(serializer.data)
    
@api_view(['DELETE'])
def cliente_delete(request, id):
    if request.method == 'DELETE':
        cliente = get_object_or_404(models.Cliente, id = id)
        usuario = get_object_or_404(models.User, id = cliente.usuario.id)

        cliente.delete()
        usuario.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['PATCH'])
def cliente_delete(request, id):
    if request.method == 'PATCH':
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

        cliente_model = get_object_or_404(models.Cliente, id = request.data.get("id"))
        usuario_model = get_object_or_404(models.User, id=cliente_model.usuario.id)

        with transaction.atomic():
            usuario_serializer = serializers.UsuarioSerializer(instance = usuario_model, data=usuario_data, partial = True)
            if usuario_serializer.is_valid():
                usuario_serializer.save()

                cliente_serializer = serializers.ClienteSerializerPOST(instance = cliente_model, data=cliente_data, partial = True)

                if cliente_serializer.is_valid(raise_exception=True):
                    cliente_serializer.save()
                    return Response({
                        "usuario": usuario_serializer.data,
                        "cliente": cliente_serializer.data
                    }, status=status.HTTP_201_CREATED)
            return Response({"error": "Erro na criação do cliente ou usuário"}, status=status.HTTP_400_BAD_REQUEST)


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