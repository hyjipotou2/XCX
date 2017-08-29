# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userManagement', '0005_appletuser_nickname'),
    ]

    operations = [
        migrations.AlterField(
            model_name='goods',
            name='isAlive',
            field=models.BooleanField(default=True, verbose_name='\u662f\u5426\u4e0a\u67b6\u9500\u552e'),
        ),
    ]
