<<<<<<< HEAD
#Requirements : Python compiler and MYSQL 
# After that You need to install "mysql-connector-python" 
# For that  "pip install mysql-connector-python" copy pasting this comment in your command prompt
# And simply run this code in your cmd
import mysql.connector
import getpass  


host = input("Enter the database host: ")
user = input("Enter the database username: ")
password = getpass.getpass("Enter the database password: ")
database = input("Enter the database name: ")

try:

    conn = mysql.connector.connect(
        host=host,
        user=user,
        password=password
    )

    if conn.is_connected():
        print("Connected to the database server successfully!")

        cursor = conn.cursor()

        # Create the database
        create_db_query = f"CREATE DATABASE IF NOT EXISTS {database}"
        cursor.execute(create_db_query)
        print(f"Database '{database}' created successfully!")

        # Switch to the newly created database
        conn.database = database

        create_table_query1 = """
        CREATE TABLE IF NOT EXISTS info_db (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            movie_name VARCHAR(255),
            rating VARCHAR(255)
        )
        """
        cursor.execute(create_table_query1)
        print("Table_1 created successfully!")

        create_table_query2 = """
        CREATE TABLE IF NOT EXISTS ticket_info (
            sel_seats VARCHAR(255),
            sel_ticket VARCHAR(255),
            amount VARCHAR(255)
        )
        """
        cursor.execute(create_table_query2)
        print("Table_2 created successfully!")

        # Commit changes to the database
        conn.commit()

except mysql.connector.Error as err:
    print(f"Error: {err}")

finally:
    if 'conn' in locals() and conn.is_connected():
        cursor.close()
        conn.close()
=======
#Requirements : Python compiler and MYSQL 
# After that You need to install "mysql-connector-python" 
# For that  "pip install mysql-connector-python" copy pasting this comment in your command prompt
# And simply run this code in your cmd
import mysql.connector
import getpass  


host = input("Enter the database host: ")
user = input("Enter the database username: ")
password = getpass.getpass("Enter the database password: ")
database = input("Enter the database name: ")

try:

    conn = mysql.connector.connect(
        host=host,
        user=user,
        password=password
    )

    if conn.is_connected():
        print("Connected to the database server successfully!")

        cursor = conn.cursor()

        # Create the database
        create_db_query = f"CREATE DATABASE IF NOT EXISTS {database}"
        cursor.execute(create_db_query)
        print(f"Database '{database}' created successfully!")

        # Switch to the newly created database
        conn.database = database

        create_table_query1 = """
        CREATE TABLE IF NOT EXISTS info_db (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            movie_name VARCHAR(255),
            rating VARCHAR(255)
        )
        """
        cursor.execute(create_table_query1)
        print("Table_1 created successfully!")

        create_table_query2 = """
        CREATE TABLE IF NOT EXISTS ticket_info (
            sel_seats VARCHAR(255),
            sel_ticket VARCHAR(255),
            amount VARCHAR(255)
        )
        """
        cursor.execute(create_table_query2)
        print("Table_2 created successfully!")

        # Commit changes to the database
        conn.commit()

except mysql.connector.Error as err:
    print(f"Error: {err}")

finally:
    if 'conn' in locals() and conn.is_connected():
        cursor.close()
        conn.close()
>>>>>>> 2375fa730a3abd5b59c0188103fed08d9354bcc3
        print("Database connection closed.")