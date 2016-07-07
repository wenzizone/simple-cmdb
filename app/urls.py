from django.conf.urls import url
from django.contrib.auth import views as auth_views

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'login', auth_views.login, {'template_name': 'app/login.html'}),
    url(r'idc$', views.idc, name='idc'),
    url(r'product$', views.product, name='product'),
    url(r'server$', views.server, name='server'),
    # api part
    url(r'api/addIdc$', views.addIdc),
    url(r'api/addProduct$', views.addProduct),
    url(r'api/addServer$', views.addServer),
    url(r'api/delServer/(?P<server_id>[0-9]+)$', views.delServer),
    url(r'api/delProduct/(?P<product_id>[0-9]+)$', views.delProduct),
    url(r'api/delIdc/(?P<idc_id>[0-9]+)$', views.delIdc),
    url(r'api/ansibleCallback$', views.ansibleCallback),
    url(r'api/sd/(?P<server_id>[0-9]+)', views.sd),
]
