# coding:utf-8
import json

from django.contrib.auth.decorators import login_required
from django.http import JsonResponse, HttpResponseForbidden, HttpResponse
from django.shortcuts import get_object_or_404, render

from userManagement.getApp import Xcx
from userManagement.models import Applet
from userManagement.rest import serializers


@login_required
def setting(request):
    if request.method == 'GET':
        id = request.GET.get("id", 1)
        applet = get_object_or_404(Applet, id=id)

        List = json.dumps(serializers.AppletSerializer(applet, many=False, context={'request': request}).data)

        # FormSet = inlineformset_factory(Goods, GoodsImage, extra=2,fields="__all__",fk_name="goodsImageForeignKey")
        # return HttpResponse(FormSet(instance=Goods.objects.all()[0]))

        return render(request, 'userManagement/setting.html', {'List': List, "id": id})
    if request.method == 'POST':
        id = request.POST.get("id", 1)
        applet = get_object_or_404(Applet, id=id)

        AppId = request.POST.get("AppId")
        AppSecret = request.POST.get("AppSecret")
        Description = request.POST.get("description", "小程序应用")

        applet.appletId = AppId
        applet.secret = AppSecret

        # applet.description=Description
        applet.save()
        imageurl = "http://" + request.get_host() + applet.image.url
        xcxObj = Xcx(applet.id, applet.name, applet.description, imageurl, applet.type)
        dict = {}
        dict["url"] = xcxObj.getZipUrl()
        return JsonResponse(dict, safe=False)


@login_required
def index(request):
    if request.method == 'GET':
        xcx_set = request.user.manageuser.applet_set.all()
        xcx_list = serializers.AppletSerializer(xcx_set, many=True, context={'request': request}).data
        for i in range(0, len(xcx_list)):
            xcx_list[i]["createDateTime"] = xcx_set[i].createDateTime
            xcx_list[i]["modDateTime"] = xcx_set[i].modDateTime
        types = Applet.appletType

        return render(request, 'userManagement/index.html',
                      {"applet_list": xcx_list, "User": request.user, "applet_types": types})


def createApplet(request):
    if request.method == "POST":
        user = request.user
        name = request.POST.get("name", "APP")
        description = request.POST.get("description", "APP")
        image = request.FILES.get("image")
        type = request.POST.get("type", 0)
        if (user.manageuser.hasPermission == False and type == 2):
            return HttpResponseForbidden(u"没有权限")
        Applet.objects.create(appletManageUser=user.manageuser, name=name, description=description, image=image,
                              type=type)
        return HttpResponse("ok")


def deleteApplet(request):
    if request.method == "POST":
        id = request.POST.get("id")
        applet = get_object_or_404(Applet, id=id)
        applet.delete()
        return HttpResponse("ok")