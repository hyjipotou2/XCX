# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userManagement', '0004_auto_20170624_2247'),
    ]

    operations = [
        migrations.AlterField(
            model_name='goodsimage',
            name='goodsImageForeignKey',
            field=models.ForeignKey(blank=True, to='userManagement.Goods', null=True),
        ),
    ]
