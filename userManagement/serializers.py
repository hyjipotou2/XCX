#coding=utf-8
from django.contrib.auth.models import User, Group
from models import *
from rest_framework import serializers

from django.shortcuts import render_to_response,render,get_object_or_404
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
        exclude=('passWord','openid',"session")
class OrderSerializers(serializers.ModelSerializer):




    ordergoods_set=OrderGoodsSerializers(many=True,read_only=True)
    userForeignKey=serializers.StringRelatedField(read_only=True)

    def create(self, validated_data):
        totalPrice = 0.0
        goodsOrders = self.initial_data.get("orderGoods",None)
        order = Order.objects.create(**validated_data)

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
        fields="__all__"


