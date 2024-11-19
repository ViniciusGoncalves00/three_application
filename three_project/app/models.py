from django.db import models


class Geometry(models.Model):
    x : float = 0
    y : float = 0
    z : float = 0