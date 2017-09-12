# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userManagement', '0009_auto_20170904_1612'),
    ]

    operations = [
        migrations.AlterField(
            model_name='applet',
            name='image',
            field=models.ImageField(default=b'images/topLogo_LThzOqp.jpg', upload_to=b'images', blank=True),
        ),
    ]
