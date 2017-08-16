# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Applet',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255, verbose_name='\u540d\u79f0')),
                ('secret', models.CharField(max_length=255, verbose_name='secret', blank=True)),
                ('modDateTime', models.DateTimeField(auto_now=True, verbose_name='\u6700\u540e\u4fee\u6539\u65e5\u671f')),
                ('createDateTime', models.DateTimeField(auto_now_add=True, verbose_name='\u521b\u5efa\u65e5\u671f')),
            ],
        ),
        migrations.CreateModel(
            name='AppletUser',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('openid', models.CharField(max_length=255)),
                ('session', models.CharField(max_length=255, blank=True)),
                ('modDateTime', models.DateTimeField(auto_now=True, verbose_name='\u6700\u540e\u4fee\u6539\u65e5\u671f')),
                ('createDateTime', models.DateTimeField(auto_now_add=True, verbose_name='\u521b\u5efa\u65e5\u671f')),
                ('phone', models.CharField(max_length=255, verbose_name='\u624b\u673a', blank=True)),
                ('passWord', models.CharField(max_length=255, verbose_name='\u5bc6\u7801', blank=True)),
                ('cart', models.CharField(default=b'[]', max_length=255, verbose_name='\u8d2d\u7269\u8f66')),
                ('applet', models.ForeignKey(to='userManagement.Applet')),
            ],
        ),
        migrations.CreateModel(
            name='Goods',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('standard', models.CharField(max_length=255, verbose_name='\u89c4\u683c', blank=True)),
                ('goodsName', models.CharField(max_length=255, verbose_name='\u5546\u54c1\u540d')),
                ('isAlive', models.BooleanField(verbose_name='\u662f\u5426\u4e0a\u67b6\u9500\u552e')),
                ('salesVolume', models.IntegerField(default=0, verbose_name='\u9500\u91cf')),
                ('price', models.FloatField(verbose_name='\u4ef7\u683c')),
                ('thumbnail', models.ImageField(upload_to=b'images', max_length=255, verbose_name='\u7f29\u7565\u56fe', blank=True)),
                ('productDetails', models.ImageField(upload_to=b'images', max_length=255, verbose_name='\u5546\u54c1\u8be6\u60c5', blank=True)),
                ('stock', models.IntegerField(default=0, verbose_name='\u5e93\u5b58')),
                ('modDateTime', models.DateTimeField(auto_now=True, verbose_name='\u6700\u540e\u4fee\u6539\u65e5\u671f')),
                ('createDateTime', models.DateTimeField(auto_now_add=True, verbose_name='\u521b\u5efa\u65e5\u671f')),
                ('freeShipping', models.BooleanField(default=False, verbose_name='\u90ae\u8d39')),
                ('postage', models.FloatField(default=0.0, verbose_name='\u90ae\u8d39')),
                ('applet', models.ForeignKey(to='userManagement.Applet')),
            ],
        ),
        migrations.CreateModel(
            name='GoodsImage',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('image', models.ImageField(max_length=255, upload_to=b'images')),
                ('goodsImageForeignKey', models.ForeignKey(blank=True, to='userManagement.Goods', null=True)),
            ],
        ),
        migrations.CreateModel(
            name='GoodsType',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('goodsType', models.CharField(max_length=255, verbose_name='\u5206\u7c7b')),
            ],
        ),
        migrations.CreateModel(
            name='ManageUser',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255, verbose_name='\u6635\u79f0')),
                ('modDateTime', models.DateTimeField(auto_now=True, verbose_name='\u6700\u540e\u4fee\u6539\u65e5\u671f')),
                ('createDateTime', models.DateTimeField(auto_now_add=True, verbose_name='\u521b\u5efa\u65e5\u671f')),
                ('accountPrice', models.FloatField(default=0.0, verbose_name='\u8d26\u6237\u4f59\u989d')),
                ('cashApplication', models.IntegerField(default=0, verbose_name='\u63d0\u73b0\u7533\u8bf7\u72b6\u6001', choices=[(0, '\u5df2\u5b8c\u6210'), (1, '\u7533\u8bf7\u63d0\u73b0')])),
                ('zhifubaoCount', models.CharField(max_length=255, verbose_name='\u652f\u4ed8\u5b9d\u8d26\u53f7', blank=True)),
                ('user', models.OneToOneField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('deliveryName', models.CharField(max_length=255, verbose_name='\u6536\u83b7\u4eba\u540d\u79f0', blank=True)),
                ('deliveryPosition', models.CharField(max_length=255, verbose_name='\u9001\u8d27\u4f4d\u7f6e', blank=True)),
                ('modDateTime', models.DateTimeField(auto_now=True, verbose_name='\u6700\u540e\u4fee\u6539\u65e5\u671f')),
                ('createDateTime', models.DateTimeField(auto_now_add=True, verbose_name='\u521b\u5efa\u65e5\u671f')),
                ('orderState', models.IntegerField(default=0, verbose_name='\u8ba2\u5355\u72b6\u6001', choices=[(-1, '\u5df2\u5220\u9664'), (0, '\u5f85\u4ed8\u6b3e'), (1, '\u5f85\u53d1\u8d27'), (2, '\u914d\u9001\u4e2d'), (3, '\u4ea4\u6613\u5b8c\u6210')])),
                ('originalPrice', models.FloatField(default=0.0, verbose_name='\u539f\u4ef7')),
                ('totalPrice', models.FloatField(default=0.0, verbose_name='\u603b\u4ef7')),
                ('payPrice', models.FloatField(default=0.0, verbose_name='\u652f\u4ed8\u603b\u4ef7')),
                ('userForeignKey', models.ForeignKey(to='userManagement.AppletUser', null=True)),
            ],
        ),
        migrations.CreateModel(
            name='OrderGoods',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('orderGoodsnumber', models.IntegerField(verbose_name='\u6570\u91cf')),
                ('totalPrice', models.FloatField(default=0.0, verbose_name='\u603b\u4ef7')),
                ('goods', models.ForeignKey(to='userManagement.Goods')),
                ('orderForeignKey', models.ForeignKey(blank=True, to='userManagement.Order', null=True)),
            ],
        ),
        migrations.AddField(
            model_name='goods',
            name='goodsType',
            field=models.ForeignKey(blank=True, to='userManagement.GoodsType', null=True),
        ),
        migrations.AddField(
            model_name='applet',
            name='appletManageUser',
            field=models.ForeignKey(to='userManagement.ManageUser'),
        ),
    ]
