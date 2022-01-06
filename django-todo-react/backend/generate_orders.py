import random
from random import randrange
from datetime import timedelta
from datetime import datetime

#################################################################
# Script which generates random orders to add an initial dataset
# to the Orders Table, for demonstration on local host
#################################################################


# Message Map
message_dict = {'excellent': 'This was an excellent restaurant, I truly recommend coming here!',
                'amazing': 'Amazing place, LOVED IT, the food is excellent and the service is welcoming',
                'awesome': 'My family and I enjoyed this restaurant and would come back',
                'cool': 'Cool place and awesome atmosphere, food was great!',
                'great': 'This restaurant was great, would very likely come back',
                'good': 'The food was really good!',
                'ok': 'The food here was good, but other than that everything else was ok. I would come back, '
                      'but not often',
                'mediocre': 'This place was ok, food was a bit cold though',
                'bad': 'I would not recommend this place to my friends at all',
                'awful': 'Everything about this place was bad, the food did not taste good, and the service was awful'
                }


# Timestamp date intervals
d1 = datetime.strptime('1/1/2018 12:00 PM', '%m/%d/%Y %I:%M %p')
d2 = datetime.strptime('1/1/2022 12:00 AM', '%m/%d/%Y %I:%M %p')


def random_date(start, end):
    """
    Return a random datetime between two datetime objects
    """
    delta = end - start
    int_delta = (delta.days * 24 * 60 * 60) + delta.seconds
    random_second = randrange(int_delta)
    return str(start + timedelta(seconds=random_second))


def generate_orders(n):
    """
    Generate n random orders
    """
    orders = []
    i = 0
    while i < n:
        userid = random.randint(1, 30)  # generate random user which placed the order
        restaurantid = random.randint(1, 6)  # generate random restaurant

        # Note that each dishid is connected to a specific restaurant, so in order to stay
        # consistent need to use its restaurant id
        dishid = random.randint(1, 4) + (4*(restaurantid-1))  # generate specific dishid

        foodrating = random.randint(1, 5)  # generate random food rating between 1 to 5
        servicerating = random.randint(1, 5)  # generate random service rating between 1 to 5
        deliveryrating = random.randint(1, 5)  # generate random delivery rating between 1 to 5

        # Use the total rating to decide which message recommendation to use
        totalrating = (foodrating + servicerating + deliveryrating) / 3

        # "switch - case" for message recommendation
        if totalrating >= 4.5:
            messagereco = message_dict['excellent']
        elif totalrating >= 4.0:
            messagereco = message_dict['amazing']
        elif totalrating >= 3.5:
            messagereco = message_dict['awesome']
        elif totalrating >= 3.1:
            messagereco = message_dict['cool']
        elif totalrating >= 2.8:
            messagereco = message_dict['great']
        elif totalrating >= 2.4:
            messagereco = message_dict['good']
        elif totalrating >= 1.8:
            messagereco = message_dict['ok']
        elif totalrating >= 1.3:
            messagereco = message_dict['mediocre']
        elif totalrating >= 0.8:
            messagereco = message_dict['bad']
        else:
            messagereco = message_dict['awful']

        timestamp = random_date(d1, d2)  # generate random timestamp for order

        order = [userid, restaurantid, dishid, foodrating, servicerating, deliveryrating, messagereco, timestamp]
        orders.append(order)
        i += 1

    orders = sorted(orders, key=lambda x: x[-1], reverse=False)  # synchronize time order
    return orders


# generate 100 random orders -> added to MySQL table for demonstration
sample_orders = generate_orders(100)
cnt = 0
for order in sample_orders:
    print('Order id:', cnt + 1, ' ', order)
    cnt += 1