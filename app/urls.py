from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'idc$', views.idc, name='idc'),
    url(r'product$', views.product, name='product'),
    url(r'server$', views.server, name='server'),
    # api part
    url(r'api/addIdc$', views.addIdc),
    url(r'api/addProduct$', views.addProduct),
    url(r'api/addServer$', views.addServer),
    url(r'api/ansibleCallback$', views.ansibleCallback),
]
