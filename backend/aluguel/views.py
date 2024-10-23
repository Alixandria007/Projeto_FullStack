from django.shortcuts import render, get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db import transaction
from rest_framework import status
from . import models, serializers

# Create your views here.

@api_view(['POST'])
def create_aluguel(request):
    if request.method == 'POST':
        aluguel_data = {
            "cliente": request.data.get("cliente"),
            "data_aluguel": request.data.get("data_aluguel"),
            "vencimento": request.data.get("vencimento"),
            "status": request.data.get("status")
        }

        

        with transaction.atomic():
            serializer_aluguel = serializers.AluguelSerializer(data=aluguel_data)
            if serializer_aluguel.is_valid():
                aluguel = serializer_aluguel.save()

                for i in request.data.get('filmes'):
                    print(i['id'])  

                    filme_data = {
                                "filme": i.get("id"),
                                "quantidade": i.get("quantidade"),
                                "aluguel": aluguel.id
                            }
                    

                    serializer_filme = serializers.ItemAluguelSerializer(data=filme_data)
                    if serializer_filme.is_valid():
                        serializer_filme.save()
                return Response({"filme": serializer_filme.data, "aluguel": serializer_aluguel.data}, status=201)
            
            return Response({"filmes":serializer_filme.errors, "aluguel": serializer_aluguel.errors}, status=400)
    
@api_view(['GET'])
def aluguel_list(request):
    model = models.Aluguel.objects.all()
    serializer = serializers.AluguelSerializerGet(instance = model, many = True)
    
    return Response(serializer.data)

@api_view(['GET'])
def aluguel_list_atrasos(request):
    model = models.Aluguel.objects.filter(status = 'V')
    serializer = serializers.AluguelSerializerGet(instance = model, many = True)
    
    return Response(serializer.data)

@api_view(['GET'])
def detalhes_aluguel(request,id):
    aluguel = models.Aluguel.objects.filter(id = id).first()
    serializer = serializers.AluguelSerializerGet(instance = aluguel)
    
    return Response(serializer.data)

@api_view(['GET'])
def detalhes_itens_aluguel(request,id):
    filmes = models.ItemAluguel.objects.filter(aluguel = id)
    serializer = serializers.ItemAluguelSerializerGet(instance = filmes, many = True)
    
    return Response(serializer.data)

@api_view(['PATCH'])
def devolver_pedido(request, id):
    if request.method == "PATCH":
        aluguel = get_object_or_404(models.Aluguel, id = id)
        aluguel_data = {
            "status": "D",
        }

        aluguel_serializer = serializers.AluguelSerializer(instance=aluguel, data = aluguel_data, partial = True)

        if aluguel_serializer.is_valid():
            aluguel_serializer.save()
            return Response(aluguel_serializer.data, status=status.HTTP_200_OK)
        return Response("Erro ao atualizar o status de um aluguel!" , status=status.HTTP_400_BAD_REQUEST)
