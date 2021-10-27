from googlesearch import search
import re

class YoutubeConnector:
    """ Class that allows you to retrieve youtube videos related to the festival """ 
    def __init__(self):
        self.youtube_base_string = f'https://www.youtube.com/embed/'

    def retrive_song_video(self, year):
        """ Return youtube videos of sanremo relating to a specific year """
        query = str('Sanremo '+ year ) + " youtube"
        urls = []
        for j in search(query, num_results=9):
            img_url = j
            id = re.sub(r'^.*?v=', '', img_url)
            urls.append(self.youtube_base_string + str(id))
        
        return {'urls':urls}

    def retrive_song_video_no_year(self):
        """ Return youtube video of sanremo first in research """
        query = str('Sanremo') + " youtube"
        urls = []
        for j in search(query, num_results=9):
            img_url = j
            id = re.sub(r'^.*?v=', '', img_url)
            urls.append(self.youtube_base_string + str(id))
        
        return {'urls':urls}