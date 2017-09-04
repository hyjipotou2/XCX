# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userManagement', '0008_auto_20170830_0426'),
    ]

    operations = [
        migrations.AddField(
            model_name='applet',
            name='description',
            field=models.CharField(max_length=255, verbose_name='\u63cf\u8ff0', blank=True),
        ),
        migrations.AddField(
            model_name='applet',
            name='image',
            field=models.ImageField(upload_to=b'images', blank=True),
        ),
    ]
