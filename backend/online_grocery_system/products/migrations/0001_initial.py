# Generated by Django 3.0.5 on 2020-09-17 09:53

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
                ('description', models.TextField()),
                ('category', models.CharField(max_length=20)),
                ('price', models.FloatField()),
                ('image', models.ImageField(upload_to='images')),
            ],
        ),
    ]