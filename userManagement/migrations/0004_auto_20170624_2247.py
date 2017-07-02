# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userManagement', '0003_auto_20170618_2248'),
    ]

    operations = [
        migrations.RenameField(
            model_name='goods',
            old_name='name',
            new_name='goodsName',
        ),
    ]
