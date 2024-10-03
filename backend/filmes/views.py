from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import api_view
from rest_framework.response import Response
from . import models,serializers

# Create your views here.

@api_view(['GET', 'POST'])
def filme_api(request):

    if request.method == 'GET':
        filmes = models.Filme.objects.all()
        serializer = serializers.FilmesSerializer(instance = filmes, many = True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        data = request.data
        mutable_data = data.copy() 
        
        mutable_data['capa'] = request.FILES.get('capa')
        serializer = serializers.FilmesSerializerPost(data = mutable_data)
        print(mutable_data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view()
def filme_detail(request, slug):
    filme = models.Filme.objects.filter(slug = slug).first()
    serializer = serializers.FilmesSerializer(instance = filme)
    return Response(serializer.data)

@api_view()
def categoria_list(request):
    categoria = models.Categoria.objects.all()
    serializer = serializers.CategoriaSerializer(instance = categoria, many = True)
    return Response(serializer.data)

@api_view()
def autor_list(request):
    autor = models.Autor.objects.all()
    serializer = serializers.AutorSerializer(instance = autor, many = True)
    return Response(serializer.data)