# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userManagement', '0003_auto_20170803_0247'),
    ]

    operations = [
        migrations.AddField(
            model_name='appletuser',
            name='xcxSession',
            field=models.CharField(max_length=255, blank=True),
        ),
    ]
