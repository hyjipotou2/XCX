#coding:utf-8
from django.contrib.auth.models import User
from django.db import models
from django.db.models import signals
from django.dispatch import receiver


class GoodsType(models.Model):
    goodsType=models.CharField(u'分类',max_length=255)
    def __unicode__(self):
        return self.goodsType
class Brand(models.Model):
    brand=models.CharField(u'品牌',max_length=255)
    def __unicode__(self):
        return self.brand




class Goods(models.Model):
    goodsType=models.ForeignKey(GoodsType,null=True,blank=True)
    applet=models.ForeignKey('Applet')

    standard = models.CharField(u'规格', max_length=255, blank=True)

    goodsName = models.CharField(u'商品名', max_length=255)


    isAlive=models.BooleanField(u'是否上架销售',default=True)
    salesVolume=models.IntegerField(u"销量",default=0)
    price = models.FloatField(u'价格')
    thumbnail = models.ImageField(u'缩略图', upload_to='images', max_length=255, blank=True)
    productDetails = models.ImageField(u'商品详情', upload_to='images', max_length=255, blank=True)
    stock=models.IntegerField(u'库存',default=0)
    modDateTime = models.DateTimeField(u'最后修改日期', auto_now=True)
    createDateTime = models.DateTimeField(u'创建日期', auto_now_add=True)
    freeShipping=models.BooleanField(u'邮费',default=False)
    postage=models.FloatField(u'邮费',default=0.00)





    def __unicode__(self):
        return self.goodsName

class Cars(models.Model):
    brand=models.ForeignKey(GoodsType,null=True,blank=True)
    applet=models.ForeignKey('Applet')



    carName = models.CharField(u'商品名', max_length=255)




    price = models.FloatField(u'价格')
    image = models.ImageField(u'图', upload_to='images', max_length=255, blank=True)
    contact=models.TextField(u"介绍",blank=True)

    modDateTime = models.DateTimeField(u'最后修改日期', auto_now=True)
    createDateTime = models.DateTimeField(u'创建日期', auto_now_add=True)






    def __unicode__(self):
        return self.carName


class ManageUser(models.Model):
    user=models.OneToOneField(User, on_delete=models.CASCADE)
    code=models.CharField(max_length=10, blank=True)
    name = models.CharField(u'昵称', max_length=255)
    modDateTime = models.DateTimeField(u'最后修改日期', auto_now=True)
    createDateTime = models.DateTimeField(u'创建日期', auto_now_add=True)
    accountPrice = models.FloatField(u'账户余额', default=0.0)
    cashApplicationChoices = ((0, u'已完成'), (1, u'申请提现'))
    cashApplication = models.IntegerField(u'提现申请状态', choices=cashApplicationChoices, default=0)
    zhifubaoCount = models.CharField(u'支付宝账号', blank=True, max_length=255)
    hasPermission = models.BooleanField(u"左右脑权限", default=False)
    def __unicode__(self):
        return self.user.username

    @receiver(signals.post_save, sender=User)
    def create_user_myuser(sender, instance, created, **kwargs):
        if created:
            ManageUser.objects.create(user=instance)

    @receiver(signals.post_save, sender=User)
    def save_user_myuser(sender, instance, **kwargs):
        if hasattr(instance,"user"):
            instance.user.save()

class Applet(models.Model):
    name=models.CharField(u'名称', max_length=255)
    description = models.CharField(u'描述', max_length=255,blank=True)
    image=models.ImageField(upload_to="images",blank=True,default="images/topLogo_LThzOqp.jpg")
    appletId=models.CharField(u"ID",max_length=255,blank=True)
    secret=models.CharField(u"secret",max_length=255,blank=True)
    modDateTime = models.DateTimeField(u'最后修改日期', auto_now=True)
    createDateTime = models.DateTimeField(u'创建日期', auto_now_add=True)
    appletType=((2,"左右脑测试"),(0,"商城"),(1,"公司展示"),((3,"车辆展示以及销售")))
    type=models.IntegerField(u'类型',choices=appletType,default=0)


    appletManageUser=models.ForeignKey(ManageUser)
    def __unicode__(self):
        return self.appletManageUser.user.username+" "+self.name


class AppletUser(models.Model):
    applet=models.ForeignKey(Applet)
    openid=models.CharField(max_length=255)
    session=models.CharField(max_length=255,blank=True)
    xcxSession=models.CharField(max_length=255,blank=True)
    modDateTime = models.DateTimeField(u'最后修改日期', auto_now=True)
    createDateTime = models.DateTimeField(u'创建日期', auto_now_add=True)
    phone=models.CharField(u"手机",max_length=255,blank=True)
    passWord=models.CharField(u"密码",max_length=255,blank=True)
    gender =models.CharField(max_length=255,blank=True)
    city = models.CharField(max_length=255,blank=True)
    province = models.CharField(max_length=255,blank=True)
    country =models.CharField(max_length=255,blank=True)
    avatarUrl = models.CharField(max_length=255,blank=True)
    nickname=models.CharField(max_length=255,blank=True)
    cart=models.CharField(u'购物车',max_length=255,default="[]")
    def __unicode__(self):
        return self.phone






class OrderGoods(models.Model):
    goods = models.ForeignKey(Goods)
    orderGoodsnumber = models.IntegerField(u'数量')
    orderForeignKey = models.ForeignKey('Order', null=True, blank=True)
    totalPrice = models.FloatField(u'总价', default=0.0)


    def __unicode__(self):
        return self.id.__str__()


class Order(models.Model):
    deliveryName=models.CharField(u'收获人名称',max_length=255,blank=True)
    deliveryPosition = models.CharField(u'送货位置', max_length=255,blank=True)
    modDateTime = models.DateTimeField(u'最后修改日期', auto_now=True)
    createDateTime = models.DateTimeField(u'创建日期', auto_now_add=True)
    orderStateChoices = ((-1, u'已删除'), (0, u'待付款'),(1,u'待发货'), (2, u'配送中'), (3, u'交易完成'))
    contact = models.CharField(u'电话', max_length=255, blank=True)
    orderState = models.IntegerField(u'订单状态', choices=orderStateChoices, default=0)
    originalPrice = models.FloatField(u'原价', default=0.0)
    totalPrice = models.FloatField(u'总价', default=0.0)
    payPrice = models.FloatField(u'支付总价', default=0.0)
    userForeignKey = models.ForeignKey(AppletUser, null=True)
    def __unicode__(self):
        return self.id.__str__()





class GoodsImage(models.Model):
    image = models.ImageField(upload_to='images', max_length=255)
    goodsImageForeignKey = models.ForeignKey(Goods,null=True,blank=True)

    def __unicode__(self):
        return self.image.name


class Address(models.Model):
    appletUserForeign = models.ForeignKey(AppletUser)
    name=models.CharField(u"姓名",max_length=255)
    detailAddress=models.CharField(u"地址",max_length=255,blank=True)
    contact=models.CharField(u'电话',max_length=255,blank=True)
    province=models.CharField(u'省',max_length=255,blank=True)
    city=models.CharField(u'市',max_length=255,blank=True)
    district=models.CharField(u'区',max_length=255,blank=True)
    countyName=models.CharField(u'国',max_length=255,blank=True)
    def __unicode__(self):
        return self.name

class ShowAppData(models.Model):
    applet = models.OneToOneField(Applet)
    indexImage=models.ImageField(u"首页图片",upload_to='images', max_length=255)
    contactMan=models.CharField(u"联系人",max_length=255)
    contactNumber = models.CharField(u"联系方式", max_length=255)
    contactLocation = models.CharField(u"地址", max_length=255)
class QuestionAppData(models.Model):
    applet=models.OneToOneField(Applet)
    image1 = models.ImageField(u"广告图片1",blank=True,upload_to='images', max_length=255)
    image2 = models.ImageField(u"广告图片2",blank=True,upload_to='images', max_length=255)
    image3 = models.ImageField(u"广告图片3",blank=True,upload_to='images', max_length=255)


class CarAppData(models.Model):
    applet=models.OneToOneField(Applet)
    title=models.CharField(u"标题",blank=True,max_length=255)
    phone=models.CharField(u"电话",blank=True,max_length=255)
    contact=models.CharField(u'内容简介',blank=True,max_length=255)
    location=models.CharField(u'位置',blank=True,max_length=255)
    logo=models.ImageField(u"logo",blank=True,upload_to='images', max_length=255)

class Phone(models.Model):
    phone=models.CharField(u"电话号码",max_length=18)
    modDateTime = models.DateTimeField(u'最后修改日期', auto_now=True)
    createDateTime = models.DateTimeField(u'创建日期', auto_now_add=True)
