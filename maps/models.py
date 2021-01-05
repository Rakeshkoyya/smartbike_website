from django.db import models

# Create your models here.


class geo_table(models.Model):
    time = models.DateTimeField()
    uniqueID = models.CharField(max_length=10)
    latitudes = models.CharField(max_length=10)
    longitudes = models.CharField(max_length=10)

    def __str__(self):
        return self.uniqueID + " > " + str(self.time)


class fp_table(models.Model):
    fp_ID = models.IntegerField()
    uniqueID = models.CharField(max_length=10)
    fp_name = models.CharField(max_length=20)

    def __str__(self):
        return self.fp_name
