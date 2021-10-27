import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

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
      overflow: 'auto'
    },
    text: {
      marginBottom: theme.spacing(2)
    },
    videosContainer: {
      display: "flex", 
      flexWrap: "wrap"
    },
    videoContainer: {
      width: "50%"
    },
    video: {
      width: "100%",
      minHeight: 280
    }
  }));

/**
 * Code for view sanremo videos.
 * @class Youtube
 */
 export default function Youtube() {
  const classes = useStyles();

  const [ytPath, setytPaths] = useState(null);
  const [loading, setLoading] = useState(false);

  let { pathYear } = useParams();

  /**
  * Method to obtain response from api.
  * Response contains urls about sanremo videos.
  * @function getData
  */
  const getData = useCallback(() => {
    setLoading(true);
    let myPath;
    if(pathYear){
        myPath = `/youtube/${pathYear}`;
    }
    else {
        myPath = `/youtube/SanremoRai`;
    }
    api.get(myPath)
    .then((response) => {
      // handle data received
      console.log(response);
      setytPaths(response);
    })
    .catch((err) => console.log(err))
    .then(() => setLoading(false));
  }, [pathYear]);

  useEffect(() => {
    getData();
  }, [pathYear, getData])

  return(
    <div>
      <Typography className={classes.title} variant="h4">
        Video inerenti al Festival di Sanremo {pathYear}
      </Typography>
      <div className={classes.container}>
          <Typography className={classes.text} variant="body1">
            Alcuni dei video più famosi inerenti al Festival di Sanremo {pathYear}
          </Typography>
          
          {loading ? <LinearProgress /> :
            <div className={classes.videosContainer}>
                { ytPath?.urls.map((par) => {
                    return (
                      <div className={classes.videoContainer}>
                        <iframe 
                        src={par} 
                        className={classes.video}
                        title="YouTube video player" frameborder="5" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen> 
                        </iframe>
                      </div>
                    );
                })}
            </div>
          }
      </div>
    </div>
  );
}
