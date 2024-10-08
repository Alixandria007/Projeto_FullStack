from django.urls import path
from . import views

urlpatterns = [
    path('', views.clientes , name='clientes'),
    path('create/', views.create_cliente),
]