# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2017-11-04 11:00
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('libranote', '0005_auto_20171102_1134'),
    ]

    operations = [
        migrations.AddField(
            model_name='test',
            name='subject',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='libranote.Subject'),
            preserve_default=False,
        ),
    ]
