# Generated by Django 3.0.8 on 2020-11-02 06:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('majorApp', '0005_auto_20201002_0947'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='news',
            name='label1',
        ),
        migrations.RemoveField(
            model_name='news',
            name='label2',
        ),
        migrations.RemoveField(
            model_name='news',
            name='label3',
        ),
    ]
