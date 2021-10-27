import sqlite3
import pandas as pd

class DatabaseConnector:
    """ Class used to interact with sqlite database """

    def __init__(self):
        self.conn = None
        
    def connect(self):
        """ Connects to sqlite3 database """

        self.conn = sqlite3.connect("helper/dashboard-sanremo.db")

    def close(self):
        """ Closes connection to sqlite3 database cleanly """

        self.conn.commit()
        self.conn.close()

    def look_for_table(self, year):
        """ 
        Looks for a specific year table.
        Returns True if the table exists into database, False otherwise
        """

        self.connect()
        table_name = f"sanremo_{year}"
        query = f"SELECT name FROM sqlite_master WHERE type='table' AND name='{table_name}';"
        cursor = self.conn.cursor()
        cursor.execute(query)
        table = cursor.fetchall()
        self.close()
        if table:
            print(f"Table {table_name} already exists")
            return True
        else:
            print(f"Table {table_name} doesn't exist yet")
            return False

    def create_table(self, year):
        """ 
        Creates a table into sqlite3 database (if it doesn't exist), 
        for a specific Sanremo Edition.
        """

        self.connect()
        table_name = f"sanremo_{year}"
        query = f"CREATE TABLE IF NOT EXISTS {table_name} (" \
                "Position INTEGER PRIMARY KEY," \
                "Artist TEXT," \
                "Title TEXT," \
                "Image TEXT," \
                "Genius_song_id INTEGER," \
                "Authors TEXT);"
        cursor = self.conn.cursor()
        cursor.execute(query)
        self.close()
        print(f"Table {table_name} created")

    def fill_table(self, year, data):
        """ Fills a specific Sanremo edition table with data gotten from scraping """

        table_name = f"sanremo_{year}"
        records = []
        try:
            for index in range(1, len(data["Interprete"]) + 1):
                records.append((index, 
                                data["Interprete"][index - 1],
                                data["Brano"][index - 1],
                                data["Immagini"][index - 1],
                                data["Ids"][index - 1],
                                data["Autori"][index - 1]))
            self.connect()
            cursor = self.conn.cursor()
            cursor.executemany(f'INSERT INTO {table_name} VALUES(?,?,?,?,?,?);', records)
            print('We have inserted', cursor.rowcount, 'records to the table.')
            self.close()
        except:
            print("Couldn't save data into DB")

    def retrieve_ranking_data(self, year):
        """ Retrieve ranking data (artist, song title and album image) from database """

        table_name = f"sanremo_{year}"
        self.connect()
        cursor = self.conn.cursor()
        cursor.execute(f'SELECT Artist, Title, Image FROM {table_name};')
        data = cursor.fetchall()
        self.close()
        data = pd.DataFrame(data, columns=['Interprete', 'Brano', 'Immagini'])
        return data.to_dict(orient='list')
