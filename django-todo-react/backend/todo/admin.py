from django.contrib import admin
from .models7 import Users, Restaurants


# Admin Log page in Django - Rest API
# Only Users and Restaurants in admin log in


class RestAdmin(admin.ModelAdmin):
    list_display = ('restaurantid', 'restaurantname', 'restaurantaddress', 'restaurantabout')


class UserAdmin(admin.ModelAdmin):
    list_display = ('userid', 'username', 'fullname', 'passname')


admin.site.register(Restaurants, RestAdmin)
admin.site.register(Users, UserAdmin)
