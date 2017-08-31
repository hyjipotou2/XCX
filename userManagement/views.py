# coding=utf-8
import hashlib
import json
import os

import requests
from django.contrib import auth
from django.contrib.auth.decorators import login_required
from django.core.exceptions import PermissionDenied
from django.db.models import Q

from django.http import HttpResponse, HttpResponseRedirect, JsonResponse, HttpResponseBadRequest
from django.shortcuts import render, get_object_or_404, _get_queryset
from django.shortcuts import render_to_response
from django.template.context import RequestContext
from rest_framework import mixins
from rest_framework import viewsets

import serializers
from forms import *


def getSession():
    return hashlib.sha1(os.urandom(24)).hexdigest()


def getXCXData(appid, secret, js_code):
    r = requests.get('https://api.weixin.qq.com/sns/jscode2session',
                     params={'appid': appid, 'secret': secret, 'js_code': js_code,
                             'grant_type': 'authorization_code'})  # 最基本的GET请求
    data = r.json()
    return data


def login(request):
    if request.method == 'GET':

        form = LoginForm()
        return render_to_response('userManagement/login.html', RequestContext(request, {'form': form, }))
    else:

        username = request.POST.get('username', '')
        password = request.POST.get('password', '')
        user = auth.authenticate(username=username, password=password)
        if user is not None and user.is_active:
            auth.login(request, user)

            return HttpResponseRedirect(request.GET.get("next_to", '/index/'))

        else:
            return render_to_response('userManagement/login.html',
                                      RequestContext(request, {'password_is_wrong': True}))


class GoodsViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    def get_queryset(self):
        queryset = Goods.objects.all()

        appletid = self.request.query_params.get("applet")
        if appletid is not None:
            queryset = queryset.filter(applet=appletid)
        return queryset

    queryset = Goods.objects.all()

    serializer_class = serializers.GoodsSerializer


@login_required
def goods(request):
    if request.method == 'GET':
        id = request.GET.get("id", 1)
        goods_set = get_object_or_404(Applet, id=id).goods_set

        List = json.dumps(serializers.GoodsSerializer(goods_set, many=True, context={'request': request}).data)

        # FormSet = inlineformset_factory(Goods, GoodsImage, extra=2,fields="__all__",fk_name="goodsImageForeignKey")
        # return HttpResponse(FormSet(instance=Goods.objects.all()[0]))

        return render(request, 'userManagement/goodsManagement.html', {'List': List, "AddGoodsForm": AddGoodsForm})

@login_required
def index(request):
    if request.method == 'GET':
        xcxSet=request.user.manageuser.applet_set.all()


        # FormSet = inlineformset_factory(Goods, GoodsImage, extra=2,fields="__all__",fk_name="goodsImageForeignKey")
        # return HttpResponse(FormSet(instance=Goods.objects.all()[0]))

        return render(request, 'userManagement/index.html')


@login_required
def orders(request):
    if request.method == 'GET':
        id = request.GET.get("id", 1)
        raise

        # FormSet = inlineformset_factory(Goods, GoodsImage, extra=2,fields="__all__",fk_name="goodsImageForeignKey")
        # return HttpResponse(FormSet(instance=Goods.objects.all()[0]))

        return render(request, 'userManagement/ordersManagement.html')


def getForm(request):
    if request.method == 'GET':
        id = request.GET.get("id", 1)
        goods = get_object_or_404(Goods, id=id)

        formHtml = AddGoodsForm(instance=goods).as_ul()
        print formHtml

        images = goods.goodsimage_set.all()
        imageHtml = ""
        for i in images:
            imageHtml = imageHtml + u'''


        <span class="broadcast-img-list" data-id="%s"><a class="thumbnail" href="javascript:;"><img class="field-img"
                                                                                       src="%s"></a><span
                class="broadcast-img-dele">×</span></span>
        ''' % (i.id, "http://" + request.get_host() + i.image.url)

        ulHtml = u'''<li id="images">
        %s
        <div class="file-input">
            <p class="input-container">
                上传图片
                <input type="file" id="upload" accept="image/*" multiple>
            </p>

        </div>
    </li>

        ''' % (imageHtml,)

        formHtml = formHtml + ulHtml
        print formHtml

        return HttpResponse(formHtml)


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


def wxLogin(request):
    if request.method == 'POST':
        code = request.POST.get("code", None)
        appletId = request.POST.get("app_id", None)

        if (code and appletId):
            applet = get_object_or_404(Applet, id=appletId)
            data = getXCXData(applet.appletId, applet.secret, code)
            appletUserRaw = AppletUser.objects.get_or_create(openid=data['openid'], applet=applet)
            appletUser = appletUserRaw[0]
            appletUser.session = data['session_key']
            appletUser.xcxSession = getSession()
            appletUser.save()
            List = serializers.AppletUserSerializers(appletUser, many=False, context={'request': request}).data
            List["is_login"] = appletUserRaw[1]

            return JsonResponse(List)



        else:
            return HttpResponseBadRequest("错误")


def userInfo(request):
    if request.method == 'POST':
        dic=dict(request.POST)
        session_key = request.POST.get("session_key", None)
        dic.pop("session_key")


        if (session_key):
            appletUser = get_or_permissionDenied(AppletUser, xcxSession=session_key)
            for i in dic:
                setattr(appletUser,i,dic[i])



            appletUser.save()
            List = serializers.AppletUserSerializers(appletUser, many=False, context={'request': request}).data

            return JsonResponse(List)
        else:
            return HttpResponseBadRequest(u"参数错误")
    if request.method == 'GET':

        session_key = request.GET.get("session_key", None)
        if (session_key):
            appletUser = get_or_permissionDenied(AppletUser, xcxSession=session_key)
            List = serializers.AppletUserSerializers(appletUser, many=False, context={'request': request}).data

            return JsonResponse(List)
        else:
            return HttpResponseBadRequest(u"参数错误")


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = serializers.UserSerializer

class AddressViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    def get_queryset(self):
        queryset = Address.objects.all()

        session_key = self.request.query_params.get("session_key")
        if session_key is not None:
            appletUser=get_or_permissionDenied(AppletUser,xcxSession=session_key)
            queryset = queryset.filter(appletUserForeign=appletUser)


        return queryset
    queryset = Address.objects.all()
    serializer_class = serializers.AddressSerializer

class OrderViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin,
                   mixins.RetrieveModelMixin,
                   mixins.UpdateModelMixin,

                   mixins.ListModelMixin, ):
    def get_queryset(self):
        queryset = Order.objects.all().order_by("-createDateTime")


        session_key = self.request.query_params.get("session_key")
        if session_key is not None:
            appletUser = get_or_permissionDenied(AppletUser, xcxSession=session_key)
            queryset = queryset.filter(userForeignKey=appletUser)

        appletid = self.request.query_params.get("applet")
        if appletid:

            applet = Applet.objects.get(id=appletid)

            q = None
            for i in applet.appletuser_set.all():
                if (q):
                    q = q | Q(userForeignKey=i)
                else:
                    q = Q(userForeignKey=i)

            queryset = queryset.filter(q)

        state = self.request.query_params.get("state", None)
        if state:
            queryset = queryset.filter(orderState=state)

        return queryset

    serializer_class = serializers.OrderSerializers
    queryset = Order.objects.all()


def imageUpApi(request):
    if request.method == 'POST':
        outList = []
        for file in request.FILES.values():
            # file_obj = request.FILES.get('file', None)


            outDict = {}

            goodsImage = GoodsImage.objects.create(image=file)

            outDict['id'] = goodsImage.id
            outDict['image'] = "http://" + request.get_host() + goodsImage.image.url
            outList.append(outDict)

        return JsonResponse(outList, safe=False)


class DisableCSRFCheck(object):
    def process_request(self, request):
        setattr(request, '_dont_enforce_csrf_checks', True)


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


def onLogin(request):
    if request.method == "GET":
        session_key = request.POST.get("session_key", None)
        appletuser = AppletUser.objects.filter(xcxSession=session_key)
        if (appletuser.exists()):
            return JsonResponse({"is_login": 2})
        else:
            return JsonResponse({"is_login": 0})

def get_or_permissionDenied(klass, *args, **kwargs):
    queryset = _get_queryset(klass)
    try:
        return queryset.get(*args, **kwargs)
    except queryset.model.DoesNotExist:
        raise PermissionDenied()
def get_appleUser_or_permissionDenied(session_key):
    return get_or_permissionDenied(AppletUser,xcxSession=session_key)

