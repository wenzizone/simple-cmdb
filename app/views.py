# coding=utf-8

import json

from . import models
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth import SESSION_KEY
from django.core import serializers
from django.template import RequestContext


# Create your views here.
def index(request):
    return render(request, "app/index.html")


def idc(request):
    # if not request.user.is_authenticated():
    #    return HttpResponseRedirect("/login")
    data = {}
    #theme = {'home':"",'serverinstall':"", "assetsmanager":"active", 'idc':'active', 'ippools':"", "servers":"", "gameinfo":""}
    idcNameList = models.Idc.objects.values()
    if idcNameList:
        data = {'status': True, 'idcNameList': idcNameList}
    else:

        data = {'status': False}
        print data

    return render(request, "app/idc.html", {'data': data})


def product(request):
    # if not request.user.is_authenticated():
    #    return HttpResponseRedirect("/login")
    data = {}
    #theme = {'home':"",'serverinstall':"", "assetsmanager":"active", 'idc':'active', 'ippools':"", "servers":"", "gameinfo":""}
    productList = models.Product.objects.values()
    if productList:
        data = {'status': True, 'productList': productList}
    else:

        data = {'status': False}
        print data

    return render(request, "app/product.html", {'data': data})


def server(request):
    # if not request.user.is_authenticated():
    #    return HttpResponseRedirect("/login")
    data = {}
    #theme = {'home':"",'serverinstall':"", "assetsmanager":"active", 'idc':'active', 'ippools':"", "servers":"", "gameinfo":""}
    serverList = models.Server.objects.values()
    if serverList:
        data = {'status': True, 'serverList': serverList}
    else:

        data = {'status': False}
        print data

    return render(request, "app/server.html", {'data': data})

###################
# api part
###################


# 添加新的idc
def addIdc(request):
    data = {}
    if request.is_ajax():
        if request.method == 'POST':
            print request.POST
            idcName = request.POST['inputIdcname'].strip()
            idcExtraInfo = request.POST['textIdcExtroInfo'].strip()
            is_idc_in_db = models.Idc.objects.filter(name=idcName)
            if is_idc_in_db:
                data = {'status': 1, "message": u'%s %s' % (
                    idcName, u'已经存在于数据库中!!')}
            else:
                idcNameList = models.Idc(name=idcName, comments=idcExtraInfo)
                idcNameList.save()
                print idcNameList.id
                if idcNameList.id:
                    data = {'status': 0, "message": u'%s %s' % (
                        idcName, u'添加成功.')}
                else:
                    data = {'status': '-1',
                            "message": u'%s %s' % (idcName, u'添加失败，请重试')}
    return HttpResponse(json.dumps(data), content_type="application/json")


# 添加新的产品服务
def addProduct(request):
    data = {}
    if request.is_ajax():
        if request.method == 'POST':
            print request.POST
            productName = request.POST['inputProductname'].strip()
            productExtraInfo = request.POST['textProductExtroInfo'].strip()
            is_product_in_db = models.Product.objects.filter(name=productName)
            if is_product_in_db:
                data = {'status': 1, "message": u'%s %s' % (
                    productName, u'已经存在于数据库中!! 请刷新查看')}
            else:
                productNameList = models.Product(
                    name=productName, product_info=productExtraInfo)
                productNameList.save()
                print productNameList.id
                if productNameList.id:
                    data = {'status': 0, "message": u'%s %s' % (
                        productName, u'添加成功.')}
                else:
                    data = {'status': '-1',
                            "message": u'%s %s' % (productName, u'添加失败，请重试')}
    return HttpResponse(json.dumps(data), content_type="application/json")
