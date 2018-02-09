from rest_framework import routers

import userManagement.apiViews.appletApiViews as appletApiViews

from userManagement.appletViews import appletViews
from userManagement.manageViews import carViews
from userManagement.manageViews.goodViews import imageUpApi
from userManagement.userViews import userViews
from userManagement.manageViews import goodViews
from userManagement.manageViews import mainViews
from userManagement.manageViews import ordersViews
from userManagement.manageViews import questionViews
from userManagement.manageViews import showViews
from userManagement.rest import viewSet
import userManagement.util

from userManagement import manageViews, views
from django.conf.urls import include, url
from django.contrib import admin
import settings

"""XCX URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""


router = routers.DefaultRouter()
router.register(r'users', viewSet.UserViewSet)
router.register(r'goods', viewSet.GoodsViewSet)
router.register(r'show', viewSet.ShowViewSet)
router.register(r'question', viewSet.QuestionViewSet)
router.register(r'order', viewSet.OrderViewSet)
router.register(r'address', viewSet.AddressViewSet)
router.register(r'cars', viewSet.CarsViewSet)
router.register(r'carsapp', viewSet.CarsAppViewSet)
urlpatterns = [
    url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT}),
    url(r'^api/', include(router.urls)),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^login/', userViews.login),
    url(r'^goods/', goodViews.goods),
    url(r'^index/', appletViews.index),
    url(r'^orders/', ordersViews.orders),
    url(r'^imageupapi/', imageUpApi),
    url(r'^getform/', goodViews.getGoodsForm),
    url(r'^getcarform/', carViews.getCarForm),
    url(r'^wxlogin/', userViews.wxLogin),
    url(r'^userinfo/', userViews.userInfo),
    url(r'^cartlist/', appletApiViews.cartList),
    url(r'^addcartlist/', appletApiViews.addCartList),
    url(r'^deletecart/', appletApiViews.deleteCart),
    url(r'^onlogin/', userViews.onLogin),
    url(r'^logout/', userViews.logout),
    url(r'^setting/', appletViews.setting),
    url(r'^resign/', userViews.resign),
    url(r'^createapplet/', appletViews.createApplet),
    url(r'^deleteapplet/', appletViews.deleteApplet),
    url(r'^weixincallback/', views.weixinCallBack),
    url(r'^getpaymentcode/', userManagement.util.getPaymentCode),
    url(r'^help/', views.help),
    url(r'^$', views.indexShow),
    url(r'^show/', appletApiViews.show),
    url(r'^question/', questionViews.question),
    url(r'^carsapp/', carViews.carsapp),
    url(r'^cars/', carViews.cars),
    url(r'^phone/', views.phoneCall),
    url(r'^phonecall/', views.phoneCall),
    url(r'^ueditor/', include('DjangoUeditor.urls')),
    url(r'^article/(?P<category>\w+)/(?P<id>[1-9]\d*)/$', views.article),
    url(r'^article/(?P<category>\w+)/$', views.category),

]
