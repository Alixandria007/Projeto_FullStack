from django.urls import path
from . import views

urlpatterns = [
    path('',views.filme_list),
    path('detail/<slug:slug>/',views.filme_detail),
    path('categoria/',views.categoria_list),
]