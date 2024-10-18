from rest_framework import serializers
from . import models
from cliente.serializers import ClienteSerializer
from filmes.serializers import FilmesSerializer

class AluguelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Aluguel
        fields = "__all__"
        
class AluguelSerializerGet(serializers.ModelSerializer):
    cliente = ClienteSerializer()
    status = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = models.Aluguel
        fields = "__all__"

class ItemAluguelSerializer(serializers.ModelSerializer):
    filme = FilmesSerializer()
    aluguel = AluguelSerializerGet()

    class Meta:
        model = models.ItemAluguel
        fields = "__all__"

