# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userManagement', '0016_auto_20171103_0820'),
    ]

    operations = [
        migrations.CreateModel(
            name='Brand',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('brand', models.CharField(max_length=255, verbose_name='\u54c1\u724c')),
            ],
        ),
        migrations.CreateModel(
            name='CarAppData',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('title', models.CharField(max_length=255, verbose_name='\u6807\u9898', blank=True)),
                ('phone', models.CharField(max_length=255, verbose_name='\u7535\u8bdd', blank=True)),
                ('contact', models.CharField(max_length=255, verbose_name='\u5185\u5bb9\u7b80\u4ecb', blank=True)),
                ('location', models.CharField(max_length=255, verbose_name='\u4f4d\u7f6e', blank=True)),
                ('logo', models.ImageField(upload_to=b'images', max_length=255, verbose_name='logo', blank=True)),
                ('applet', models.OneToOneField(to='userManagement.Applet')),
            ],
        ),
        migrations.CreateModel(
            name='Cars',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('carName', models.CharField(max_length=255, verbose_name='\u5546\u54c1\u540d')),
                ('price', models.FloatField(verbose_name='\u4ef7\u683c')),
                ('image', models.ImageField(upload_to=b'images', max_length=255, verbose_name='\u56fe', blank=True)),
                ('contact', models.TextField(verbose_name='\u4ecb\u7ecd', blank=True)),
                ('modDateTime', models.DateTimeField(auto_now=True, verbose_name='\u6700\u540e\u4fee\u6539\u65e5\u671f')),
                ('createDateTime', models.DateTimeField(auto_now_add=True, verbose_name='\u521b\u5efa\u65e5\u671f')),
                ('applet', models.ForeignKey(to='userManagement.Applet')),
                ('brand', models.ForeignKey(blank=True, to='userManagement.GoodsType', null=True)),
            ],
        ),
    ]
