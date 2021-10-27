from os import environ
import sqlite3
import requests
import bs4
import re
import json
import unicodedata
from os import environ

from lyricsgenius import Genius
from googlesearch import search

from .SpotifyReference import SpotifyReference

class ArtistDetails:
    def __init__(self, year, artist=None, position=None):
        """ ArtistDetails initial constructor """

        self.conn = sqlite3.connect("helper/dashboard-sanremo.db")
        self.cur = self.conn.cursor()
        self.data= [(None,)]
        self.genius = Genius(environ["GENIUS_TOKEN_LIB"])
        self.token = environ["GENIUS_TOKEN_LIB"]
        self.artist= artist
        self.year= year
        self.position=position
        self.initUrl= "https://it.wikipedia.org/wiki/"
        self.errorMsg= "Wikipedia in lingua italiana non ha ancora una voce con questo nome."
        self.scraper = None
        self.db= "sanremo_" + str(year)
        self.artists=[]

    def get_artists(self):
        """ Extract name for each artist that played a specific song """
        
        remain= self.artist
        pattern = [' con ', ' e ', ' feat. ', ', ', ' & ', ' ed ', ' - ']
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

    def new_columns_DB(self):
        """ Access database to retrieve data or add specific columns into database """

        try:
            self.cur.execute(f'SELECT Lyrics, ArtistDescription, ArtistImg, Spotify_link FROM "{self.db}" WHERE Artist = "{self.artist}" AND Position = "{self.position}";')
            self.data = self.cur.fetchall()
        except:
            print('le colonne interrogate non esistono')
            self.cur.execute(f'ALTER TABLE "{self.db}" ADD COLUMN Lyrics TEXT;')
            self.cur.execute(f'ALTER TABLE "{self.db}" ADD COLUMN ArtistDescription TEXT;')
            self.cur.execute(f'ALTER TABLE "{self.db}" ADD COLUMN ArtistImg TEXT;')
            self.cur.execute(f'ALTER TABLE "{self.db}" ADD COLUMN Spotify_link TEXT;')
            print('le colonne sono state aggiornate correttamente')


    def getLyrics(self, artists):
        """ Use Genius library to retrieve songs lyrics """

        self.cur.execute(f'SELECT Title FROM "{self.db}" WHERE Artist = "{self.artist}" AND Position = "{self.position}";')
        title = self.cur.fetchall()
        titolo = title[0][0]
        titolo= titolo.split('[')[0]
        try:
            new_text = self.genius.search_song(titolo, artists[0]).lyrics   
        except:
            new_text= ArtistDetails.retrieve_genius_data(self, titolo)
            new_text = new_text.replace('More on Genius', '')
        new_text = re.sub(r'\n', '<br />', new_text)
        new_text = re.sub(r'^.*?<br /><br />', '', new_text)
        return new_text

    def retrieve_genius_data(self, title):
        """ Use Genius API to retrieve songs lyrics """

        self.cur.execute(f'SELECT Genius_song_id FROM "{self.db}" WHERE Artist = "{self.artist}" AND Position = "{self.position}";')
        id = self.cur.fetchall()
        headers = {
            'Authorization': f'Bearer {self.token}'
        }
        new_text=""
        endpoint = f'https://api.genius.com/search?q={title}'
        response = json.loads(requests.get(endpoint, headers=headers).text)
        hits = response['response']['hits']
        for hit in hits:
            name= hit['result']['primary_artist']['name']
            if name in self.artists:
                url= hit['result']['url']
                response = requests.get(url)
                self.scraper = bs4.BeautifulSoup(response.content, 'html.parser')
                divs = self.scraper.find_all('div')
                for div in divs:
                    if div.has_attr('class'):
                        div_class= unicodedata.normalize('NFD', str(div['class'])).encode('ascii', 'ignore').decode()
                        if re.search("lyrics", div_class):
                            new_text = div.get_text()
                        break
        if new_text=="" and id != "":
            endpoint = f'https://api.genius.com/songs/{id[0][0]}'
            response = json.loads(requests.get(endpoint, headers=headers).text)
            if response['meta']['status']==200:
                url= response['response']['song']['url']
                response = requests.get(url)
                self.scraper = bs4.BeautifulSoup(response.content, 'html.parser')
                divs = self.scraper.find_all('div')
                for div in divs:
                    if div.has_attr('class'):
                        div_class= unicodedata.normalize('NFD', str(div['class'])).encode('ascii', 'ignore').decode()
                        if re.search("lyrics", div_class, re.IGNORECASE):
                            new_text = div.get_text()
                        if new_text != "":
                            break
        if new_text=="":
            new_text= "Il testo non è disponibile"
        return new_text

    def getDescription(self, i):
        """ Scraping from Wikipedia artist page to obtain his description """

        url= str(self.initUrl) + str(i) + '_(cantante)'
        response = requests.get(url)
        self.scraper = bs4.BeautifulSoup(response.content, 'html.parser')
        description = self.scraper.find_all('p')[0].get_text()
        if description == self.errorMsg: 
            response = requests.get(str(self.initUrl) + str(i) + '_(rapper)')
            self.scraper = bs4.BeautifulSoup(response.content, 'html.parser')
            description = self.scraper.find_all('p')[0].get_text()
            if description == self.errorMsg:
                response = requests.get(str(self.initUrl) + str(i))
                self.scraper = bs4.BeautifulSoup(response.content, 'html.parser')
                try:
                    description = self.scraper.find_all('p')[0].get_text()
                    if description == self.errorMsg:
                        description=""
                    else:
                        paragraphs = self.scraper.find_all('p')
                        par = paragraphs[0]
                        if(par.get_text()[0] == "«"):
                            par = paragraphs[1]

                        # full description, split into paragraphs 
                        description = []
                        while(isinstance(par, bs4.element.Tag)):
                            par_descr = re.sub(r'\[([A-Za-z0-9_]+)\]', '',  par.get_text())
                            par_descr = re.sub('\n', '',  par_descr)
                            description.append(par_descr)
                            par = par.nextSibling
                except:
                    description=""
            else:
                self.scraper = bs4.BeautifulSoup(response.content, 'html.parser')
                paragraphs = self.scraper.find_all('p')
                par = paragraphs[0]
                if(par.get_text()[0] == "«"):
                    par = paragraphs[1]

                # full description, split into paragraphs 
                description = []
                while(isinstance(par, bs4.element.Tag)):
                    par_descr = re.sub(r'\[([A-Za-z0-9_]+)\]', '',  par.get_text())
                    par_descr = re.sub('\n', '',  par_descr)
                    description.append(par_descr)
                    par = par.nextSibling
        else:
            self.scraper = bs4.BeautifulSoup(response.content, 'html.parser')
            paragraphs = self.scraper.find_all('p')
            par = paragraphs[0]
            if(par.get_text()[0] == "«"):
                par = paragraphs[1]

            # full description, split into paragraphs 
            description = []
            while(isinstance(par, bs4.element.Tag)):
                par_descr = re.sub(r'\[([A-Za-z0-9_]+)\]', '',  par.get_text())
                par_descr = re.sub('\n', '',  par_descr)
                description.append(par_descr)
                par = par.nextSibling
        final_description= ""
        for desc in description:
            final_description+= str(desc) + " "
        descriptions= str(final_description) + '<br />'
        
        return descriptions

    def getImgs(self, i):
        """ Search on the web to gain artist images """

        artistNormalized = unicodedata.normalize('NFD', self.artist).encode('ascii', 'ignore').decode()
        imgs = ""    
        images = self.scraper.find_all('img')
        for img in images:
            alt = unicodedata.normalize('NFD', img['alt']).encode('ascii', 'ignore').decode()
            if bool(re.search(i, alt, re.IGNORECASE) or re.search(artistNormalized, alt, re.IGNORECASE) or re.search(artistNormalized, img['src'], re.IGNORECASE)):
                if len(self.artists)>1:
                    img['width']="250"
                    img['height']="250"
                imgs += str(img)
                break
        
        if imgs == "":
            query = "immagini " + str(i) + " sanremo " + str(self.year)
            for j in search(query):
                img_url = j
                if imgs != "":
                    break
                response = requests.get(img_url)
                self.scraper = bs4.BeautifulSoup(response.content, 'html.parser')
                images = self.scraper.find_all('img')
                for img in images:
                    if img.has_attr("alt"):
                        alt = unicodedata.normalize('NFD', img['alt']).encode('ascii', 'ignore').decode()
                        if bool(re.search('<div', str(img), re.IGNORECASE))==False:
                            if bool(re.search(i, alt, re.IGNORECASE)) or re.search(artistNormalized, alt, re.IGNORECASE):
                                if len(self.artists)>1:
                                    img['width']="250"
                                    img['height']="250"
                                else:
                                    img['width']="350"
                                    img['height']="250"
                                imgs += str(img)
                                
                                break
                    if imgs == "" and img.has_attr("src"):
                        src = unicodedata.normalize('NFD', img['src']).encode('ascii', 'ignore').decode()
                        if bool(re.search('<div', str(img), re.IGNORECASE))==False:
                            if bool(re.search(i, src, re.IGNORECASE)) or re.search(artistNormalized, src, re.IGNORECASE):
                                if len(self.artists)>1:
                                    img['width']="250"
                                    img['height']="250"
                                else:
                                    img['width']="350"
                                    img['height']="250"
                                imgs += str(img)
                                break
        return imgs

    def getData(self, artists):
        """ Call to other methods to retrieve some data """

        descriptions= ""
        imgS=""
        for i in artists:
            descriptions+= ArtistDetails.getDescription(self, i)
            imgS+= ArtistDetails.getImgs(self, i)
        return descriptions, imgS

    def getSpotifyReference(self):
        """ Call to method of another class to retrieve the corresponding spotify url """

        self.cur.execute(f'SELECT Title FROM "{self.db}" WHERE Artist = "{self.artist}" AND Position = "{self.position}";')
        brano = self.cur.fetchall()
        link=""
        song = brano[0][0]
        song= song.split('[')[0]
        for art in self.artists:
            sr= SpotifyReference(song, art)
            link= sr.getSpotifyUrl()
            if link!="":
                break
        return link

    def updateDB(self, artists):
        """ Updates database with more information about artists """
        new_text = ArtistDetails.getLyrics(self, artists)
        descriptions, imgS= ArtistDetails.getData(self, artists)
        spotifyLink= self.getSpotifyReference()
        sql=f'''UPDATE '{self.db}'
                SET Lyrics = ?, ArtistDescription = ?, ArtistImg = ?, Spotify_link= ?
                WHERE Artist = ? AND Position = ?
            '''
        record= [new_text, descriptions, imgS, spotifyLink, self.artist, self.position]
        self.cur.execute(sql, record)
        self.conn.commit()
        self.cur.execute(f'SELECT Authors, Title, Lyrics, ArtistDescription, ArtistImg, Spotify_link FROM "{self.db}" WHERE Artist = "{self.artist}" AND Position = "{self.position}";')
        details = self.cur.fetchall()
        self.conn.close()
        return details



    def retrieve_artist_details(self):
        """ Retrieve data about artists and their songs (short descriptions, song authors, images, lyrics) through scraping and from database """

        if self.artist is not None:
            artists= ArtistDetails.get_artists(self)
            self.artists= artists
            ArtistDetails.new_columns_DB(self)
            if (self.data[0][0]==None or self.data==[]):
                details = ArtistDetails.updateDB(self, artists)
            else:
                self.cur.execute(f'SELECT Authors, Title, Lyrics, ArtistDescription, ArtistImg, Spotify_link FROM "{self.db}" WHERE Artist = "{self.artist}" AND Position = "{self.position}";')
                details = self.cur.fetchall()
                self.conn.close() 
            return details