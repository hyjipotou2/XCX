# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userManagement', '0015_applet_haspermission'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='applet',
            name='hasPermission',
        ),
        migrations.AddField(
            model_name='manageuser',
            name='hasPermission',
            field=models.BooleanField(default=False, verbose_name='\u5de6\u53f3\u8111\u6743\u9650'),
        ),
    ]
