import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import { LinearProgress } from '@material-ui/core';

import Tweet from './Tweet'
import Api from '../../api/api';
const api = new Api();

const useStyles = makeStyles((theme) => ({
    title: {
        marginBottom: theme.spacing(2)
    },
    container: {
        padding: theme.spacing(1),
        textAlign: 'justify',
        boxShadow: '3px 3px 20px -11px rgba(46,46,46,0.79)',
        marginBottom: theme.spacing(2),
        overflow: 'auto%'
    },
    timeline: {
        boxShadow: '3px 3px 20px -11px rgba(46,46,46,0.79)'
    },
    text: {
        marginBottom: theme.spacing(2)
    },
    tweetsContainer: {
        display: "flex",
        flexWrap: "wrap",
        overflow: 'auto',
        justifyContent: "space-around",
        gap: 20
    },
    tweetContainer: {
        width: "50%",
        height: "50%"
    },
    tweet: {
        width: "100%",
        minHeight: 250,
    }
}));

/**
 * Method to obtain tweets from Twitter search feed.
 * Returns the tweets from different editions of Sanremo based on the year.
 * @class TweetFeed
 */
export default function TweetFeed() {

    const classes = useStyles();

    const [twitterPath, setTwitterPaths] = useState(null);
    const [loading, setLoading] = useState(false);

    let { pathYear } = useParams();

    /**
     * Method to fetch the data from the api.
     * Response method contains tweets from users about sanremo festival contest
     * to be redirected according by the year
     * @function getData
     */
    const getData = useCallback(() => {
        let myPath;
        if (pathYear) {
            setLoading(true);
            myPath = `/twitter/${pathYear}`;
        
            api.get(myPath)
            .then((response) => {
                // handle data received
                console.log(response);
                setTwitterPaths(response);
            })
            .catch((err) => console.log(err))
            .then(() => setLoading(false));
        }
    }, [pathYear]);

    useEffect(() => {
        getData();
    }, [pathYear, getData])

// Return the profile timeline of Sanremo if the year is not set
// otherwise return the tweets related to the sanrmemo festival in the specific year
    return (
        <div className={classes.container}>

            <Typography className={classes.title} variant="h4">
                Feed Twitter del Festival di Sanremo
            </Typography>

            {loading ? <LinearProgress /> :
                <>
                    {!pathYear &&
                        <>
                            <Typography className={classes.text} variant="body1">
                                Timeline del profilo ufficiale SanremoRai
                        </Typography>
                            <div className={classes.tweetsContainer}>
                                <div className={classes.tweetContainer}>
                                    <div className={classes.timeline}>
                                        <TwitterTimelineEmbed
                                            sourceType="profile"
                                            screenName="SanremoRai"
                                            transparent />
                                    </div>
                                </div>
                            </div>
                        </>
                    }

                    {pathYear &&
                        <>
                            <Typography className={classes.text} variant="body1">
                                Alcuni dei tweet più recenti del Festival di Sanremo {pathYear}
                            </Typography>
                            <div className={classes.tweetsContainer}>
                                {twitterPath?.map((tweet) => {
                                    console.log(tweet)
                                    return <Tweet data={tweet} />
                                })}
                            </div>
                        </>
                    }
                </>
            }
        </div>

    );
}