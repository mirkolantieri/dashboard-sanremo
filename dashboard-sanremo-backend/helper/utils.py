from .DatabaseConnector import DatabaseConnector
from .ArtistDetails import ArtistDetails
from .Scraper import Scraper
from .GeniusConnector import GeniusConnector
from .YoutubeConnector import YoutubeConnector
from .TwitterConnector import TwitterConnector

db_connector = DatabaseConnector()
scraper = Scraper()
genius = GeniusConnector()
youtube = YoutubeConnector()
twitter = TwitterConnector()

def retrieve_sanremo_info(year):
    return scraper.retrieve_sanremo_info(year)

def retrieve_ranking_data(year):
    # retrieve artists and song names
    data = scraper.retrieve_ranking_data(year)
    # retrieve images
    if not db_connector.look_for_table(year):
        # data doesn't exist in DB
        db_connector.create_table(year)
        data = genius.retrieve_ranking_images(data, ids=True)
        db_connector.fill_table(year, data)
        del data["Ids"]
    else:
        # data exists in DB
        data = db_connector.retrieve_ranking_data(year)

    return data


def retrive_song_video(year):
    return youtube.retrive_song_video(year)

def retrive_song_video_no_year():
    return youtube.retrive_song_video_no_year()


def retrieve_artist_details(year, artist=None, position=None):
    """ Retrieve data about artists and their songs (short descriptions, song authors, images, lyrics and spotify url) through scraping and from database """

    artistDetails= ArtistDetails(year, artist, position)
    return artistDetails.retrieve_artist_details()

def retrieve_tweet(year):
    """ Retrieve tweets related to a the sanremo festival in a specific year  through the scraper"""
    return twitter.retrieve_tweet(year)
 
