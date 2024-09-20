from django.contrib import admin
from . import models

# Register your models here.

@admin.register(models.Cliente)
class ClienteAdmin(admin.ModelAdmin):
    list_display = 'id', 'usuario' ,'cpf', 'telefone'
    list_display_links = 'id',
    ordering = "-pk",