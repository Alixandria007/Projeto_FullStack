from rest_framework import serializers
from . import models

class AluguelSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.Aluguel
        fields = "__all__"

class ItemAluguelSerializers(serializers.ModelSerializer):
    class Meta:
        model = models.ItemAluguel
        fields = "__all__"