from typing import Iterable
from django.utils.text import slugify
from django.db import models

# Create your models here.

class Categoria(models.Model):
    class Meta:
        verbose_name = "Categoria"
        verbose_name_plural = "Categorias"

    nome = models.CharField(max_length=60)

    def __str__(self):
        return self.nome

class Autor(models.Model):
    class Meta:
        verbose_name = "Autor"
        verbose_name_plural = "Autores"

    nome = models.CharField(max_length=60)

    def __str__(self):
        return self.nome
    
class Filme(models.Model):
    class Meta:
        verbose_name = "Filme"
        verbose_name_plural = "Filmes"

    titulo = models.CharField(max_length=90)
    slug = models.SlugField(max_length=90, unique=True, null=True, blank=True)
    sinopse = models.CharField(max_length=300)
    categoria = models.ManyToManyField(Categoria)
    autor = models.ForeignKey(Autor, on_delete=models.SET_NULL, null = True)
    classificacao_etaria = models.CharField(max_length=2, choices=[("10", "+10"), ('12', '+12'), ('14', '+14'), ('18', '+18')])
    capa = models.ImageField(upload_to='capas_filmes/', blank=True, null=True)
    quantidade = models.PositiveIntegerField(default=1)
    publico = models.BooleanField(default=True)

    def save(self):
            if not self.slug:
                self.slug = slugify(self.titulo)
                self.save()
            return super().save()

    def __str__(self):
        return self.titulo