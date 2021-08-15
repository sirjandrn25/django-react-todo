from django.db import models
from rest_framework import serializers

# Create your models here.


class Task(models.Model):
    title = models.CharField(max_length=200)
    complete = models.BooleanField(default=False)
    created_date = models.DateField(auto_now_add=True)
    time = models.TimeField()

    def __str__(self):
        return self.time


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = "__all__"
        read_only_fields = ['id','created_date']
