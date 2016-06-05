#coding=utf-8

import json

from . import models
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.contrib.auth import SESSION_KEY
from django.core import serializers
from django.template import RequestContext

# Create your views here.

def index(request):
    return render(request, "dashboard/index.html")

def idc(request):
    #if not request.user.is_authenticated():
    #    return HttpResponseRedirect("/login")
    data = {}
    #theme = {'home':"",'serverinstall':"", "assetsmanager":"active", 'idc':'active', 'ippools':"", "servers":"", "gameinfo":""}
    idcNameList = models.Idc.objects.values()
    if idcNameList:
        data = {'status': True, 'idcNameList': idcNameList}
    else:

        data = {'status': False}
        print data

    return render(request, "dashboard/idc.html", {'data':data})

def product(request):
    return HttpResponse("hello product")

###################
# api part
###################

## 添加新的idc
def addIdc(request):
    data = {}
    if request.is_ajax():
        if request.method == 'POST':
            print request.POST
            idcName = request.POST['inputIdcname'].strip()
            idcExtraInfo = request.POST['textIdcExtroInfo'].strip()
            is_idc_in_db = models.Idc.objects.filter(name=idcName)
            if is_idc_in_db:
                data = {'status': 1, "message": u'%s %s' % (idcName, u'已经存在于数据库中!!')}
            else:
                idcNameList = models.Idc(name=idcName, comments=idcExtraInfo)
                idcNameList.save()
                print idcNameList.id
                if idcNameList.id:
                    data = {'status': 0, "message": u'%s %s' %(idcName, u'添加成功.')}
                else:
                    data = {'status': '-1', "message": u'%s %s' %(idcName, u'添加失败，请重试')}
    return HttpResponse(json.dumps(data), content_type="application/json")