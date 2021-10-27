import unittest
import os
import sqlite3

class TestDatabase(unittest.TestCase):
    def setUp(self):
        self.db_path = f"{os.path.dirname(os.path.realpath(__file__))}/../helper/dashboard-sanremo.db"

    def test_db_existance(self):
        """  Test for database file existance """

        self.assertTrue(os.path.isfile(self.db_path))

    def test_db_connection(self):
        """ Database connection test """

        connection = sqlite3.connect(self.db_path)
        cursor = connection.cursor()
        self.assertTrue(cursor.connection == connection)
        cursor.close()
        connection.close()

    def test_table_existance(self):
        """ Test for 'sanremo_2021' table existance into database """

        connection = sqlite3.connect(self.db_path)
        cursor = connection.execute("SELECT name FROM sqlite_master WHERE type='table';")
        res = cursor.fetchall()
        self.assertIn(('sanremo_2021',), res)
        cursor.close()
        connection.close()
    
    def test_ranking_data(self):
        """ Test for data returned querying 'sanremo_2021' """
        
        connection = sqlite3.connect(self.db_path)
        cursor = connection.execute("SELECT * FROM sanremo_2021;")
        res = cursor.fetchall()

        # results length
        self.assertEqual(len(res), 26)

        # results data type and position values
        for index, element in enumerate(res, start=1):
            self.assertEqual(type(element[0]), int)
            self.assertEqual(element[0], index)
            self.assertEqual(type(element[1]), str)
            self.assertEqual(type(element[2]), str)
            self.assertEqual(type(element[3]), str)
            self.assertEqual(type(element[4]), int)
            self.assertEqual(type(element[5]), str)
            self.assertEqual(type(element[6]), str)
            self.assertEqual(type(element[7]), str)
            self.assertEqual(type(element[8]), str)
            self.assertEqual(type(element[9]), str)
        
        cursor.close()
        connection.close()
