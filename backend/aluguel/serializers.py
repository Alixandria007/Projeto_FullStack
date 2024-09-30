from rest_framework import serializers
from . import models

class AluguelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Aluguel
        fields = "__all__"

class ItemAluguelSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ItemAluguel
        fields = "__all__"