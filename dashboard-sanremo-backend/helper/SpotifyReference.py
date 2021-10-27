import requests
import json
import re
import unicodedata
from os import environ

class SpotifyReference:
    def __init__(self, song, artist):
        """ SpotifyReference initial constructor """

        self.CLIENT_ID = environ["SPOTIFY_CLIENT_ID"]
        self.CLIENT_SECRET = environ["SPOTIFY_CLIENT_SECRET"]
        self.AUTH_URL = 'https://accounts.spotify.com/api/token'
        self.BASE_URL = 'https://api.spotify.com/v1/search?q='
        self.song= song
        self.artist= artist

    def getSpotifyUrl(self):      
        """ Use Spotify API through get request to retrieve the corresponding link song """

        auth_response = requests.post(self.AUTH_URL, {
            'grant_type': 'client_credentials',
            'client_id': self.CLIENT_ID,
            'client_secret': self.CLIENT_SECRET,
        })

        auth_response_data = auth_response.json()

        # save the access token
        access_token = auth_response_data['access_token']
        headers = {
        'Authorization': 'Bearer {token}'.format(token=access_token)
        }
        # actual GET request with proper header
        r = json.loads(requests.get(self.BASE_URL + str(self.song) + '&type=track&market=IT', headers=headers).text)
        boolean=True
        try:
            res=r['tracks']['items'][0]
        except:
            boolean=False
        link=""
        if boolean:
            for i in r:  
                normSong = unicodedata.normalize('NFD', r[i]['items'][0]['name']).encode('ascii', 'ignore').decode()
                normResSong = unicodedata.normalize('NFD', self.song).encode('ascii', 'ignore').decode()     
                normArt = unicodedata.normalize('NFD', r[i]['items'][0]['artists'][0]['name']).encode('ascii', 'ignore').decode()
                normResArt = unicodedata.normalize('NFD', self.artist).encode('ascii', 'ignore').decode()        
                normSong= normSong.replace("'", "")
                normArt= normArt.replace("'", "")
                normResSong= normResSong.replace("'", "")
                normResArt= normResArt.replace("'", "")
                if bool(re.search(normResSong, normSong, re.IGNORECASE)) and bool(re.search(normResArt, normArt, re.IGNORECASE)):
                    link= res['external_urls']['spotify']
            return link