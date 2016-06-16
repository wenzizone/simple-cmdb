# -*- coding:utf-8 -*-

from __future__ import unicode_literals

from django.db import models

# Create your models here.


# 服务器所在机房
class Cloud(models.Model):
    name = models.CharField(max_length=50)
    comments = models.CharField(max_length=255, null=True)

    # def __unicode__(self):
    #    return u'%d %s %s' % (self.id, self.name, self.comments)


# 服务项目
class Product(models.Model):
    name = models.CharField(max_length=50)
    subproduct = models.CharField(max_length=100)
    product_info = models.CharField(max_length=255, null=True)

    # def __unicode__(self):
    # return u'%d %s %s %s' % (self.id, self.name, self.subproduct,
    # self.product_info)


# 服务器信息
# 在添加服务器的时候人工输入或选择
class Server(models.Model):
    public_ip = models.GenericIPAddressField()
    cloud = models.ForeignKey(Cloud)
    in_china = models.CharField(max_length=8)
    product = models.ForeignKey(Product)
    create_time = models.DateField()
    server_status = models.CharField(max_length=20)
    update_time = models.DateField(null=True)

    # def __unicode__(self):
    # return u'%d %s %s %s %s %s %s' % (self.id,
    # self.objects.filter(cloud=models.Cloud.id), self.in_china, self.product,
    # self.server_status, self.create_time, self.update_time)


# 服务器详细信息
# 在ansible执行的时候，自动更新
class Detail(models.Model):
    server = models.ForeignKey(Server)
    hostname = models.CharField(max_length=255)
    internal_ip = models.GenericIPAddressField()
    system = models.CharField(max_length=50)
    update_time = models.DateField(null=True)
