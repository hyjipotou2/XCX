# coding:utf-8
import hashlib
import os
from xml.etree import ElementTree
import random
import requests
import sys

from django.core.exceptions import PermissionDenied
from django.http import JsonResponse
from django.shortcuts import _get_queryset, get_object_or_404

from userManagement.models import AppletUser, Order
from userManagement.weixinPay import MyweixinClass

reload(sys)
sys.setdefaultencoding('utf8')

def read_xml(text, findname):
    root = ElementTree.fromstring(text)

    node_find = root.find(findname)
    return (node_find.text)


def getCode(phone):
    code = str(random.randint(1000, 9999))
    r = requests.get('http://qxt.fungo.cn/Recv_center',
                     params={'CpName': "rkdf", 'CpPassword': "rk0902",
                             'DesMobile': phone, "Content": "【短信吧】您的验证码是" + code + ".一分钟内有效"})  # 最基本的GET请求

    return code


def getSession():
    return hashlib.sha1(os.urandom(24)).hexdigest()


def getXCXData(appid, secret, js_code):
    r = requests.get('https://api.weixin.qq.com/sns/jscode2session',
                     params={'appid': appid, 'secret': secret, 'js_code': js_code,
                             'grant_type': 'authorization_code'})  # 最基本的GET请求
    data = r.json()
    return data


def get_or_permissionDenied(klass, *args, **kwargs):
    queryset = _get_queryset(klass)
    try:
        return queryset.get(*args, **kwargs)
    except queryset.model.DoesNotExist:
        raise PermissionDenied()


def get_appleUser_or_permissionDenied(session_key):
    return get_or_permissionDenied(AppletUser, xcxSession=session_key)


def getPaymentCode(request):
    session_key = request.GET.get("session_key")
    order_id = request.GET.get("order_id")
    order = get_object_or_404(Order, id=order_id)
    appletUser = get_appleUser_or_permissionDenied(session_key)
    if request.META.has_key('HTTP_X_FORWARDED_FOR'):
        ip = request.META['HTTP_X_FORWARDED_FOR']
    else:
        ip = request.META['REMOTE_ADDR']

    weixin = MyweixinClass(order, ip, appletUser.openid, appid=appletUser.applet.appletId)
    dict = weixin.getxcxMD5Dict()
    return JsonResponse(dict, safe=False)