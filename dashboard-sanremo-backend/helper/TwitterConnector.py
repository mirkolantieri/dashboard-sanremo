import pandas as pd
import snscrape.modules.twitter as sntwitter


class TwitterConnector:
    """ Class TwitterConnector: the class defines the driver to be used for the webscraping
    of datas from twitter. It will be used to retrieve tweets related to the sanremo festival
    """
    def __init__(self):
        self.count = 15

    def retrieve_tweet(self, year):
        """ function `retrieve_tweet`:
            Retrieve the tweets related to the sanremo edition in the specific year.
            The provided query is an hashtag containing #sanremo<year_edition>

        params: 
                self
                year: the year of the sanremo festival contest

        return:
            retrieved tweets
        """
        
        query = f'#sanremo{year}'
        tweets = []
        for i, tweet in enumerate(sntwitter.TwitterSearchScraper(query).get_items()):
            if i >= self.count: break
            tweets.append(tweet)

        return tweets
