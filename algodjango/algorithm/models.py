from django.db import models
from pymongo import MongoClient


class Light(models.Model):
    _id = models.CharField(max_length=200)
    SITE_NO = models.IntegerField()
    SITE_NAME = models.CharField(max_length=200)
    lat = models.FloatField()
    lon = models.FloatField()
    SIGNAL = models.IntegerField()

class Route(models.Model):
    lat = models.FloatField()
    lon = models.FloatField()