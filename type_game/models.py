from django.db import models

# Create your models here.
class Content(models.Model):
    type_content = models.CharField(max_length=2000)

    def __str__(self): 
        return f"Content {self.id}"