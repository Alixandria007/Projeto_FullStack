from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from . import models,serializers

# Create your views here.

@api_view()
def filme_list(request):
    filmes = models.Filme.objects.all()
    serializer = serializers.FilmesSerializer(instance = filmes, many = True)
    return Response(serializer.data)

@api_view()
def filme_detail(request, slug):
    filme = models.Filme.objects.filter(slug = slug).first()
    serializer = serializers.FilmesSerializer(instance = filme)
    return Response(serializer.data)