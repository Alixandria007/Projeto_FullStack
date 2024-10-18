from django.urls import path
from . import views

urlpatterns = [
    path('inserir_filme/', views.insert_item_aluguel),
    path('criar_aluguel/', views.create_aluguel),
    path('aluguel_list/', views.aluguel_list),
    path('aluguel_list/atrasos/', views.aluguel_list_atrasos),
    path('devolver/<int:id>', views.devolver_pedido),
    path('detalhes/<int:id>', views.detalhes_aluguel),
]