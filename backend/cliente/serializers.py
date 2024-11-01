from rest_framework import serializers
from django.db.models import Q
from . import models
from aluguel import models as modelsAluguel

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = "id" , "first_name", 'last_name', 'email', 'username'
        
    id = serializers.IntegerField(read_only = True)

class ClienteSerializer(serializers.ModelSerializer):
    usuario = UsuarioSerializer()
    status = serializers.SerializerMethodField()

    class Meta:
        model = models.Cliente
        fields = "__all__"

    def get_status(self, obj):
        status = modelsAluguel.Aluguel.objects.filter(Q(status = "V") | Q(status = "P") , cliente = obj.id ).exists() 

        return not status

class ClienteSerializerPOST(serializers.ModelSerializer):
    class Meta:
        model = models.Cliente
        fields = "__all__"