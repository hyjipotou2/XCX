# coding:utf-8
from django.contrib import auth
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect, JsonResponse, HttpResponseBadRequest
from django.shortcuts import render_to_response, get_object_or_404
from django.template import RequestContext

from userManagement.forms import LoginForm, ResignForm
from userManagement.models import Applet, AppletUser
from userManagement.rest import serializers
from userManagement.util import getXCXData, getSession, get_or_permissionDenied


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


def resign(request):
    if request.method == "GET":
        return render_to_response('userManagement/resign.html',
                                  RequestContext(request, {'form': ResignForm}))
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        if (User.objects.filter(username=username).exists()):
            return render_to_response('userManagement/resign.html',
                                      RequestContext(request, {'username_is_exists': True}))

        User.objects.create_user(username, password=password)
        user = auth.authenticate(username=username, password=password)
        auth.login(request, user)

        return HttpResponseRedirect(request.GET.get("next_to", '/index/'))


@login_required
def logout(request):
    auth.logout(request)
    return HttpResponseRedirect("/login/")


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
        dic = request.POST
        session_key = request.POST.get("session_key", None)

        if (session_key):
            appletUser = get_or_permissionDenied(AppletUser, xcxSession=session_key)
            for i in dic:
                if (i == "session_key"):
                    continue
                setattr(appletUser, i, dic[i])

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


def onLogin(request):
    if request.method == "GET":
        session_key = request.POST.get("session_key", None)
        appletuser = AppletUser.objects.filter(xcxSession=session_key)
        if (appletuser.exists()):
            return JsonResponse({"is_login": 2})
        else:
            return JsonResponse({"is_login": 0})