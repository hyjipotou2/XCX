# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userManagement', '0017_brand_carappdata_cars'),
    ]

    operations = [
        migrations.AlterField(
            model_name='applet',
            name='type',
            field=models.IntegerField(default=0, verbose_name='\u7c7b\u578b', choices=[(2, b'\xe5\xb7\xa6\xe5\x8f\xb3\xe8\x84\x91\xe6\xb5\x8b\xe8\xaf\x95'), (0, b'\xe5\x95\x86\xe5\x9f\x8e'), (1, b'\xe5\x85\xac\xe5\x8f\xb8\xe5\xb1\x95\xe7\xa4\xba'), (3, b'\xe8\xbd\xa6\xe8\xbe\x86\xe5\xb1\x95\xe7\xa4\xba\xe4\xbb\xa5\xe5\x8f\x8a\xe9\x94\x80\xe5\x94\xae')]),
        ),
    ]
