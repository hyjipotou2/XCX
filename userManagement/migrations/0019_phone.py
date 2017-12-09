# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userManagement', '0018_auto_20171115_0931'),
    ]

    operations = [
        migrations.CreateModel(
            name='Phone',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('phone', models.CharField(max_length=18, verbose_name='\u7535\u8bdd\u53f7\u7801')),
                ('modDateTime', models.DateTimeField(auto_now=True, verbose_name='\u6700\u540e\u4fee\u6539\u65e5\u671f')),
                ('createDateTime', models.DateTimeField(auto_now_add=True, verbose_name='\u521b\u5efa\u65e5\u671f')),
            ],
        ),
    ]
