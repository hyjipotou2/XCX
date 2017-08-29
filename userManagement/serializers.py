#coding=utf-8

from django.shortcuts import get_object_or_404
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from models import *
import views


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User

        fields = "__all__"
class TrackListingField(serializers.RelatedField):
    def to_representation(self, value):
       # self.context
       # value.kwargs['context']=self.context

        return "http://"+self.context["request"].get_host()+value.image.url
class GoodsSerializer(serializers.ModelSerializer):

    def update(self, instance, validated_data):
        goodsimage_set = self.initial_data.get("goodsimage_set", None)


        instance.goodsimage_set.all().delete()
        if (goodsimage_set):
            goodsimage_set_ids = goodsimage_set.split(",")
            for goodsimageid in goodsimage_set_ids:
                goodsimage = get_object_or_404(GoodsImage, id=goodsimageid)
                goodsimage.goodsImageForeignKey = instance
                goodsimage.save()




        typeid=self.initial_data.get("goodsType",None)
        if(typeid):
            instance.goodsType=get_object_or_404(GoodsType,id=typeid)



        return super(GoodsSerializer, self).update(instance, validated_data)

    def create(self, validated_data):

        goods=Goods.objects.create(**validated_data)


        goodsimage_set=self.initial_data.get("goodsimage_set",None)
        type=self.initial_data.get("type",None)

        if(type):
            goods.type=get_object_or_404(GoodsType, id=type)
            goods.save()

        if(goodsimage_set):
            goodsimage_set_ids=goodsimage_set.split(",")
            for id in goodsimage_set_ids:
                goodsimage = get_object_or_404(GoodsImage, id=id)
                goodsimage.goodsImageForeignKey=goods
                goodsimage.save()


        return goods

    goodsimage_set=TrackListingField(many=True, read_only=True)
    goodsType=serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Goods
        fields ="__all__"
class OrderGoodsSerializers(serializers.ModelSerializer):
    class Meta:
        depth=1
        model=OrderGoods
        exclude=('orderForeignKey',)
class AppletUserSerializers(serializers.ModelSerializer):
    class Meta:
        model=AppletUser
        fields = "__all__"


class OrderSerializers(serializers.ModelSerializer):




    ordergoods_set=OrderGoodsSerializers(many=True,read_only=True)
    userForeignKey=serializers.StringRelatedField(read_only=True)

    def create(self, validated_data):
        totalPrice = 0.0
        goodsOrders = self.initial_data.get("orderGoods",None)
        session=self.initial_data.get("session_key",None)
        appletUser = views.get_appleUser_or_permissionDenied(session)
        order = Order.objects.create(userForeignKey=appletUser,**validated_data)

        if goodsOrders is None or len(goodsOrders)<=0:
            raise ValidationError(u"商品列表不能为空")
        for goodsOrder in goodsOrders:
            goods = get_object_or_404(Goods, id=goodsOrder["id"])
            orderGoodstotalPrice = goods.price * goodsOrder["num"]
            orderGoods = OrderGoods.objects.create(goods=goods, totalPrice=orderGoodstotalPrice,
                                                   orderGoodsnumber=goodsOrder["num"],orderForeignKey=order)


            totalPrice += orderGoodstotalPrice
        order.originalPrice=totalPrice
        order.totalPrice = totalPrice
        order.payPrice = totalPrice
        order.save()

        return order

    class Meta:
        depth=1
        model=Order
        exclude=("userForeignKey",)


class AddressSerializer(serializers.ModelSerializer):
    def create(self, validated_data):

        session_key=self.initial_data.get("session_key",None)
        appletUser=views.get_or_permissionDenied(AppletUser,xcxSession=session_key)
        address = Address.objects.create(appletUserForeign=appletUser,**validated_data)
        return address
    class Meta:
        model = Address

        exclude =("appletUserForeign",)