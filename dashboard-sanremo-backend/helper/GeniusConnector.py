import requests
import pandas as pd
import re
from os import environ

class GeniusConnector:
    def __init__(self):
        self.access_token = environ["GENIUS_TOKEN"]

    def search(self, artist, title):
        """ 
        Performs a search query to Genius endpoint .
        Returns results from an HTTP GET request.
        """

        headers = {
            'Authorization': f'Bearer {self.access_token}'
        }
        artistOK= self.get_artists(artist)
        titleOK = title
        query = f'{titleOK}%20{artistOK[0]}'
        endpoint = f'https://api.genius.com/search?q={query}'
        print(endpoint)
        return requests.get(endpoint, headers=headers)

    def get_artists(self, artist):
        """ Extract name for each artist that played a specific song """
        
        remain= artist
        pattern = [' con ', ' e ', ' feat. ', ', ', ' & ', ' ed ']
        artists = []
        while remain != "":
            index= -1
            first= ""
            for pat in pattern:
                if bool(re.findall(pat, remain)):
                    id = remain.find(pat)
                    if index== -1:
                        first=pat
                        index= id
                    elif id<index:
                        first=pat
                        index=id
            if index == -1:
                artists.append(remain)
                remain = ""
            else:
                artists.append(remain.split(first, 1)[0])
                remain= remain.split(first, 1)[1]
        return artists

    def retrieve_ranking_images(self, data, ids=False):
        """ 
        Exploit results from HTTP GET request to find appropriate images. 
        Returns a list of images' urls.
        """

        images = []
        id_list = []
        data = pd.DataFrame(data)

        for entry in data.itertuples():
            search_results = self.search(entry[1], entry[2]).json()
            if len(search_results['response']['hits']) > 0:
                image = search_results['response']['hits'][0]['result']['song_art_image_thumbnail_url']
                id = search_results['response']['hits'][0]['result']['id']
            else:
                image = None
                id = None
            images.append(image)
            id_list.append(id)

        data['Immagini'] = images
        # add ids only if requested
        if ids:
            data['Ids'] = id_list
        return data.to_dict(orient='list')