# -*- coding:utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.


# 服务器所在机房
class Idc(models.Model):
    name = models.CharField(max_length=50)
    comments = models.CharField(max_length=255, null=True)

    def __unicode__(self):
        return u'%s %s' % (self.name, self.comments)


# 服务项目
class Product(models.Model):
    name = models.CharField(max_length=50)
    subproduct = models.CharField(max_length=100)
    product_info = models.CharField(max_length=255, null=True)

    def __unicode__(self):
        return u'%s %s %s' % (self.name, self.subproduct, self.product_info)


# 服务器信息
# 在添加服务器的时候人工输入或选择
class Server(models.Model):
    public_ip = models.GenericIPAddressField()
    cloud = models.ForeignKey(Idc)
    position = models.CharField(max_length=8)
    project = models.CharField(max_length=255)


# 服务器详细信息
# 在ansible执行的时候，自动更新
class Detail(models.Model):
    public_ip_id = models.ForeignKey(Server)
    hostname = models.CharField(max_length=255)
    internal_ip = models.GenericIPAddressField()
    system = models.CharField(max_length=50)
    version = models.DecimalField(max_digits=19, decimal_places=10)
