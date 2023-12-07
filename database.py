import psycopg2
import os
from dotenv import load_dotenv
import bcrypt

load_dotenv()
host = os.getenv('HOST')
database = os.getenv('DATABASE')
user = os.getenv('USERDB')
password = os.getenv('PASSWORD')
port = os.getenv('PORT')
print(user)
print(database)


def hasher(password):
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    print(type(hashed_password))

    return hashed_password


def confirm_hasher(password, hashed_password):
    if bcrypt.checkpw(password.encode('utf-8'), bytes(hashed_password, 'utf-8')):
        return True
    return False


def return_query(query: str, everything: bool):
    connection = psycopg2.connect(
        host=host,
        database=database,
        user=user,
        password=password,
        port=port
    )

    try:
        cursor = connection.cursor()
        cursor.execute(query)
        if everything:
            result = cursor.fetchall()
        else:
            result = cursor.fetchone()
        cursor.close()
        return result
    except (Exception, psycopg2.Error) as error:
        print(f'ERROR: {error}')
    finally:

        if connection:
            connection.close()


def write_query(query: str):
    connection = psycopg2.connect(
        host=host,
        database=database,
        user=user,
        password=password,
        port=port
    )

    try:
        cursor = connection.cursor()
        cursor.execute(query)
        connection.commit()
        print(cursor.statusmessage)
        return 200
    except (Exception, psycopg2.Error) as error:
        print(f'ERROR:{error}')
        return 500
    finally:

        if connection:
            connection.close()


# db_obj = return_query(f"SELECT * from users WHERE email='edeanijerry@gmail.com'")
# print(db_obj[0])
# name='jerry'
# email='dendahd'
# hash_password='adjfhfha'
# query="insert into users(name,email,password) values('ultimate','edeaanijerrmy@kgmail.com','bla');"
# wq=write_query(query)
# print(wq)
hasher('ddnf')
