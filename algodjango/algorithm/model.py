from django.db import models


class RouteCoordinates(models.Model):
    point1_longitude = models.FloatField(null=False, max_length=255)
    point1_latitude = models.FloatField(null=False, max_length=255)
    point2_longitude = models.FloatField(null=False, max_length=255)
    point2_latitude = models.FloatField(null=False, max_length=255)

    def __str__(self):
        return f"Point1[lon:{self.point1_longitude}, lat:{self.point1_latitude}] Point2[lon:{self.point2_longitude}, lat:{self.point2_latitude}]"