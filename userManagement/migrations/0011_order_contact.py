# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userManagement', '0010_auto_20170912_2333'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='contact',
            field=models.CharField(max_length=255, verbose_name='\u7535\u8bdd', blank=True),
        ),
    ]
