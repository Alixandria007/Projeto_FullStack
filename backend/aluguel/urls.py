from django.urls import path
from . import views

urlpatterns = [
    path('inserir_filme/', views.insert_item_aluguel),
    path('criar_aluguel/', views.create_aluguel),
    path('aluguel_list/', views.aluguel_list)


]