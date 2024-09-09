from django.db import models
from cliente.models import Cliente
from filmes.models import Filme

# Create your models here.

class Aluguel(models.Model):
    class Meta: 
        verbose_name = "Aluguel"
        verbose_name_plural= "Aluguéis"

    cliente = models.ForeignKey(Cliente, on_delete= models.CASCADE)
    data_aluguel = models.DateField()
    vencimento = models.DateField()
    status = models.CharField(max_length=1, choices=[("V", "Vencido"), ("P", "Pendente"), ("D", "Devolvido")])


class ItemAluguel(models.Model):
    class Meta: 
        verbose_name = "Item Aluguel"
        verbose_name_plural= "Itens Aluguel"

    aluguel = models.ForeignKey(Aluguel, on_delete=models.CASCADE)
    filme = models.ForeignKey(Filme, on_delete=models.CASCADE)