# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userManagement', '0012_auto_20171024_1030'),
    ]

    operations = [
        migrations.AlterField(
            model_name='showappdata',
            name='applet',
            field=models.OneToOneField(to='userManagement.Applet'),
        ),
    ]
