#coding:utf-8
from django.db import models
from django.db.models import signals
from django.dispatch import receiver
# Create your models here.
from django.contrib.auth.models import User

class GoodsType(models.Model):
    goodsType=models.CharField(u'分类',max_length=255)
    def __unicode__(self):
        return self.goodsType




class Goods(models.Model):
    goodsType=models.ForeignKey(GoodsType,null=True,blank=True)
    applet=models.ForeignKey('Applet')

    standard = models.CharField(u'规格', max_length=255, blank=True)

    goodsName = models.CharField(u'商品名', max_length=255)


    isAlive=models.BooleanField(u'是否上架销售')
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



class ManageUser(models.Model):
    user=models.OneToOneField(User, on_delete=models.CASCADE)

    name = models.CharField(u'昵称', max_length=255)
    modDateTime = models.DateTimeField(u'最后修改日期', auto_now=True)
    createDateTime = models.DateTimeField(u'创建日期', auto_now_add=True)
    accountPrice = models.FloatField(u'账户余额', default=0.0)
    cashApplicationChoices = ((0, u'已完成'), (1, u'申请提现'))
    cashApplication = models.IntegerField(u'提现申请状态', choices=cashApplicationChoices, default=0)
    zhifubaoCount = models.CharField(u'支付宝账号', blank=True, max_length=255)

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
    appletManageUser=models.ForeignKey(ManageUser)


class AppletUser(models.Model):
    applet=models.ForeignKey(Applet)
    phone=models.CharField(u"手机",max_length=255)
    passWord=models.CharField(u"密码",max_length=255)
    def __unicode__(self):
        return self.phone






class OrderGoods(models.Model):
    goods = models.ForeignKey(Goods)
    prderGoodsnumber = models.IntegerField(u'数量')
    orderForeignKey = models.ForeignKey('Order', null=True, blank=True)
    totalPrice = models.FloatField(u'总价', default=0.0)


    def __unicode__(self):
        return self.id.__str__()


class Order(models.Model):
    deliveryPosition = models.CharField(u'送货位置', max_length=255,blank=True)
    modDateTime = models.DateTimeField(u'最后修改日期', auto_now=True)
    createDateTime = models.DateTimeField(u'创建日期', auto_now_add=True)
    orderStateChoices = ((-1, u'已删除'), (0, u'待付款'),(1,u'待发货'), (2, u'配送中'), (3, u'交易完成'))

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





