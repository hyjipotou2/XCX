# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userManagement', '0013_auto_20171024_1104'),
    ]

    operations = [
        migrations.CreateModel(
            name='QuestionAppData',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('image1', models.ImageField(upload_to=b'images', max_length=255, verbose_name='\u5e7f\u544a\u56fe\u72471', blank=True)),
                ('image2', models.ImageField(upload_to=b'images', max_length=255, verbose_name='\u5e7f\u544a\u56fe\u72472', blank=True)),
                ('image3', models.ImageField(upload_to=b'images', max_length=255, verbose_name='\u5e7f\u544a\u56fe\u72473', blank=True)),
            ],
        ),
        migrations.AddField(
            model_name='manageuser',
            name='code',
            field=models.CharField(max_length=10, blank=True),
        ),
        migrations.AlterField(
            model_name='applet',
            name='type',
            field=models.IntegerField(default=0, verbose_name='\u7c7b\u578b', choices=[(2, b'\xe5\xb7\xa6\xe5\x8f\xb3\xe8\x84\x91\xe6\xb5\x8b\xe8\xaf\x95'), (0, b'\xe5\x95\x86\xe5\x9f\x8e'), (1, b'\xe5\x85\xac\xe5\x8f\xb8\xe5\xb1\x95\xe7\xa4\xba')]),
        ),
        migrations.AddField(
            model_name='questionappdata',
            name='applet',
            field=models.OneToOneField(to='userManagement.Applet'),
        ),
    ]
