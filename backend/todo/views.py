from todo.models import TaskSerializer
from django.shortcuts import render

# Create your views here.
from rest_framework.viewsets import ModelViewSet
from .models import *

class TaskViewSet(ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()