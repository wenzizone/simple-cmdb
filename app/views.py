# coding=utf-8

import json
import datetime

from . import models
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth import SESSION_KEY
from django.core import serializers
from django.template import RequestContext
#from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.csrf import csrf_exempt

# Create your views here.


def index(request):
    return render(request, "app/index.html")


def idc(request):
    # if not request.user.is_authenticated():
    #    return HttpResponseRedirect("/login")
    data = {}
    #theme = {'home':"",'serverinstall':"", "assetsmanager":"active", 'idc':'active', 'ippools':"", "servers":"", "gameinfo":""}
    idcNameList = models.Cloud.objects.all()
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
    productList = models.Product.objects.all()
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
    serverList = models.Server.objects.all()
    cloudList = models.Cloud.objects.all()
    productList = models.Product.objects.all()

    print serverList
    if serverList:
        data = {'status': True, 'serverList': serverList, 'cloudList': cloudList,
                'productList': productList}
    else:

        data = {'status': False, 'cloudList': cloudList,
                'productList': productList}
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
            is_idc_in_db = models.Cloud.objects.filter(name=idcName)
            if is_idc_in_db:
                data = {'status': 1, "message": u'%s %s' % (
                    idcName, u'已经存在于数据库中!!')}
            else:
                idcNameList = models.Cloud(name=idcName, comments=idcExtraInfo)
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


# 添加新主机
def addServer(request):
    data = {}
    if request.is_ajax():
        if request.method == 'POST':
            print request.POST
            serverIp = request.POST['inputServerIp'].strip()
            cloudId = request.POST['selectCloud'].strip()
            productId = request.POST['selectProduct'].strip()
            serverLocation = request.POST['selectLocation'].strip()
            createTime = datetime.date.today()

            is_server_in_db = models.Server.objects.filter(public_ip=serverIp)
            if is_server_in_db:
                data = {'status': 1, "message": u'%s %s' % (
                    public_ip, u'已经存在于数据库中!! 请刷新查看')}
            else:
                serverList = models.Server(
                    public_ip=serverIp, in_china=serverLocation, create_time=createTime, server_status="not running")
                serverList.cloud_id = cloudId
                serverList.product_id = productId
                serverList.save()
                print serverList.id
                if serverList.id:
                    data = {'status': 0, "message": u'%s %s' % (
                        serverIp, u'添加成功.')}
                else:
                    data = {'status': '-1',
                            "message": u'%s %s' % (serverIp, u'添加失败，请重试')}
    return HttpResponse(json.dumps(data), content_type="application/json")


# ansible callback update server info
#@ensure_csrf_cookie
@csrf_exempt
def ansibleCallback(request):
    if request.method == 'POST':
        data = request.POST.copy()
        if data['status'].strip() == 'starting':
            for pub_ip in data['public_ip'].split(','):
                # print pub_ip
                s = models.Server.objects.get(public_ip=pub_ip)
                s.server_status = "deploying"
                s.save()
        elif data['status'].strip() == 'updating':
            s = models.Server.objects.get(
                public_ip=data['public_ip'].strip())
            sd = models.Detail(hostname=data[
                               'hostname'].strip(), internal_ip=data['internal_ip'].strip(), system=data['system'].strip(), update_time=datetime.date.today())
            sd.server = s
            sd.save()
        elif data['status'].strip() == 'done':
            for pub_ip in data['public_ip'].split(','):
                s = models.Server.objects.get(public_ip=pub_ip)
                s.server_status = "running"
                s.save()
    return HttpResponse(json.dumps({'status': 'OK'}), content_type="application/json")
