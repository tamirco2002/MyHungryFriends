/* SQL Script to create the myHungryFriends DataBase, implemented as a standalone SQL to recreate the dataset and database */
/* Use MySQL workbench to run this script and connect it to the Django backend */
/* Initial Order Data was added to the script for demonstaration*/
/* Friends data was added as a table to simulate the social network and graph db, which was created using a python simulation */
/* This script should be executed before running the React App and Django Server*/

/* Create Database */
drop database sadnaDB; /* use only if db is already created */
create database sadnaDB;

USE sadnaDB;


/* Create Tables */

create table Users (
	UserID int    NOT NULL auto_increment,
    username varchar(255)     NOT NULL,    
    fullName varchar(255)     NOT NULL,    
    passName varchar(255)     NOT NULL, /* Each password as defined as <FIRST_NAME>1000 */  
    PRIMARY KEY (UserID)
    );
    
    
create table Restaurants (
	RestaurantID int    NOT NULL auto_increment,
    RestaurantName varchar(255)   NOT NULL,
    RestaurantAddress varchar(255)  NOT NULL, /* Address is used as a resource to link images to restaurant */
    RestaurantAbout varchar(5000)  NOT NULL,  /* About the Restaurant */
    PRIMARY KEY (RestaurantID)
    );
    

create table Dishes (
	DishID int NOT NULL auto_increment,
    RestaurantID int  NOT NULL,
    NameOfDish varchar(255)  NOT NULL,
	ExplainDish varchar(2000)  NOT NULL,
    DishAddress varchar(255)  NOT NULL,  /* Address is used as a resource to link images to restaurant */
    Price int NOT NULL,
    Ingredients varchar(2000) NOT NULL,
    PRIMARY KEY (DishID)
    );


create table Orders (
	OrderID int     NOT NULL auto_increment,
    UserID int      NOT NULL,
    RestaurantID int   NOT NULL,
    DishID int  NOT NULL,
    foodRating int      DEFAULT 0,
    serviceRating int   DEFAULT 0,
    deliveryRating int  DEFAULT 0,
    messageReco varchar (2000) NULL, /* User written review for order */
    timestampOrder TIMESTAMP,
    PRIMARY KEY (OrderID)
    );


/* Friend's table was created to simulate the social network graph of friends which was initialized as a random network using the Erdos Renyi method*/
create table Friends (
	friendID int  NOT NULL auto_increment,
	userid int NOT NULL,
	friend0_id int,
    friend1_id int,
    friend2_id int,
    friend3_id int,
    friend4_id int,
    friend5_id int,
    friend6_id int,
    friend7_id int,
    friend8_id int,
    friend9_id int,
    friend10_id int,
    friend11_id int,
    friend12_id int,
    friend13_id int,
    friend14_id int,
    friend15_id int,
    friend16_id int,
    friend17_id int,
    friend18_id int,
    friend19_id int,
    friend20_id int,
    bestfriend0_id int,
    bestfriend1_id int,
    bestfriend2_id int,
    bestfriend3_id int,
    PRIMARY KEY (friendID)
    );
    


/* Insert data to tables */
INSERT INTO Users (username, fullName, passName)
VALUES
	('yuvalbloom', 'Yuval Bloom', 'yuval1000'),
    ('tamircohen', 'Tamir Cohen', 'tamir1000'),
    ('inbarhavilio', 'Inbar Havilio', 'inbar1000'),
    ('bettykaplun', 'Betty Kaplun', 'betty1000'),
    ('eliranohel', 'Eliran Ohel', 'eliran1000'),
    ('slavanovgorodov', 'Slava Novgorodov', 'slava1000'),
    ('alanturing', 'Alan Turing', 'alan1000'),
    ('alberteinstein', 'Albert Einstein', 'albert1000'),
    ('billgates', 'Bill Gates', 'bill1000'),
    ('markzuckerberg', 'Mark Zuckerberg', 'mark1000'),
    ('lionelmessi', 'Lionel Messi', 'lionel1000'),
    ('cristianoronaldo', 'Cristiano Ronaldo', 'cristiano1000'),
    ('serenawilliams', 'Serena Williams', 'serena1000'),
    ('rondarousey', 'Ronda Rousey', 'ronda1000'),
	('margotrobbie', 'Margot Robbie', 'margot1000'),
	('johnnydepp', 'Johnny Depp', 'johnny1000'),
    ('samuelljackson', 'Samuel L Jackson', 'samuel1000'),
    ('halleberry', 'Halle Berry', 'halle1000'),
    ('naftalybennet', 'Naftaly Bennet', 'naftaly1000'),
    ('angelamerkel', 'Angela Merkel', 'angela1000'),
    ('mohamedsalah', 'Mohamed Salah', 'mohamed1000'),
    ('galgadot', 'Gal Gadot', 'gal1000'),
    ('dwaynejohnson', 'Dwayne The Rock Johnson', 'dwayne1000'),
    ('jasminmoallem', 'Jasmin Moallem', 'jasmin1000'),
    ('ravidplotinik', 'Ravid Nechi Nech Plotnik', 'ravid1000'),
	('harrypotter', 'Harry Potter', 'harry1000'),
    ('darthvader', 'Darth Vader', 'darth1000'),
    ('peterparker', 'Spiderman', 'peter1000'),
	('danerystargaryen', 'Danerys Targaryen', 'danerys1000'),
    ('gandalf', 'Gandalf the White', 'gandalf1000');

    
INSERT INTO Restaurants (RestaurantName, RestaurantAddress, RestaurantAbout)
VALUES
	('MUG-Nificent', 'mugnificent', 'Coffee house located in Tel Aviv, self produced coffee blends that are grounded in place'),
    ('Pasta la Vista, baby', 'pastalavista', 'The famous Italian restaurant from Rome opened its first branch outside Italy in Jerusalem. Order and enjoy from our self produced original Italian ingredients.'),
    ('PHO-Nomenal', 'phonomenal', 'Asian restaurant with an Israeli touch. Yes, its that GOOD.'),
    ('Nice to Meat', 'nicetomeat', 'Meat restaurant for real meat lovers. Established in 1910 and family owned until to this day. We make sure to take good care of our animals, cause everyone knows that a happy cow is a tastier cow. Kosher'),
    ('Lettuce Celebrate!', 'lettucecelebrate', 'Vegeterian restaurant from Florentin. We promise to give you the freshest ingredients that we can on the market, as we bring in fresh goods every day. We do our best to keep the environment safe so we deliver our dishes in recycled boxes.'),
    ('so-FISH-ticated', 'sofishticated', 'Fish restaurant from Herzliya. Our fishermen bring in daily fresh fishes right from the sea to your mouth.');
    
    
INSERT INTO Dishes (RestaurantID, NameOfDish, ExplainDish, DishAddress, Price, Ingredients)
VALUES
	(1, 'Expresso Yourself', 'Our smooth signature Espresso Roast with rich flavor and caramelly sweetness is at the very heart of everything we do.', 'mugnificentdish1', 25, 'Brewed Espresso, Oat milk'),
	(1, 'Brewtiful Day', 'Handcrafted in small batches daily, slow-steeped in cool water for 20 hours, without touching heat—MUG-Nificent Cold Brew', 'mugnificentdish2', 32, 'Brews coffee blend, ice, milk, caramel touch'),
	(1, 'Sorry I am Latte', 'Our dark, rich espresso balanced with steamed milk and a light layer of foam. A perfect warm-up.', 'mugnificentdish3', 19, 'Brewed Espresso, Milk, Cream'),
	(1, 'You are Grounded', 'The first MUG-Nificent blend, born in 1956 and handed down from father to son for over 60 years. A true connoisseurs coffee.', 'mugnificentdish4', 26, '100% Arabica beans, Milk, Love'),
    
    (2, 'Spaghet About It', 'Mushroom Spaghetti', 'pastalavistadish1', 52, 'white wine, champignon, Portobello, porcini truffel puree, basil, a touch of cream & parmesan'),
	(2, 'Feeling Saucy', 'Macaroni with Spicy Cherry Tomatoes', 'pastalavistadish2', 61, 'Garlic, Chili, Basil, Oregano, Parmesan'),
    (2, 'A Pizza my Heart', 'Classic Margherita', 'pastalavistadish3', 55, 'Mozzarella and Tomato sauce'),
    (2, 'Copypasta', 'Cheese Tortellini', 'pastalavistadish4', 58, 'Butter, Sage, Black Pepper, Parmesan'),
    
    (3, 'Love Pho Real', 'Pho Soup', 'phonomenaldish1', 70, 'Thinly sliced beef, fresh herbs, onion, chili, sprouts and rice noodles in a deep flavored beef stock. Served with herbs, sprouts, chilli and lemon'),
    (3, 'Bun in a Million', 'Chicken Banh', 'phonomenaldish2', 64, 'Cold chicken curry salad, celery, herbs, yellow curry aioli and iceberg lettuce. Served in tender steamed banh'),
    (3, 'Make Miso Happy', 'Miso Soup', 'phonomenaldish3', 59, 'Soybean purée and Japanese fish bouillon, with diced tofu, scallions and wakame seaweed'),
    (3, 'Louis Wonton', 'Wonton Soup', 'phonomenaldish4', 76, 'Savory broth, house-made pork wontons, shrimp, chicken'),
    
    (4, 'No Mis-Steak', 'Beef Fillet', 'nicetomeatdish1', 84, 'Fillet, Demi Glace ,Green beans'),
    (4, 'Hammmmmburger', 'Hamburger', 'nicetomeatdish2', 79, 'Fresh local beef. Urugula, Tomato, Onion, Fries'),
    (4, 'Chicken Magnet', 'Chicken in spices', 'nicetomeatdish3', 80, 'Chicken, Cream of grilled tomatoes, broccoli ,grilled onions'),
    (4, 'Do not give a Schnitzel', 'Chicken Schnitzel', 'nicetomeatdish4', 75, 'Fried Chicken Schnitzel, Mashed potatoes, coleslaw'),
    
    (5, 'Un-beet-able', 'Beet Bites', 'lettucecelebratedish1', 35, 'A tower layered with roasted beets, pickled onion, avocado and lima bean cream, served with our homemade buckwheat cracker'),
	(5, 'Pear-fect', 'Wine poached pears', 'lettucecelebratedish2', 38, 'Wine poached pears, baked in an almond cream on top of shortcrust pastry with mixed berry cream'),
    (5, 'Just CHILLIn', 'Chillie Potatoes', 'lettucecelebratedish3', 40, 'Baby potatoes tossed with cumin, ginger and green chillies'),
    (5, 'Dont Carrot all', 'Noodles', 'lettucecelebratedish4', 39, 'Black rice noodles with coconut curry, pan steared tofu, cilantro, green papaya amd carrot'),
    
    (6, 'Oh my Cod', 'Fish and Chips', 'sofishticateddish1', 61, 'Fried Cod Fish and potatoes'),
    (6, 'Fish Upon a Star', 'Red Tuna Steak', 'sofishticateddish2',  66, 'Tuna, Black Pepper, Sauce'),
    (6, 'Dont be ShellFish', 'Gillardeau Oyster', 'sofishticateddish3', 62, 'Cream sauce, Mushrooms'),
    (6, 'Can You Fillet?', 'Salmon Fillet', 'sofishticateddish4', 70, 'Mashed Potatoes, Timin, Olive Oil');
   
   
/* Insert into orders table */
/* This simulates the an initial order placement for users and friends, to have data for the demonstration */
/* Work with initial data on localhost */
INSERT INTO Orders (UserID, RestaurantID, DishID, foodRating, serviceRating, deliveryRating, messageReco, timestampOrder)
VALUES
    (6, 2, 5, 4, 4, 1, 'This restaurant was great, would very likely come back', '2018-01-14 09:19:49'),
    (26, 3, 12, 4, 1, 3, 'The food was really good!', '2018-01-16 21:30:09'),
    (20, 2, 8, 2, 4, 4, 'Cool place and awesome atmosphere, food was great!', '2018-02-28 22:57:47'),
    (18, 2, 6, 1, 3, 3, 'The food here was good, but other than that everything else was ok. I would come back, but not often', '2018-03-09 13:54:56'),
    (9, 1, 1, 3, 5, 2, 'Cool place and awesome atmosphere, food was great!', '2018-03-23 09:11:16'),
    (6, 6, 22, 3, 1, 2, 'The food here was good, but other than that everything else was ok. I would come back, but not often', '2018-03-27 05:43:27'),
    (6, 1, 2, 5, 3, 3, 'My family and I enjoyed this restaurant and would come back', '2018-03-29 16:56:09'),
    (20, 2, 8, 1, 4, 4, 'This restaurant was great, would very likely come back', '2018-04-09 21:44:25'),
    (26, 6, 24, 2, 2, 3, 'The food here was good, but other than that everything else was ok. I would come back, but not often', '2018-04-13 04:44:54'),
    (27, 6, 22, 1, 4, 4, 'This restaurant was great, would very likely come back', '2018-04-23 02:45:25'),
    (20, 1, 2, 2, 1, 1, 'This place was ok, food was a bit cold though', '2018-05-17 22:21:42'),
    (25, 5, 18, 4, 1, 5, 'Cool place and awesome atmosphere, food was great!', '2018-05-31 19:26:53'),
    (27, 4, 14, 4, 3, 5, 'Amazing place, LOVED IT, the food is excellent and the service is welcoming', '2018-06-08 00:20:40'),
    (13, 1, 1, 4, 2, 1, 'The food here was good, but other than that everything else was ok. I would come back, but not often', '2018-07-11 18:23:07'),
    (2, 6, 24, 3, 4, 1, 'The food was really good!', '2018-07-23 21:59:32'),
    (22, 2, 6, 1, 1, 5, 'The food here was good, but other than that everything else was ok. I would come back, but not often', '2018-07-26 10:49:50'),
    (3, 5, 18, 5, 2, 3, 'Cool place and awesome atmosphere, food was great!', '2018-08-11 18:52:50'),
    (17, 4, 16, 1, 4, 5, 'Cool place and awesome atmosphere, food was great!', '2018-09-01 15:27:04'),
    (19, 2, 6, 5, 4, 2, 'My family and I enjoyed this restaurant and would come back', '2018-09-18 15:52:15'),
    (23, 1, 4, 1, 3, 3, 'The food here was good, but other than that everything else was ok. I would come back, but not often', '2018-09-29 16:56:49'),
    (9, 4, 16, 3, 3, 4, 'Cool place and awesome atmosphere, food was great!', '2018-10-10 03:57:26'),
    (29, 2, 8, 4, 3, 2, 'This restaurant was great, would very likely come back', '2018-10-25 03:15:34'),
    (11, 2, 5, 5, 4, 5, 'This was an excellent restaurant, I truly recommend coming here!', '2018-11-18 09:10:59'),
    (12, 2, 6, 1, 5, 1, 'The food here was good, but other than that everything else was ok. I would come back, but not often', '2018-11-19 21:52:13'),
	(22, 1, 4, 5, 3, 3, 'My family and I enjoyed this restaurant and would come back', '2018-11-21 19:13:52'),
	(12, 2, 7, 5, 1, 4, 'Cool place and awesome atmosphere, food was great!', '2018-12-27 14:16:54'),
    (27, 3, 10, 3, 1, 5, 'This restaurant was great, would very likely come back', '2019-02-07 11:28:38'),
    (29, 3, 11, 4, 5, 3, 'Amazing place, LOVED IT, the food is excellent and the service is welcoming', '2019-02-11 05:47:55'),
    (11, 6, 24, 4, 4, 5, 'Amazing place, LOVED IT, the food is excellent and the service is welcoming', '2019-02-24 07:37:58'),
    (28, 3, 9, 1, 2, 1, 'This place was ok, food was a bit cold though', '2019-02-25 15:42:57'),
	(26, 6, 24, 4, 5, 4, 'Amazing place, LOVED IT, the food is excellent and the service is welcoming', '2019-03-06 04:05:36'),
	(25, 1, 2, 2, 3, 5, 'Cool place and awesome atmosphere, food was great!', '2019-03-08 06:29:22'),
    (8, 4, 14, 3, 5, 1, 'This restaurant was great, would very likely come back', '2019-03-12 00:20:12'),
    (27, 3, 12, 4, 2, 2, 'The food was really good!', '2019-04-08 14:28:21'),
    (14, 2, 7, 4, 5, 1, 'Cool place and awesome atmosphere, food was great!', '2019-04-23 08:55:40'),
	(23, 5, 17, 5, 4, 1, 'Cool place and awesome atmosphere, food was great!', '2019-04-23 12:57:27'),
    (7, 1, 4, 5, 4, 5, 'This was an excellent restaurant, I truly recommend coming here!', '2019-05-06 17:06:57'),
	(29, 3, 9, 5, 5, 3, 'Amazing place, LOVED IT, the food is excellent and the service is welcoming', '2019-05-16 00:31:40'),
    (4, 1, 4, 1, 1, 4, 'The food here was good, but other than that everything else was ok. I would come back, but not often', '2019-05-18 01:14:33'),
    (7, 4, 15, 3, 5, 2, 'Cool place and awesome atmosphere, food was great!', '2019-05-18 08:19:38'),
    (8, 3, 9, 5, 3, 2, 'Cool place and awesome atmosphere, food was great!', '2019-05-24 21:34:25'),
    (18, 2, 5, 5, 5, 5, 'This was an excellent restaurant, I truly recommend coming here!', '2019-06-17 07:53:08'),
    (19, 5, 20, 5, 4, 1, 'Cool place and awesome atmosphere, food was great!', '2019-06-22 13:59:19'),
    (4, 5, 20, 3, 3, 4, 'Cool place and awesome atmosphere, food was great!', '2019-07-04 14:47:20'),
    (17, 4, 14, 4, 3, 4, 'My family and I enjoyed this restaurant and would come back', '2019-07-11 09:50:17'),
    (15, 5, 17, 3, 5, 4, 'Amazing place, LOVED IT, the food is excellent and the service is welcoming', '2019-07-24 23:50:43'),
    (5, 6, 21, 5, 2, 1, 'The food was really good!', '2019-07-26 19:51:12'),
    (1, 5, 17, 1, 4, 4, 'This restaurant was great, would very likely come back', '2019-08-30 15:03:34'),
    (3, 1, 3, 2, 5, 4, 'My family and I enjoyed this restaurant and would come back', '2019-09-19 18:35:59'),
    (8, 6, 22, 3, 4, 5, 'Amazing place, LOVED IT, the food is excellent and the service is welcoming', '2019-09-29 17:18:48'),
	(21, 6, 23, 1, 3, 2, 'The food here was good, but other than that everything else was ok. I would come back, but not often', '2019-10-03 15:43:49'),
    (30, 4, 15, 1, 1, 1, 'I would not recommend this place to my friends at all', '2019-10-05 14:32:20'),
	(7, 1, 1, 1, 5, 1, 'The food here was good, but other than that everything else was ok. I would come back, but not often', '2019-10-07 21:57:14'),
    (7, 1, 4, 2, 3, 4, 'This restaurant was great, would very likely come back', '2019-10-19 00:54:10'),
    (16, 3, 9, 4, 5, 1, 'Cool place and awesome atmosphere, food was great!', '2019-12-20 21:57:02'),
    (22, 6, 21, 2, 2, 4, 'The food was really good!', '2019-12-21 01:06:11'),
	(18, 1, 4, 5, 3, 2, 'Cool place and awesome atmosphere, food was great!', '2019-12-26 19:24:02'),
    (17, 4, 13, 4, 3, 1, 'The food was really good!', '2020-01-12 20:36:11'),
    (4, 2, 7, 3, 2, 4, 'This restaurant was great, would very likely come back', '2020-01-24 12:28:16'),
    (9, 4, 16, 1, 2, 1, 'This place was ok, food was a bit cold though', '2020-01-29 15:14:48'),
    (17, 6, 21, 2, 2, 2, 'The food here was good, but other than that everything else was ok. I would come back, but not often', '2020-02-16 05:48:27'),
    (4, 1, 1, 1, 4, 4, 'This restaurant was great, would very likely come back', '2020-03-14 00:57:37'),
    (18, 5, 20, 5, 4, 4, 'Amazing place, LOVED IT, the food is excellent and the service is welcoming', '2020-04-14 08:40:26'),
    (5, 1, 1, 4, 2, 3, 'This restaurant was great, would very likely come back', '2020-04-25 11:06:07'),
    (17, 3, 11, 2, 1, 2, 'This place was ok, food was a bit cold though', '2020-04-27 02:50:29'),
	(26, 1, 4, 1, 3, 4, 'The food was really good!', '2020-06-19 06:14:19'),
    (23, 3, 12, 1, 5, 3, 'This restaurant was great, would very likely come back', '2020-08-15 06:52:57'),
    (9, 6, 21, 1, 1, 4, 'The food here was good, but other than that everything else was ok. I would come back, but not often', '2020-08-19 01:23:17'),
    (2, 1, 4, 1, 1, 5, 'The food here was good, but other than that everything else was ok. I would come back, but not often', '2020-08-30 16:40:54'),
    (15, 4, 14, 3, 3, 5, 'My family and I enjoyed this restaurant and would come back', '2020-09-03 11:33:02'),
    (6, 1, 2, 4, 1, 5, 'Cool place and awesome atmosphere, food was great!', '2020-09-25 03:12:34'),
    (9, 3, 12, 4, 4, 2, 'Cool place and awesome atmosphere, food was great!', '2020-10-10 03:26:51'),
    (7, 1, 4, 1, 2, 4, 'The food here was good, but other than that everything else was ok. I would come back, but not often', '2020-10-18 21:18:53'),
    (28, 3, 10, 1, 5, 5, 'My family and I enjoyed this restaurant and would come back', '2020-11-04 08:41:54'),
    (30, 2, 8, 2, 4, 2, 'The food was really good!', '2020-11-20 16:28:14'),
    (6, 2, 5, 4, 4, 2, 'Cool place and awesome atmosphere, food was great!', '2020-12-02 09:26:15'),
	(19, 2, 8, 1, 2, 5, 'The food was really good!', '2020-12-08 22:34:02'),
    (9, 2, 7, 2, 3, 2, 'The food here was good, but other than that everything else was ok. I would come back, but not often', '2021-01-08 20:15:31'),
    (12, 6, 24, 1, 4, 5, 'Cool place and awesome atmosphere, food was great!', '2021-01-21 14:26:21'),
    (14, 4, 15, 2, 4, 5, 'My family and I enjoyed this restaurant and would come back', '2021-01-27 14:51:09'),
    (7, 3, 12, 5, 3, 3, 'My family and I enjoyed this restaurant and would come back', '2021-02-26 17:36:50'),
    (1, 5, 17, 3, 4, 5, 'Amazing place, LOVED IT, the food is excellent and the service is welcoming', '2021-03-14 05:54:34'),
    (24, 3, 9, 4, 5, 1, 'Cool place and awesome atmosphere, food was great!', '2021-03-27 02:29:12'),
    (15, 3, 9, 5, 4, 1, 'Cool place and awesome atmosphere, food was great!', '2021-04-05 20:15:37'),
    (27, 5, 20, 2, 2, 2, 'The food here was good, but other than that everything else was ok. I would come back, but not often', '2021-04-29 04:52:29'),
    (14, 1, 1, 4, 2, 5, 'My family and I enjoyed this restaurant and would come back', '2021-05-08 10:40:24'),
    (27, 3, 11, 1, 1, 1, 'I would not recommend this place to my friends at all', '2021-06-07 00:38:22'),
    (29, 1, 3, 1, 1, 4, 'The food here was good, but other than that everything else was ok. I would come back, but not often', '2021-06-07 20:01:20'),
    (17, 1, 4, 5, 4, 4, 'Amazing place, LOVED IT, the food is excellent and the service is welcoming', '2021-06-13 20:29:32'),
    (9, 5, 17, 4, 5, 4, 'Amazing place, LOVED IT, the food is excellent and the service is welcoming', '2021-07-10 05:55:03'),
    (29, 1, 3, 3, 4, 3, 'Cool place and awesome atmosphere, food was great!', '2021-07-15 22:31:35'),
    (18, 5, 19, 2, 4, 3, 'This restaurant was great, would very likely come back', '2021-07-16 18:08:57'),
    (20, 2, 7, 4, 5, 4, 'Amazing place, LOVED IT, the food is excellent and the service is welcoming', '2021-07-23 01:03:05'),
    (10, 3, 10, 3, 5, 1, 'This restaurant was great, would very likely come back', '2021-07-24 09:39:11'),
    (21, 1, 2, 2, 4, 3, 'This restaurant was great, would very likely come back', '2021-07-26 00:05:46'),
    (7, 3, 9, 5, 3, 3, 'My family and I enjoyed this restaurant and would come back', '2021-09-29 20:58:04'),
    (21, 2, 7, 1, 1, 1, 'I would not recommend this place to my friends at all', '2021-10-04 01:43:59'),
    (27, 3, 11, 5, 4, 4, 'Amazing place, LOVED IT, the food is excellent and the service is welcoming', '2021-12-14 12:29:17'),
    (29, 4, 13, 4, 1, 1, 'The food here was good, but other than that everything else was ok. I would come back, but not often', '2021-12-16 19:29:13'),
    (22, 2, 8, 2, 2, 5, 'This restaurant was great, would very likely come back', '2021-12-22 23:08:24');
    
    
/* Insert into friends table after social network creation */
/* This simulates the friends network db, used as sql table to initiate the simulation on local host*/
INSERT INTO Friends (userid, friend0_id, friend1_id, friend2_id, friend3_id, friend4_id, friend5_id, friend6_id, friend7_id, friend8_id, friend9_id, 
friend10_id, friend11_id, friend12_id, friend13_id, friend14_id, friend15_id, friend16_id, friend17_id, friend18_id, friend19_id, friend20_id, bestfriend0_id, bestfriend1_id, bestfriend2_id, bestfriend3_id)
VALUES
	(1, 13, 16, 29, 2, 5, 28, 21, 12, 18, 24, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
    (2, 11, 3, 24, 26, 7, 30, 6, 25, 15, 5, 22, 1, 21, 23, 29, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
    (3, 16, 13, 12, 10, 24, 21, 14, 11, 2, 27, 15, 18, 6, 7, 19, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
    (4, 24, 5, 7, 20, 11, 21, 25, 12, 10, 9, 14, 29, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
    (5, 22, 28, 29, 9, 10, 1, 24, 16, 4, 2, 27, 23, 25, 19, 30, 18, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
    (6, 28, 15, 2, 3, 7, 24, 8, 21, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
    (7, 25, 20, 24, 2, 3, 28, 15, 29, 30, 6, 17, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
    (8, 26, 27, 23, 30, 20, 6, 22, 28, 14, 18, 19, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
    (9, 18, 4, 24, 27, 23, 5, 30, 15, 20, 14, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
    (10, 12, 3, 5, 27, 30, 28, 14, 19, 21, 15, 4, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
    (11, 18, 14, 19, 4, 25, 26, 2, 30, 28, 23, 27, 15, 20, 16, 3, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
    (12, 18, 13, 3, 24, 23, 26, 20, 1, 25, 10, 4, 28, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
    (13, 3, 16, 18, 12, 27, 24, 14, 1, 30, 15, 25, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
    (14, 3, 29, 11, 4, 9, 10, 19, 13, 8, 22, 17, 18, 25, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
    (15, 23, 27, 13, 11, 16, 22, 6, 2, 30, 10, 21, 20, 3, 9, 29, 7, 26, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
    (16, 11, 25, 1, 27, 15, 19, 5, 23, 13, 29, 3, 20, 17, 22, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
    (17, 7, 21, 14, 28, 20, 29, 24, 26, 16, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
    (18, 29, 1, 3, 8, 12, 13, 5, 14, 23, 19, 11, 25, 9, 26, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
    (19, 10, 22, 16, 11, 14, 3, 23, 5, 18, 27, 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
    (20, 7, 8, 24, 22, 30, 28, 21, 27, 9, 11, 17, 15, 4, 16, 12, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
    (21, 6, 24, 15, 26, 1, 17, 3, 20, 29, 28, 10, 4, 2, 22, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
    (22, 29, 2, 19, 5, 24, 14, 8, 23, 16, 20, 15, 21, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
    (23, 16, 11, 9, 12, 8, 5, 27, 18, 26, 28, 15, 19, 2, 22, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
    (24, 20, 5, 30, 26, 27, 3, 4, 7, 9, 17, 13, 1, 12, 29, 21, 22, 2, 6, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
    (25, 18, 16, 30, 28, 13, 2, 11, 14, 4, 7, 12, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
    (26, 11, 12, 17, 15, 23, 2, 18, 24, 21, 8, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
    (27, 29, 11, 15, 20, 9, 3, 8, 19, 23, 24, 13, 10, 5, 16, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
    (28, 7, 10, 21, 1, 17, 23, 8, 6, 29, 20, 12, 25, 11, 5, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
    (29, 4, 24, 5, 15, 1, 17, 2, 21, 7, 16, 14, 18, 27, 22, 28, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
    (30, 8, 9, 11, 25, 13, 7, 15, 2, 5, 24, 20, 10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
