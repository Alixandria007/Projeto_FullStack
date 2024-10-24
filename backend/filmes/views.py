from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from . import models,serializers

# Create your views here.

@api_view(['GET', 'POST'])
def filme_api(request):
    if request.method == 'GET':
        filmes = models.Filme.objects.filter(quantidade__gt = 0)
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
    filme = get_object_or_404(models.Filme, slug = slug)
    serializer = serializers.FilmesSerializer(instance = filme)
    return Response(serializer.data)

@api_view(['PATCH'])
def filme_edit(request, slug):
    if request.method == 'PATCH':
        filme = get_object_or_404(models.Filme,slug = slug)
        data = request.data

        serializer = serializers.FilmesSerializerPost(instance = filme, data = data, partial = True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def filme_delete(request, slug):
    if request.method == 'DELETE':
        filme = get_object_or_404(models.Filme, slug = slug)
        filme.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

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

@api_view(["GET"])
def search_filmes(request):
    search = request.GET.get("search")
    filmes = models.Filme.objects.filter(titulo__icontains = search)

    serializer = serializers.FilmesSerializer(instance = filmes, many = True)

    return Response(serializer.data)