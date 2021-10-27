import app
import json
import unittest


class TestTwitter(unittest.TestCase):
    def test_retrieve_tweet(self):
        """ Test for tweet returned querying '#sanremo2021' """
        
        with app.app.app_context():
            retrieve_data = app.retrieve_tweet('2021')

            self.assertEqual(retrieve_data.status_code, 200)
            self.assertEqual(retrieve_data.content_type, 'application/json')

            content = json.loads(retrieve_data.data)
            # results length
            self.assertEqual(type(content), list)
            self.assertEqual(len(content), 15)

            for index in range(len(content)):
                self.assertEqual(type(content[index]['id']), int)
                self.assertEqual(type(content[index]['content']), str)
                self.assertEqual(type(content[index]['url']), str)
