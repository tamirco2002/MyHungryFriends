# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from datetime import datetime


class Dishes(models.Model):
    dishid = models.AutoField(db_column='DishID', primary_key=True)  # Field name made lowercase.
    restaurantid = models.IntegerField(db_column='RestaurantID')  # Field name made lowercase.
    nameofdish = models.CharField(db_column='NameOfDish', max_length=255)  # Field name made lowercase.
    explaindish = models.CharField(db_column='ExplainDish', max_length=2000)  # Field name made lowercase.
    dishaddress = models.CharField(db_column='DishAddress', max_length=255)  # Field name made lowercase.
    price = models.IntegerField(db_column='Price')  # Field name made lowercase.
    ingredients = models.CharField(db_column='Ingredients', max_length=2000)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'dishes'


class Friends(models.Model):
    friendid = models.AutoField(db_column='friendID', primary_key=True)  # Field name made lowercase.
    userid = models.IntegerField()
    friend0_id = models.IntegerField(blank=True, null=True)
    friend1_id = models.IntegerField(blank=True, null=True)
    friend2_id = models.IntegerField(blank=True, null=True)
    friend3_id = models.IntegerField(blank=True, null=True)
    friend4_id = models.IntegerField(blank=True, null=True)
    friend5_id = models.IntegerField(blank=True, null=True)
    friend6_id = models.IntegerField(blank=True, null=True)
    friend7_id = models.IntegerField(blank=True, null=True)
    friend8_id = models.IntegerField(blank=True, null=True)
    friend9_id = models.IntegerField(blank=True, null=True)
    friend10_id = models.IntegerField(blank=True, null=True)
    friend11_id = models.IntegerField(blank=True, null=True)
    friend12_id = models.IntegerField(blank=True, null=True)
    friend13_id = models.IntegerField(blank=True, null=True)
    friend14_id = models.IntegerField(blank=True, null=True)
    friend15_id = models.IntegerField(blank=True, null=True)
    friend16_id = models.IntegerField(blank=True, null=True)
    friend17_id = models.IntegerField(blank=True, null=True)
    friend18_id = models.IntegerField(blank=True, null=True)
    friend19_id = models.IntegerField(blank=True, null=True)
    friend20_id = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'friends'


class Orders(models.Model):
    orderid = models.AutoField(db_column='OrderID', primary_key=True)  # Field name made lowercase.
    userid = models.IntegerField(db_column='UserID')  # Field name made lowercase.
    restaurantid = models.IntegerField(db_column='RestaurantID')  # Field name made lowercase.
    dishid = models.IntegerField(db_column='DishID')  # Field name made lowercase.
    foodrating = models.IntegerField(db_column='foodRating', blank=True, null=True)  # Field name made lowercase.
    servicerating = models.IntegerField(db_column='serviceRating', blank=True, null=True)  # Field name made lowercase.
    deliveryrating = models.IntegerField(db_column='deliveryRating', blank=True, null=True)  # Field name made lowercase.
    messagereco = models.CharField(db_column='messageReco', max_length=2000, blank=True, null=True)  # Field name made lowercase.
    timestamporder = models.DateTimeField(auto_now_add=True,db_column='timestampOrder', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'orders'


class Restaurants(models.Model):
    restaurantid = models.AutoField(db_column='RestaurantID', primary_key=True)  # Field name made lowercase.
    restaurantname = models.CharField(db_column='RestaurantName', max_length=255)  # Field name made lowercase.
    restaurantaddress = models.CharField(db_column='RestaurantAddress', max_length=255)  # Field name made lowercase.
    restaurantabout = models.CharField(db_column='RestaurantAbout', max_length=5000)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'restaurants'


class Users(models.Model):
    userid = models.AutoField(db_column='UserID', primary_key=True)  # Field name made lowercase.
    username = models.CharField(max_length=255)
    fullname = models.CharField(db_column='fullName', max_length=255)  # Field name made lowercase.
    passname = models.CharField(db_column='passName', max_length=255)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'users'
