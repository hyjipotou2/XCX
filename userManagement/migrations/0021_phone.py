# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userManagement', '0020_delete_phone'),
    ]

    operations = [
        migrations.CreateModel(
            name='Phone',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('phone', models.CharField(max_length=18, verbose_name='\u7535\u8bdd\u53f7\u7801')),
                ('name', models.CharField(max_length=255, verbose_name='\u59d3\u540d', blank=True)),
                ('occupation', models.CharField(max_length=255, verbose_name='\u804c\u4e1a', blank=True)),
                ('location', models.CharField(max_length=255, verbose_name='\u5730\u533a', blank=True)),
                ('remarks', models.CharField(max_length=255, verbose_name='\u5907\u6ce8', blank=True)),
                ('nextCallDate', models.DateField(verbose_name='\u4e0b\u6b21\u63d0\u9192\u65f6\u95f4', blank=True)),
                ('modDateTime', models.DateTimeField(auto_now=True, verbose_name='\u6700\u540e\u4fee\u6539\u65e5\u671f')),
                ('createDateTime', models.DateTimeField(auto_now_add=True, verbose_name='\u521b\u5efa\u65e5\u671f')),
            ],
        ),
    ]
