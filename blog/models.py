from django.db import models
from django.utils import timezone


class Post(models.Model):
    author = models.CharField(max_length=100, default="guest")
    title = models.CharField(max_length=200)
    text = models.TextField()
    created_date = models.DateTimeField(timezone.now)
    photo = models.ImageField(blank=True)

    def __str__(self):
        return self.title