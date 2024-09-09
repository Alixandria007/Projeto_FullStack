from rest_framework import serializers
from . import models

class UsuarioSerializer(serializers.ModelSerializers):
    class Meta:
        model = models.User
        fields = "__all__"

class ClienteSerializer(serializers.ModelSerializers):
    class Meta:
        model = models.Cliente
        fields = "__all__"