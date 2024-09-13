from django.contrib import admin
from . import models

# Register your models here.

@admin.register(models.Filme)
class FilmeAdmin(admin.ModelAdmin):
    list_display = 'id', 'titulo' ,'sinopse'
    list_display_links = 'id',
    ordering = "-pk",
    prepopulated_fields = {"slug": ("titulo",)}


@admin.register(models.Autor)
class AutorAdmin(admin.ModelAdmin):
    list_display = 'id', 'nome'
    list_display_links = 'id',
    ordering = "-pk",

@admin.register(models.Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = 'id', 'nome'
    list_display_links = 'id',
    ordering = "-pk",