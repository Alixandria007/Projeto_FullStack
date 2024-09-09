from django.db import models

# Create your models here.

class Categoria(models.Model):
    class Meta:
        verbose_name = "Categoria"
        verbose_name_plural = "Categorias"

    nome = models.CharField(max_length=60)

class Autor(models.Model):
    class Meta:
        verbose_name = "Autor"
        verbose_name_plural = "Autores"

    nome = models.CharField(max_length=60)
    
class Filme(models.Model):
    class Meta:
        verbose_name = "Filme"
        verbose_name_plural = "Filmes"

    titulo = models.CharField(max_length=90)
    sinopse = models.CharField(max_length=300)
    categoria = models.ManyToManyField(Categoria)
    autor = models.ForeignKey(Autor, on_delete=models.SET_NULL, null = True)
    classificação_etaria = models.CharField(max_length=2, choices=[("10", "+10"), ('12', '+12'), ('14', '+14'), ('18', '+18')])
    capa = models.ImageField(upload_to='capas_filmes/', blank=True, null=True)