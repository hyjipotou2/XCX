# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userManagement', '0007_address'),
    ]

    operations = [
        migrations.RenameField(
            model_name='address',
            old_name='xcxUserForeign',
            new_name='appletUserForeign',
        ),
    ]
