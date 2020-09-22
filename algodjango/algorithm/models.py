from django.db import models
from pymongo import MongoClient


class Light(models.Model):
    SIGNAL = models.IntegerField()
    SITE_NAME = models.CharField(max_length=200)
    lat = models.FloatField()
    lon = models.FloatField()
    _id = models.CharField(max_length=200)

    def __str__(self):
        return self.SITE_NAME


class Route(models.Model):
    lat = models.FloatField()
    lon = models.FloatField()
