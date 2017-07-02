# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userManagement', '0005_auto_20170627_1608'),
    ]

    operations = [
        migrations.RenameField(
            model_name='goods',
            old_name='type',
            new_name='goodsType',
        ),
    ]
