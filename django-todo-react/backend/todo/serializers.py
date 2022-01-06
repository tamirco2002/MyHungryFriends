from rest_framework import serializers
from .models7 import Users, Restaurants, Dishes, Orders, Friends

# Serializers for format output from Django <-> React


class RestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurants
        fields = ('restaurantid', 'restaurantname', 'restaurantaddress', 'restaurantabout')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('userid', 'username', 'fullname', 'passname')


class DishSerializer(serializers.ModelSerializer):
    class Meta:
        model = Dishes
        fields = ('dishid', 'restaurantid', 'nameofdish', 'explaindish','dishaddress', 'price', 'ingredients')


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orders
        fields = (
            'orderid', 'userid', 'restaurantid', 'dishid', 'foodrating', 'servicerating', 'deliveryrating',
            'messagereco', 'timestamporder')


class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friends
        fields = '__all__'
