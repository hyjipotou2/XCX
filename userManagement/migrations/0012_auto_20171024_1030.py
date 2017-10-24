# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userManagement', '0011_order_contact'),
    ]

    operations = [
        migrations.CreateModel(
            name='ShowAppData',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('indexImage', models.ImageField(upload_to=b'images', max_length=255, verbose_name='\u9996\u9875\u56fe\u7247')),
                ('contactMan', models.CharField(max_length=255, verbose_name='\u8054\u7cfb\u4eba')),
                ('contactNumber', models.CharField(max_length=255, verbose_name='\u8054\u7cfb\u65b9\u5f0f')),
                ('contactLocation', models.CharField(max_length=255, verbose_name='\u5730\u5740')),
            ],
        ),
        migrations.AddField(
            model_name='applet',
            name='type',
            field=models.IntegerField(default=0, verbose_name='\u7c7b\u578b', choices=[(0, b'\xe5\x95\x86\xe5\x9f\x8e'), (1, b'\xe5\x85\xac\xe5\x8f\xb8\xe5\xb1\x95\xe7\xa4\xba')]),
        ),
        migrations.AddField(
            model_name='showappdata',
            name='applet',
            field=models.ForeignKey(to='userManagement.Applet'),
        ),
    ]
