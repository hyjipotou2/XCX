# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userManagement', '0014_auto_20171030_1221'),
    ]

    operations = [
        migrations.AddField(
            model_name='applet',
            name='hasPermission',
            field=models.BooleanField(default=False, verbose_name='\u5de6\u53f3\u8111\u6743\u9650'),
        ),
    ]
