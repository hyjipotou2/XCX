# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userManagement', '0002_auto_20170618_2104'),
    ]

    operations = [
        migrations.RenameField(
            model_name='goods',
            old_name='Postage',
            new_name='postage',
        ),
        migrations.RenameField(
            model_name='goods',
            old_name='SalesVolume',
            new_name='salesVolume',
        ),
    ]
