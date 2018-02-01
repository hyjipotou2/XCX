# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import DjangoUeditor.models


class Migration(migrations.Migration):

    dependencies = [
        ('userManagement', '0022_auto_20171214_0911'),
    ]

    operations = [
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('modDateTime', models.DateTimeField(auto_now=True, verbose_name='\u6700\u540e\u4fee\u6539\u65e5\u671f')),
                ('createDateTime', models.DateTimeField(auto_now_add=True, verbose_name='\u521b\u5efa\u65e5\u671f')),
                ('title', models.CharField(max_length=255, verbose_name='\u6807\u9898')),
                ('content', DjangoUeditor.models.UEditorField(verbose_name='\u5185\u5bb9', blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='ArticleCategory',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=100, verbose_name='\u540d\u79f0')),
                ('url', models.CharField(max_length=100, verbose_name='\u94fe\u63a5\u5730\u5740')),
            ],
        ),
        migrations.AddField(
            model_name='article',
            name='categoryForeign',
            field=models.ForeignKey(to='userManagement.ArticleCategory'),
        ),
    ]
