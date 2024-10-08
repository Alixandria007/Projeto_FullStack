# Generated by Django 5.1.1 on 2024-09-09 17:00

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('cliente', '0001_initial'),
        ('filmes', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Aluguel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('data_aluguel', models.DateField()),
                ('vencimento', models.DateField()),
                ('status', models.CharField(choices=[('V', 'Vencido'), ('P', 'Pendente'), ('D', 'Devolvido')], max_length=1)),
                ('cliente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='cliente.cliente')),
            ],
            options={
                'verbose_name': 'Aluguel',
                'verbose_name_plural': 'Aluguéis',
            },
        ),
        migrations.CreateModel(
            name='ItemAluguel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('aluguel', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='aluguel.aluguel')),
                ('filme', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='filmes.filme')),
            ],
            options={
                'verbose_name': 'Aluguel',
                'verbose_name_plural': 'Aluguéis',
            },
        ),
    ]
