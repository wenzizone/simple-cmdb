from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def index(request):
    return render(request, "dashboard/index.html")

def idc(request):
    return render(request, "dashboard/idc.html")

def product(request):
    return HttpResponse("hello product")