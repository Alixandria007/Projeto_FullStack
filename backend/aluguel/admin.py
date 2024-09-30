from django.contrib import admin
from . import models

# Register your models here.

@admin.register(models.Aluguel)
class AluguelAdmin(admin.ModelAdmin):
    list_display = 'id', 'cliente', 'vencimento', 'status'
    list_display_links = 'id',
    ordering = "-pk",

@admin.register(models.ItemAluguel)
class AluguelAdmin(admin.ModelAdmin):
    list_display = 'id', 'aluguel' ,'filme'
    list_display_links = 'id',
    ordering = "-pk",