# from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('register', views.registration_view, name='register'),
    path('home', views.home, name='home'),
    path('admin_home', views.admin_home, name='admin_home'),
    path('logout', views.logout_view, name='logout'),
    path('login', views.login_view, name='login'),
    path('maps', views.maps, name='maps'),  # can be del
]
