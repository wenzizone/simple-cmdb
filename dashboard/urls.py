from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'idc/$', views.idc, name='idc'),
    url(r'product/$', views.product, name='product')
]