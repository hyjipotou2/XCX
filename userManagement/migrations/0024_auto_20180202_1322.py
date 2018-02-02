# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userManagement', '0023_auto_20180131_2208'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='phone',
            name='location',
        ),
        migrations.RemoveField(
            model_name='phone',
            name='nextCallDate',
        ),
        migrations.RemoveField(
            model_name='phone',
            name='occupation',
        ),
        migrations.RemoveField(
            model_name='phone',
            name='remarks',
        ),
    ]
