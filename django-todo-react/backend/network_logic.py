import json
import networkx as nx
import random
from matplotlib import pyplot as plt
from connectDB import getAllUsers, getFullname


#######################################################################

#  Algorithmic Logic which creates and saves the Friend Social Network
#  The friends connections are created by generating a Random graph,
#  Using the Erdos Renyi method. The graph is saved into a JSON file,
#  Which is shows each node and its neighbors and defines the friend DB

#  Note that for smoother connection and demonstration, the json file
#  was inherited into the mysql workbench

########################################################################


def create_id_list():
    """
    Function which created an id list of all users, using the connection from MySQL
    """
    users_list = getAllUsers() # query from DB
    id_list = [item[0] for item in users_list]
    return id_list


def initialize_friend_graph(p=0.5):
    """
    Funtion which returns creates a random graph
    using the Erdos Renyi method
    Simulates the social network graph of friends
    Envoked once to create the friends graph and later saved to a json file
    Probability for the Erdos Renyi method was chosen as p=0.5
    """

    id_list = create_id_list()
    n = len(id_list)
    G = nx.erdos_renyi_graph(n, p, directed=False)

    return G


def plot_graph(G):
    """
    Plot of Friend Social network
    """
    nx.draw(G, with_labels=True)
    plt.savefig('Graph.png', format='PNG')
    plt.show()


def create_undirected_edge_list(G):
    """
    Creates an edge list for each node.
    Note that the graph is undirected -> I am my friend's friend
    """
    friends = []
    for line in nx.generate_edgelist(G, data=False):
        first = line.split(' ')[0]
        second = line.split(' ')[1]
        edge = [int(first), int(second)]
        friends.append(edge)
    return friends


def create_friends_dict(edge_list, users_list):
    """
    Returns a dictionary of users and only their friends
    Implemented to avoid annoying networkx stuff (not using methods such as edgelist)
    Note that added +1 because indices of users begin at 1 and not at 0
    Friends are shuffled in the json file as default, following frontend demands
    """

    friends_dict = {}

    for i in range(len(users_list)):
        for edge in edge_list:
            # Add to dictionary both cases of edge as explained above (I am my friend's friend)
            if i == edge[0]:
                try:
                    # see the getFullname method implemented in the connectDB script
                    # which creates the DB query
                    friends_dict[getFullname(str(int(i + 1)))].append((getFullname(str(int(edge[1] + 1))),
                                                                       str(int(edge[1] + 1))))
                except KeyError:  # Key Error may occur if no value in key
                    friends_dict[getFullname(str(int(i + 1)))] = [(getFullname(str(int(edge[1] + 1))),
                                                                   str(int(edge[1] + 1)))]
            elif i == edge[1]:
                try:
                    friends_dict[getFullname(str(int(i + 1)))].append((getFullname(str(int(edge[0] + 1))),
                                                                       str(int(edge[0] + 1))))
                except KeyError:
                    friends_dict[getFullname(str(int(i + 1)))] = [(getFullname(str(int(edge[0] + 1))),
                                                                   str(int(edge[0] + 1)))]
        random.shuffle(friends_dict[getFullname(str(int(i + 1)))])
    return friends_dict

############################################################################################
# My Best Hungry Friends
# Functions which allow users to choose best friends from their friends list.
# These friends would be first in the friend list of each user,
# These functions create a new JSON file with the new order according to best friends

# At the moment, this is implemented in mySQL as well for demonstration (in Friend's table)
# This function would be used as Future Work in this project
def my_best_hungry_friends(userid, best_friends):
    """
    :param userid: user who chooses his/her best friends
    :param best_friends: A list of best friends' ids chosen
    :return: An update json file with the list sorted according to the chosen best friends
    """
    data = open_friends_dict_from_json()

    my_friends = data[str(userid)]

    for best_friend in best_friends:
        my_friends.insert(0, my_friends.pop(my_friends.index(best_friend)))

    data[str(userid)] = my_friends

    save_friends_dict_to_json(data)

    return 0


############################################################################################


def save_friends_dict_to_json(friends_dict):
    """
    Saves friends dictionary to json file
    """
    with open('friends_data.json', 'w') as fp:
        json.dump(friends_dict, fp, sort_keys=False, indent=4)
    return 0


def open_friends_dict_from_json():
    """
    Read friends dictionary from json file
    """
    try:
        with open('friends_data.json', 'r') as json_file:
            data = json.load(json_file)
        return data
    except KeyError:
        print("Error in json file")
        return 1


# One time initialization
# Create a the friends network
G = initialize_friend_graph(p=0.5)

# plotting graph
plot_graph(G)

# Creating JSON file
save_friends_dict_to_json(
    create_friends_dict(create_undirected_edge_list(G), create_id_list()))

# Open json file
data = open_friends_dict_from_json()

