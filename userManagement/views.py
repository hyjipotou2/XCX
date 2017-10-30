#coding:utf-8
import hashlib
import json
import os
from xml.etree import ElementTree
import random
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
from userManagement.getApp import Xcx

import sys

from userManagement.weixinPay import MyweixinClass

reload(sys)
sys.setdefaultencoding('utf8')
def read_xml(text, findname):
    root = ElementTree.fromstring(text)

    node_find = root.find(findname)
    return (node_find.text)
def getCode(phone):
    code=str(random.randint(1000,9999))
    r = requests.get('http://qxt.fungo.cn/Recv_center',
                     params={'CpName': "rkdf", 'CpPassword': "rk0902",
                             'DesMobile': phone,"Content":"【短信吧】您的验证码是"+code+".一分钟内有效"})  # 最基本的GET请求

    return code

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

        return render(request, 'userManagement/goodsManagement.html', {'List': List, "AddGoodsForm": AddGoodsForm,"id":id})
@login_required
def setting(request):
    if request.method == 'GET':
        id = request.GET.get("id", 1)
        applet = get_object_or_404(Applet, id=id)

        List = json.dumps(serializers.AppletSerializer(applet, many=False, context={'request': request}).data)

        # FormSet = inlineformset_factory(Goods, GoodsImage, extra=2,fields="__all__",fk_name="goodsImageForeignKey")
        # return HttpResponse(FormSet(instance=Goods.objects.all()[0]))

        return render(request, 'userManagement/setting.html', {'List': List,"id":id})
    if request.method == 'POST':
        id = request.POST.get("id", 1)
        applet = get_object_or_404(Applet, id=id)

        AppId=request.POST.get("AppId")
        AppSecret=request.POST.get("AppSecret")
        Description = request.POST.get("description","小程序应用")

        applet.appletId=AppId
        applet.secret=AppSecret

        #applet.description=Description
        applet.save()
        imageurl="http://"+request.get_host()+applet.image.url
        xcxObj=Xcx(applet.id,applet.name,applet.description,imageurl,applet.type)
        dict={}
        dict["url"]=xcxObj.getZipUrl()
        return  JsonResponse(dict,safe=False)












@login_required
def index(request):
    if request.method == 'GET':
        xcx_set=request.user.manageuser.applet_set.all()
        xcx_list = serializers.AppletSerializer(xcx_set, many=True, context={'request': request}).data
        for i in range(0,len(xcx_list)):
            xcx_list[i]["createDateTime"]=xcx_set[i].createDateTime
            xcx_list[i]["modDateTime"] = xcx_set[i].modDateTime
        types=Applet.appletType


        return render(request, 'userManagement/index.html',{"applet_list":xcx_list,"User":request.user,"applet_types":types})

@login_required
def logout(request):
    auth.logout(request)
    return HttpResponseRedirect("/login/")
@login_required
def orders(request):
    if request.method == 'GET':
        id = request.GET.get("id", 1)



        
        

        return render(request, 'userManagement/ordersManagement.html',{"id":id})


def getForm(request):
    if request.method == 'GET':
        id = request.GET.get("id", 1)
        goods = get_object_or_404(Goods, id=id)

        formHtml = AddGoodsForm(instance=goods).as_ul()


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
        dic=request.POST
        session_key = request.POST.get("session_key", None)



        if (session_key):
            appletUser = get_or_permissionDenied(AppletUser, xcxSession=session_key)
            for i in dic:
                if(i=="session_key"):
                    continue
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
class ShowViewSet(viewsets.ReadOnlyModelViewSet):
    def get_queryset(self):
        queryset = ShowAppData.objects.all()

        app_id = self.request.query_params.get("_app_id")
        if app_id is not None:
            applet=get_object_or_404(Applet,id=app_id)
            queryset =queryset.filter(applet=applet)


        return queryset
    serializer_class = serializers.ShowSerializers
    queryset = ShowAppData.objects.all()

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
def resign(request):
    if request.method == "GET":

        return render_to_response('userManagement/resign.html',
                                  RequestContext(request, {'form':ResignForm}))
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        if(User.objects.filter(username=username).exists()):
            return render_to_response('userManagement/resign.html',
                                  RequestContext(request, {'username_is_exists':True}))

        User.objects.create_user(username,password=password)
        user = auth.authenticate(username=username, password=password)
        auth.login(request, user)

        return HttpResponseRedirect(request.GET.get("next_to", '/index/'))

class AppletViewSet(viewsets.GenericViewSet, mixins.CreateModelMixin,
                   mixins.DestroyModelMixin,mixins.UpdateModelMixin):
    serializer_class = serializers.AppletSerializer
    queryset = Applet.objects.all()


def createApplet(request):
    if request.method=="POST":
        user=request.user
        name=request.POST.get("name","APP")
        description=request.POST.get("description","APP")
        image=request.FILES.get("image")
        type=request.POST.get("type",0)
        Applet.objects.create(appletManageUser=user.manageuser,name=name,description=description,image=image,type=type)
        return HttpResponse("ok")
def deleteApplet(request):
    if request.method=="POST":
        id=request.POST.get("id")
        applet=get_object_or_404(Applet,id=id)
        applet.delete()
        return HttpResponse("ok")


def weixinCallBack(request):
    if request.method == 'POST':
        xml = request.body
        mtrade_status = (read_xml(xml, "return_code"))

        if (mtrade_status == 'SUCCESS'):
            mOrder = Order.objects.get(id=(read_xml(xml, "attach")))
            mOrder.orderState = 1
            mOrder.save()

        return HttpResponse(
            "<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>")

def getPaymentCode(request):
    session_key = request.GET.get("session_key")
    order_id=request.GET.get("order_id")
    order=get_object_or_404(Order,id=order_id)
    appletUser=get_appleUser_or_permissionDenied(session_key)
    if request.META.has_key('HTTP_X_FORWARDED_FOR'):
        ip = request.META['HTTP_X_FORWARDED_FOR']
    else:
        ip = request.META['REMOTE_ADDR']

    weixin=MyweixinClass(order,ip,appletUser.openid,appid=appletUser.applet.appletId)
    dict=weixin.getxcxMD5Dict()
    return JsonResponse(dict,safe=False)
def help(request):
    return render(request, 'userManagement/help.html')
def indexShow(request):
    return render(request, 'userManagement/indexshow.html', {"User": request.user})
def show(request):
    if request.method == 'GET':
        id = request.GET.get("id", 1)
        applet = Applet.objects.get(id=id)


        formHtml=""
        if hasattr(applet,"showappdata"):

            formHtml = ShowForm(instance=applet.showappdata).as_ul()
        else:
            formHtml = ShowForm().as_ul()
        return render(request,'userManagement/showManagement.html',{"form":formHtml,"id":id})
    if request.method== 'POST':
        id=request.GET.get("id")
        applet=get_object_or_404(Applet,id=id)
        form = ShowForm(request.POST,request.FILES)
        if form.is_valid():

            if(hasattr(applet,"showappdata")):
                applet.showappdata.indexImage=form.cleaned_data['indexImage']
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
                return HttpResponseRedirect("/show/?id="+id)
        else:
            return render(request,'userManagement/showManagement.html',{"form":form.as_ul(),"id":id})
def question(request):
    if request.method == 'GET':
        id = request.GET.get("id", 1)
        applet=Applet.objects.get(id=id)
        formHtml=""
        if hasattr(applet,"questionappdata"):

            formHtml = QuestionForm(instance=applet.questionappdata).as_ul()
        else:
            formHtml = QuestionForm().as_ul()
        return render(request,'userManagement/questionManagement.html',{"form":formHtml,"id":id})
    if request.method== 'POST':
        id=request.GET.get("id")
        applet=get_object_or_404(Applet,id=id)
        form = QuestionForm(request.POST,request.FILES)
        if form.is_valid():

            if(hasattr(applet,"questionappdata")):
                form = QuestionForm(request.POST, request.FILES, instance=applet)
                form.save()

                return HttpResponseRedirect("/question/?id=" + id)

            else:
                QuestionAppData.objects.create(applet=applet,
                                        **form.cleaned_data)
                return HttpResponseRedirect("/question/?id="+id)
        else:
            return render(request,'userManagement/questionManagement.html',{"form":form.as_ul(),"id":id})



class QuestionViewSet(viewsets.ReadOnlyModelViewSet):
    def get_queryset(self):
        queryset = QuestionAppData.objects.all()

        app_id = self.request.query_params.get("_app_id")
        if app_id is not None:
            applet=get_object_or_404(Applet,id=app_id)
            queryset =queryset.filter(applet=applet)


        return queryset
    serializer_class = serializers.QuestionSerializers
    queryset = QuestionAppData.objects.all()









