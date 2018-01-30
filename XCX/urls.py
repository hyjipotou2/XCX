from rest_framework import routers

from userManagement import views

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
from django.conf.urls import include, url
from django.contrib import admin
import settings
router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'goods',views.GoodsViewSet)
router.register(r'show',views.ShowViewSet)

router.register(r'question',views.QuestionViewSet)
router.register(r'order',views.OrderViewSet)
router.register(r'address',views.AddressViewSet)
router.register(r'cars',views.CarsViewSet)
router.register(r'carsapp',views.CarsAppViewSet)
urlpatterns = [
url(r'^media/(?P<path>.*)$', 'django.views.static.serve',{'document_root': settings.MEDIA_ROOT}),
   url(r'^api/', include(router.urls)),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^login/', views.login),
    url(r'^goods/', views.goods),
    url(r'^index/', views.index),
    url(r'^orders/', views.orders),
    url(r'^imageupapi/', views.imageUpApi),
    url(r'^getform/',views.getForm),
 url(r'^getcarform/', views.getCarForm),

    url(r'^wxlogin/', views.wxLogin),
    url(r'^userinfo/', views.userInfo),
url(r'^cartlist/', views.cartList),
url(r'^addcartlist/', views.addCartList),
url(r'^deletecart/', views.deleteCart),
url(r'^onlogin/', views.onLogin),
 url(r'^logout/',views.logout),
url(r'^setting/', views.setting),
url(r'^resign/', views.resign),
url(r'^createapplet/', views.createApplet),
url(r'^deleteapplet/', views.deleteApplet),
 url(r'^weixincallback/', views.weixinCallBack),
 url(r'^getpaymentcode/', views.getPaymentCode),
 url(r'^help/', views.help),
 url(r'^$', views.indexShow),
 url(r'^show/', views.show),
 url(r'^question/', views.question),
url(r'^carsapp/', views.carsapp),
url(r'^cars/', views.cars),
url(r'^phone/', views.phone),
 url(r'^phonecall/', views.phoneCall),
 url(r'^tinymce/', include('tinymce.urls')),








]
