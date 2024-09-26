from rest_framework import serializers
from . import models

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Categoria
        fields = "__all__"

class AutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Autor
        fields = "__all__"

class FilmesSerializer(serializers.ModelSerializer):
    classificacao_etaria = serializers.CharField(source='get_classificacao_etaria_display', read_only=True)
    autor = AutorSerializer(read_only = True)
    categoria = CategoriaSerializer(many = True,read_only = True)

    class Meta:
        model = models.Filme
        fields = "__all__"

    