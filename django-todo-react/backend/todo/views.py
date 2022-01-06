import json
from django.db.models.query import QuerySet
from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import RestSerializer, UserSerializer, DishSerializer, OrderSerializer, FriendSerializer
from .models7 import Users, Restaurants, Dishes, Orders, Friends


# Views for Queries from DB to API


class RestView(viewsets.ModelViewSet):
    # Viewset that connects all Restaurant data
    serializer_class = RestSerializer
    queryset = Restaurants.objects.all()


class RestSelective(viewsets.ModelViewSet):
    # Viewset that connects Restaurant selective data
    serializer_class = RestSerializer

    def get_queryset(self):
        queryset = Restaurants.objects.all()
        id = self.request.query_params.get('restaurantid')
        if id is not None:
            queryset = queryset.filter(restaurantid=id)
        return queryset


class DishView(viewsets.ModelViewSet):
    # Viewset that connects all dishes for specific restaurant
    serializer_class = DishSerializer

    def get_queryset(self):
        queryset = Dishes.objects.all()
        id = self.request.query_params.get('restaurantid')
        if id is not None:
            queryset = queryset.filter(restaurantid=id)
        return queryset


class DishIdView(viewsets.ModelViewSet):
    # Viewset that queries only dishes by dish id
    serializer_class = DishSerializer

    def get_queryset(self):
        queryset = Dishes.objects.all()
        id = self.request.query_params.get('dishid')
        if id is not None:
            queryset = queryset.filter(dishid=id)
        return queryset


class UserView(viewsets.ModelViewSet):
    # Viewset that connects all User data
    serializer_class = UserSerializer
    queryset = Users.objects.all()


class UserSelective(viewsets.ModelViewSet):
    # Viewset that connects User selective data
    serializer_class = UserSerializer

    def get_queryset(self):
        queryset = Users.objects.all()
        name = self.request.query_params.get('username')
        if name is not None:
            queryset = queryset.filter(username=name)
        return queryset


class UserById(viewsets.ModelViewSet):
    # Viewset that queries only users by user id
    serializer_class = UserSerializer

    def get_queryset(self):
        queryset = Users.objects.all()
        id = self.request.query_params.get('userid')
        if id is not None:
            queryset = queryset.filter(userid=id)
        return queryset


class OrderView(viewsets.ModelViewSet):
    # Viewset that connects all Orders data
    serializer_class = OrderSerializer
    queryset = Orders.objects.all()


class RestaurantOrderFriendView(viewsets.ModelViewSet):
    # Viewset that connects orders data by restaurant id and user id
    serializer_class = OrderSerializer

    def get_queryset(self):
        queryset = Orders.objects.all()
        restaurant_id = self.request.query_params.get('restaurantid')
        if restaurant_id is not None:
            user_id = self.request.query_params.get('userid')
            if user_id is not None:
                queryset = queryset.filter(restaurantid=restaurant_id, userid=user_id)
        return queryset


class RestaurantOrderView(viewsets.ModelViewSet):
    # Viewset that connects orders data by restaurant id
    serializer_class = OrderSerializer

    def get_queryset(self):
        queryset = Orders.objects.all()
        restaurant_id = self.request.query_params.get('restaurantid')
        if restaurant_id is not None:
            queryset = queryset.filter(restaurantid=restaurant_id)
        return queryset


class DishOrderViewFriend(viewsets.ModelViewSet):
    # Viewset that connects orders data by dish id and user id
    serializer_class = OrderSerializer

    def get_queryset(self):
        queryset = Orders.objects.all()
        user_id = self.request.query_params.get('userid')
        if user_id is not None:
            dish_id = self.request.query_params.get('dishid')
            if dish_id is not None:
                queryset = queryset.filter(userid=user_id, dishid=dish_id)
        return queryset


class DishOrderView(viewsets.ModelViewSet):
    # Viewset that connects orders data by dish id
    serializer_class = OrderSerializer

    def get_queryset(self):
        queryset = Orders.objects.all()
        dish_id = self.request.query_params.get('dishid')
        if dish_id is not None:
            queryset = queryset.filter(dishid=dish_id)
        return queryset


class UserOrderView(viewsets.ModelViewSet):
    # Viewset that connects orders data by user id
    serializer_class = OrderSerializer
    def get_queryset(self):
        queryset = Orders.objects.all()
        user_id = self.request.query_params.get('userid')
        if user_id is not None:
            queryset = queryset.filter(userid=user_id)
        return queryset


class FriendView(viewsets.ModelViewSet):
    # Viewset that connects all Friends data for a specific user
    serializer_class = FriendSerializer

    def get_queryset(self):
        queryset = Friends.objects.all()
        id = self.request.query_params.get('userid')
        if id is not None:
            queryset = queryset.filter(userid=id)
        return queryset

