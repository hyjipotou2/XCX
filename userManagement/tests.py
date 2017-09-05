

# Create your tests here.
import json

from django.core.urlresolvers import reverse
from django.test import RequestFactory
from django.test import TestCase
from rest_framework.test import APIRequestFactory, APIClient

from XCX.settings import STATICFILES_DIRS, BASE_DIR
from models import *
import views
class XcxApiTests(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Set up data for the whole TestCase
        cls.xcxSession=views.getSession()
        cls.user=User.objects.create_user(username="test",password="test")
        #cls.manageUser=ManageUser.objects.create(user=cls.user,name="name")
        cls.applet = Applet.objects.create(appletManageUser=cls.user.manageuser,name="d",description="dssfs")
        cls.appletUser = AppletUser.objects.create(openid="sdasd", applet=cls.applet,xcxSession=cls.xcxSession)
        cls.goods=Goods.objects.create(applet=cls.applet,goodsName="test",price=11.6)
        cls.goods2 = Goods.objects.create(applet=cls.applet, goodsName="test", price=11.6)

        cls.address=Address.objects.create(appletUserForeign=cls.appletUser,name="test")
        cls.APIclint = APIClient()
    def test_userInfo(self):
        responsePost=self.client.post(reverse(views.userInfo), {"session_key": self.xcxSession,"gender":"ads"})
        responseGet=self.client.get(reverse(views.userInfo),{"session_key":self.xcxSession})
        self.assertEqual(responseGet.status_code, 200)
        self.assertEqual(responsePost.status_code, 200)

    def test_cartlist(self):
        responsePost = self.client.post(reverse(views.addCartList),{"session_key": self.xcxSession, "goods_id": self.goods.id, "num": 2})
        responsePostDelete = self.client.post(reverse(views.deleteCart),
                                             {"session_key": self.xcxSession, "goods_id": self.goods.id})

        responseGet = self.client.get(reverse(views.cartList), {"session_key": self.xcxSession})
        self.assertEqual(responseGet.status_code, 200)
        self.assertEqual(responsePost.status_code, 200)
        self.assertEqual(responsePostDelete.status_code, 200)
    def test_imageup(self):
        imageuri=STATICFILES_DIRS[0]+"/userManagement/public/images/topLogo.jpg"
        with open(imageuri) as fp:
            responsePost = self.client.post(reverse(views.imageUpApi),
                                            {"image1":fp,"image2":fp})
            self.assertEqual(responsePost.status_code, 200)
    def test_address(self):
        responseGet = self.client.get("/api/address/", {"session_key": self.xcxSession})
        self.assertEqual(responseGet.status_code, 200)

        responsePost = self.client.post("/api/address/", {"session_key": self.xcxSession},format="json")
        self.assertEqual(responsePost.status_code, 400)

        responsePost = self.client.post("/api/address/", {"session_key": self.xcxSession,"name":"test"}, format="json")
        self.assertContains(responsePost,"",status_code=201)

    def test_order(self):
        responseGet = self.APIclint.get("/api/order/", {"session_key": self.xcxSession
                                                                       },)
        self.assertEqual(responseGet.status_code, 200)

        responsePost = self.APIclint.post("/api/order/", {"session_key": self.xcxSession,"orderGoods":[{"id":self.goods.id,"num":10},{"id":self.goods2.id,"num":10}]},format="json")
        self.assertEqual(responsePost.status_code, 201)

        responsePost2 = self.APIclint.post("/api/order/", json.dumps({"session_key": self.xcxSession
                                                       }),format='json')
        self.assertEqual(responsePost2.status_code, 400)
        responsePost3 = self.APIclint.post("/api/order/", json.dumps({"session_key": self.xcxSession,"orderGoods":[]
                                                        }),format='json')
        self.assertEqual(responsePost3.status_code, 400)
    def test_Zip(self):
        import getShopApp
        import os
        shop=getShopApp.Xcx(self.applet.id,self.applet.name,self.applet.description,"uuuuuuu")
        shop.getZipUrl()
        self.assertTrue( os.path.exists(os.path.join(BASE_DIR,"media","app",str(self.applet.id)+".zip")))





