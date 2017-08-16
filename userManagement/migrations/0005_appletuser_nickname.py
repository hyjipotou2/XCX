# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userManagement', '0004_appletuser_xcxsession'),
    ]

    operations = [
        migrations.AddField(
            model_name='appletuser',
            name='nickname',
            field=models.CharField(max_length=255, blank=True),
        ),
    ]
