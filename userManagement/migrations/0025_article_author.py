# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userManagement', '0024_auto_20180202_1322'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='author',
            field=models.CharField(default='\u4e88\u4e30\u79d1\u6280', max_length=255, verbose_name='\u4f5c\u8005'),
        ),
    ]
