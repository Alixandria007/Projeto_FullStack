from django.urls import path
from . import views

urlpatterns = [
    path('', views.clientes),
    path('detail/<int:id>', views.clientes_detail),
    path('delete/<int:id>', views.cliente_delete),
    path('edit/<int:id>', views.cliente_delete),
    path('create/', views.create_cliente),
]