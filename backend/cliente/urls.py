from django.urls import path
from . import views

urlpatterns = [
    path('', views.clientes),
    path('detail/<int:id>', views.clientes_detail),
    path('create/', views.create_cliente),
]