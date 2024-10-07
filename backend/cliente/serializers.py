from rest_framework import serializers
from . import models

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = "id" , "first_name", 'last_name', 'email', 'username'
        
    id = serializers.IntegerField(read_only = True)

class ClienteSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer()

    class Meta:
        model = models.Cliente
        fields = "__all__"

class ClienteSerializerPOST(serializers.ModelSerializer):
    class Meta:
        model = models.Cliente
        fields = "__all__"