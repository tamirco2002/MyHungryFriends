
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from todo import views

router = routers.DefaultRouter()
#router.register(r'todos', views.TodoView, 'todo')  # Test url

# URL paths and patterns from Views
# Can be viewed using Django - REST API

router.register(r'restaurants', views.RestView, 'restaurant')
router.register(r'restselective', views.RestSelective, 'restselective')
router.register(r'users', views.UserView, 'users')
router.register(r'userselective', views.UserSelective, 'userselective')
router.register(r'usersid', views.UserById, 'usersid')
router.register(r'dishes', views.DishView, 'dishes')
router.register(r'orders', views.OrderView, 'orders')
router.register(r'restaurantordersfriends', views.RestaurantOrderFriendView, 'restaurants_orders_friends')
router.register(r'restaurantorders', views.RestaurantOrderView, 'restaurants_orders_all')
router.register(r'dishordersfriends', views.DishOrderViewFriend, 'dishes_orders_friends')
router.register(r'dishorders', views.DishOrderView, 'dishes_orders')
router.register(r'userorders', views.UserOrderView, 'users_orders')
router.register(r'dishbyid', views.DishIdView, 'dishesid')
router.register(r'friends', views.FriendView, 'friends')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
