# coding:utf-8
import json

from django.core.exceptions import PermissionDenied
from django.http import HttpResponseBadRequest, HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import get_object_or_404, render

from userManagement.forms import ShowForm
from userManagement.models import AppletUser, Goods, Applet, ShowAppData
from userManagement.rest import serializers
from userManagement.util import get_or_permissionDenied


def addCart(request):
    if request.method == 'POST':
        goods_id = request.POST.get("goods_id", None)
        num = request.POST.get("num", None)
        session_key = request.POST.get("session_key", None)
        isHas = False
        if (goods_id and num and session_key):
            applerUser = get_or_permissionDenied(AppletUser, xcxSession=session_key)
            goods = get_object_or_404(Goods, id=goods_id)
            cart = applerUser.cart
            cart = json.loads(cart)
            for i in cart:
                if i["goods_id"] == goods_id:
                    i["num"] = num
                    i["thumbnail"] = "http://" + request.get_host() + goods.thumbnail.url
                    isHas = True
                    break
            if (isHas == False):
                goodsInfo = {}
                goodsInfo["goods_id"] = goods_id
                goodsInfo["num"] = num
                goodsInfo["thumbnail"] = "http://" + request.get_host() + goods.thumbnail.url
                cart.append(goodsInfo)

            applerUser.cart = json.dumps(cart)
            applerUser.save()











        else:
            return HttpResponseBadRequest(u"参数错误")


def addCartList(request):
    if request.method == "POST":

        session_key = request.POST.get("session_key", None)
        goods_id = request.POST.get("goods_id", None)
        num = request.POST.get("num", None)
        if (goods_id and session_key and num):
            appletUser = get_or_permissionDenied(AppletUser, xcxSession=session_key)
            cart = json.loads(appletUser.cart)
            # TODO 未加入是否是本人判断

            isExiste = False
            for i in cart:
                if (i["goods_id"] == goods_id):
                    i["num"] = int(num)
                    isExiste = True
                    break
            if (isExiste == False):
                goods = get_object_or_404(Goods, id=goods_id)

                cart.append({"goods_id": goods_id, "num": int(num)})

            appletUser.cart = json.dumps(cart)
            appletUser.save()
            return HttpResponse("ok")

        else:
            return HttpResponseBadRequest(u"参数错误")


def show(request):
    if request.method == 'GET':
        id = request.GET.get("id", 1)
        applet = Applet.objects.get(id=id)

        formHtml = ""
        if hasattr(applet, "showappdata"):

            formHtml = ShowForm(instance=applet.showappdata).as_ul()
        else:
            formHtml = ShowForm().as_ul()
        return render(request, 'userManagement/showManagement.html', {"form": formHtml, "id": id})
    if request.method == 'POST':
        id = request.GET.get("id")
        applet = get_object_or_404(Applet, id=id)
        form = ShowForm(request.POST, request.FILES)
        if form.is_valid():

            if (hasattr(applet, "showappdata")):
                applet.showappdata.indexImage = form.cleaned_data['indexImage']
                applet.showappdata.contactMan = form.cleaned_data['contactMan']
                applet.showappdata.contactNumber = form.cleaned_data['contactNumber']
                applet.showappdata.contactLocation = form.cleaned_data['contactLocation']
                applet.showappdata.save()
                return HttpResponseRedirect("/show/?id=" + id)

            else:
                ShowAppData.objects.create(applet=id,
                                           contactMan=form.cleaned_data['contactMan'],
                                           contactNumber=form.cleaned_data['contactNumber'],
                                           contactLocation=form.cleaned_data['contactLocation'])
                return HttpResponseRedirect("/show/?id=" + id)
        else:
            return render(request, 'userManagement/showManagement.html', {"form": form.as_ul(), "id": id})


def cartList(request):
    if request.method == "GET":
        session_key = request.GET.get("session_key", None)
        if (session_key):
            appletUser = get_or_permissionDenied(AppletUser, xcxSession=session_key)
            cart = json.loads(appletUser.cart)
            # TODO 未加入是否是本人判断
            listdata = []

            for i in cart:
                goodsData = {}
                goods = Goods.objects.filter(id=i["goods_id"])
                if goods.exists():
                    goodsData = serializers.GoodsSerializer(goods[0], many=False, context={'request': request}).data
                    goodsData["num"] = i["num"]
                    listdata.append(goodsData)
            return JsonResponse(listdata, safe=False)

        else:
            raise PermissionDenied()


def deleteCart(request):
    if request.method == "POST":

        session_key = request.POST.get("session_key", None)
        goods_id = request.POST.get("goods_id", None)

        if (goods_id and session_key):
            appletUser = get_or_permissionDenied(AppletUser, xcxSession=session_key)
            cart = json.loads(appletUser.cart)
            # TODO 未加入是否是本人判断

            for i in cart:
                if (i["goods_id"] == goods_id):
                    cart.remove(i)

                    break

            appletUser.cart = json.dumps(cart)
            appletUser.save()
            return HttpResponse("ok")

        else:
            return HttpResponseBadRequest(u"参数错误")