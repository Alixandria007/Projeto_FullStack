# Generated by Django 5.1.1 on 2024-09-13 19:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('filmes', '0002_filme_capa'),
    ]

    operations = [
        migrations.AddField(
            model_name='filme',
            name='slug',
            field=models.SlugField(blank=True, max_length=90, null=True, unique=True),
        ),
    ]
