# Generated by Django 5.1.1 on 2024-09-09 17:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('filmes', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='filme',
            name='capa',
            field=models.ImageField(blank=True, null=True, upload_to='capas_filmes/'),
        ),
    ]
