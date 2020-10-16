from django.db import models

class MyItem(models.Model):
  user = models.CharField(max_length=20)
  zipcode = models.CharField(max_length=20)