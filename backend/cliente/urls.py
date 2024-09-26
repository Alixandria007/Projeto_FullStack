from django.urls import path
from . import views

urlpatterns = [
    path('', views.clientes_api_list , name='clientes')
]