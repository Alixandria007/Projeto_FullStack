from rest_framework import serializers
from . import models

class CategoriaSerializer(serializers.ModelSerializers):
    class Meta:
        model = models.Autor
        fields = "__all__"

class AutorSerializer(serializers.ModelSerializers):
    class Meta:
        model = models.Autor
        fields = "__all__"

class FilmesSerializer(serializers.ModelSerializers):
    class Meta:
        model = models.Filme
        fields = "__all__"