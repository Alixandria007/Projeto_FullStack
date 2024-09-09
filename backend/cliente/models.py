from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Cliente(models.Model):
    class Meta:
        verbose_name = 'Cliente'
        verbose_name_plural = 'Clientes'

    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    cpf = models.PositiveIntegerField()
    telefone = models.PositiveIntegerField()