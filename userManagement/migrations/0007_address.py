# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userManagement', '0006_auto_20170830_0404'),
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=255, verbose_name='\u59d3\u540d')),
                ('detailAddress', models.CharField(max_length=255, verbose_name='\u5730\u5740', blank=True)),
                ('contact', models.CharField(max_length=255, verbose_name='\u7535\u8bdd', blank=True)),
                ('province', models.CharField(max_length=255, verbose_name='\u7701', blank=True)),
                ('city', models.CharField(max_length=255, verbose_name='\u5e02', blank=True)),
                ('district', models.CharField(max_length=255, verbose_name='\u533a', blank=True)),
                ('countyName', models.CharField(max_length=255, verbose_name='\u56fd', blank=True)),
                ('xcxUserForeign', models.ForeignKey(to='userManagement.AppletUser')),
            ],
        ),
    ]
