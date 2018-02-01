from django.contrib import admin

from userManagement import models


# Register your models here.


class ImageInline(admin.StackedInline):
    model = models.GoodsImage
class OrderGoodsInline(admin.StackedInline):
    model = models.OrderGoods

class GoodsAdmin(admin.ModelAdmin):
    inlines =[ImageInline,]
class OrderAdmin(admin.ModelAdmin):
    inlines = [OrderGoodsInline,]
admin.site.register(models.Order,OrderAdmin)
admin.site.register(models.Applet)
admin.site.register(models.AppletUser)
admin.site.register(models.Goods,GoodsAdmin)
admin.site.register(models.GoodsType)
admin.site.register(models.Address)
admin.site.register(models.ShowAppData)
admin.site.register(models.QuestionAppData)
admin.site.register(models.ManageUser)
admin.site.register(models.CarAppData)
admin.site.register(models.Cars)
admin.site.register(models.Phone)
admin.site.register(models.Article)
admin.site.register(models.ArticleCategory)