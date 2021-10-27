from flask import Flask, jsonify
import helper.utils as utils
app = Flask(__name__)

def manage_cors(response):
    """ Puts `Access-Control-Allow-Origin` headers into the response """

    if response.headers is not None:
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

@app.route('/info/<year>', methods=['GET'])
def getSanremoInfo(year):
    """ Retrieve Sanremo Info """

    data = utils.retrieve_sanremo_info(year)
    response = jsonify(data)
    return manage_cors(response)

@app.route('/ranking/<year>', methods=['GET'])
def getRankingData(year):
    """ Retrieve ranking data from database, turns into json and return a response """

    data = utils.retrieve_ranking_data(year)
    response = jsonify(data)
    return manage_cors(response)


@app.route('/youtube/<year>', methods=['GET'])
def retrive_song_video(year):
    """ Retrieve  """

    data = utils.retrive_song_video(year)
    print(data)
    response = jsonify(data)
    return manage_cors(response)

@app.route('/youtube/SanremoRai', methods=['GET'])
def retrive_song_video_no_year():
    """ Retrieve  """
    
    data = utils.retrive_song_video_no_year()
    print(data)
    response = jsonify(data)
    return manage_cors(response)


@app.route('/<year>/artistDetails/<artist>/<position>', methods=['GET'])
def getArtistDetails(year, artist, position):
    """ Retrieve data about artists from database, turns into json and return a response """
    data = utils.retrieve_artist_details(year, artist, position)
    response = jsonify(data)
    return manage_cors(response)

@app.route('/twitter/<year>', methods=['GET'])
def retrieve_tweet(year):
    """ Retrieve tweet from different years """

    data = utils.retrieve_tweet(year)
    print(data)
    response = jsonify(data)
    return manage_cors(response)


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)
