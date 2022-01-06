import mysql.connector
from mysql.connector import errorcode

# Connection to MySQL db for specific queries for algorithm logic calculations and usages
# DB is connected to React via REST API and not using this code

PASS = '***********'  # TODO -> change to your password !!

# Make sure your MySQL connection is through root user and at local host, similar to the
# arguments in the open_db method.


# Check for errors in connection and open database
def open_db(password, user='root', host='127.0.0.1', database='sadnadb'):
    try:
        # should be your own localhost MySQL credentials
        db = mysql.connector.connect(user=user,
                                     password=password,
                                     host=host,
                                     database=database)
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
            return
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
            return
        else:
            print(err)
            return
    return db


def getAllUsers():
    """
    Get all the users from the User Table
    """
    mydb = open_db(PASS)
    mycursor = mydb.cursor()

    sql_query = "SELECT * FROM users"
    mycursor.execute(sql_query)
    res = mycursor.fetchall()

    mydb.close()

    return res


def getFullname(user_id):
    """
    Get all the users' full names from the User Table
    """
    mydb = open_db(PASS)
    mycursor = mydb.cursor()

    sql_query = "SELECT fullName FROM Users WHERE UserID=%s"
    mycursor.execute(sql_query, (user_id,))
    res = mycursor.fetchall()

    mydb.close()

    return res[0][0]


