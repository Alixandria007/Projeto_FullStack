from django.urls import path
from . import views

urlpatterns = [
    path('',views.filme_api),
    path('detail/<slug:slug>/',views.filme_detail),
    path('detail/edit/<slug:slug>/',views.filme_edit),
    path('detail/delete/<slug:slug>/',views.filme_delete),
    path('categoria/',views.categoria_list),
    path('categoria/<int:id>/filmes',views.categoria_filmes),
    path('autor/',views.autor_list),
]