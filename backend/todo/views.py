from todo.models import TaskSerializer
from django.shortcuts import render

# Create your views here.
from rest_framework.viewsets import ModelViewSet
from .models import *
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.pagination import PageNumberPagination

class MyOwnPagination(PageNumberPagination):
    page_size = 4
    page_size_query_param = 'records'
    max_page_size = 4

class TaskViewSet(ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['complete',"created_date"]
    pagination_class = MyOwnPagination
  
    