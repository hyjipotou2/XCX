# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userManagement', '0021_phone'),
    ]

    operations = [
        migrations.AlterField(
            model_name='phone',
            name='nextCallDate',
            field=models.DateField(null=True, verbose_name='\u4e0b\u6b21\u63d0\u9192\u65f6\u95f4', blank=True),
        ),
    ]
