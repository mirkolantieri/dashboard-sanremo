import unittest
import app
import json

class TestAPI(unittest.TestCase):
    def test_get_ranking_data(self):
        """ Test for data returned querying 'sanremo_2021' """
        
        with app.app.app_context():
            ranking_data = app.getRankingData(2021)

            self.assertEqual(ranking_data.status_code, 200)
            self.assertEqual(ranking_data.content_type, 'application/json')

            content = json.loads(ranking_data.data)
            # results length
            self.assertEqual(len(content), 3) # Brano, Immagini, Interprete

            self.assertEqual(type(content['Brano']), list) 
            self.assertEqual(type(content['Immagini']), list) 
            self.assertEqual(type(content['Interprete']), list) 

            self.assertEqual(len(content['Brano']), len(content['Immagini'])) 
            self.assertEqual(len(content['Immagini']), len(content['Interprete']))

    def test_get_sanremo_info(self):
        """ Test for sanremo info """
        
        with app.app.app_context():
            s_info = app.getSanremoInfo(2021)

            self.assertEqual(s_info.status_code, 200)
            self.assertEqual(s_info.content_type, 'application/json')

            content = json.loads(s_info.data)
             # results length
            self.assertEqual(len(content), 2)

            # results data type
            self.assertEqual(type(content['description']), list)
            self.assertEqual(type(content['image']), str) 

    def test_retrive_song_video(self):
        """ Test for retrive yt videos """
        
        with app.app.app_context():
            s_info = app.retrive_song_video(str(2021))

            self.assertEqual(s_info.status_code, 200)
            self.assertEqual(s_info.content_type, 'application/json')

            content = json.loads(s_info.data)
             # results length
            self.assertEqual(len(content['urls']), 10)

            # results data type
            self.assertEqual(type(content['urls']), list) 
    
    def test_getArtistDetails(self):
        """ Test for data returned about a specific sanremo artist """

        with app.app.app_context():
            ranking_data = app.getArtistDetails("2021", "Madame", "8")
            
            self.assertEqual(ranking_data.status_code, 200)
            self.assertEqual(ranking_data.content_type, 'application/json')

            content = json.loads(ranking_data.data)
             # results length
            self.assertEqual(len(content[0]), 6)
            # results data type and position values
            for index, element in enumerate(content, start=1):
                self.assertEqual(type(element[0]), str)
                self.assertEqual(type(element[1]), str)
                self.assertEqual(type(element[2]), str)
                self.assertEqual(type(element[3]), str)
                self.assertEqual(type(element[4]), str)
                self.assertEqual(type(element[5]), str)
