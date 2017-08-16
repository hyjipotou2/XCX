# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userManagement', '0002_applet_appletid'),
    ]

    operations = [
        migrations.AddField(
            model_name='appletuser',
            name='avatarUrl',
            field=models.CharField(max_length=255, blank=True),
        ),
        migrations.AddField(
            model_name='appletuser',
            name='city',
            field=models.CharField(max_length=255, blank=True),
        ),
        migrations.AddField(
            model_name='appletuser',
            name='country',
            field=models.CharField(max_length=255, blank=True),
        ),
        migrations.AddField(
            model_name='appletuser',
            name='gender',
            field=models.CharField(max_length=255, blank=True),
        ),
        migrations.AddField(
            model_name='appletuser',
            name='province',
            field=models.CharField(max_length=255, blank=True),
        ),
    ]
