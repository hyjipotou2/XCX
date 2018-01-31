# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import DjangoUeditor.models


class Migration(migrations.Migration):

    dependencies = [
        ('userManagement', '0023_article'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='content',
            field=DjangoUeditor.models.UEditorField(verbose_name='\u5185\u5bb9', blank=True),
        ),
    ]
