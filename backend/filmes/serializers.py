from rest_framework import serializers
from . import models

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Autor
        fields = "__all__"

class AutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Autor
        fields = "__all__"

class FilmesSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Filme
        fields = "__all__"