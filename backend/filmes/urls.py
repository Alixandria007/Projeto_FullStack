from django.urls import path
from . import views

urlpatterns = [
    path('',views.filme_api),
    path('detail/<slug:slug>/',views.filme_detail),
    path('detail/edit/<slug:slug>/',views.filme_edit),
    path('categoria/',views.categoria_list),
    path('autor/',views.autor_list),
]