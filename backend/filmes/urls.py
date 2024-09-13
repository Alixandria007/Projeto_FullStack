from django.urls import path
from . import views

urlpatterns = [
    path('',views.filme_list),
    path('<slug:slug>/',views.filme_detail),
]