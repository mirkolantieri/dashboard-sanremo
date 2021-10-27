import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import Api from '../../api/api';

const api = new Api();

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(2)
  },
  image: {
    float: 'right',
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(2)
  },
  description: {
    padding: theme.spacing(2),
    textAlign: 'justify',
    boxShadow: '3px 3px 20px -11px rgba(46,46,46,0.79)',
    marginBottom: theme.spacing(2),
    overflow: 'auto'
  },
  paragraph: {
    marginBottom: theme.spacing(1)
  }
}));

/**
 * Code for showing Sanremo information.
 * @class SanremoInfo
 */
export default function SanremoInfo() {
  const classes = useStyles();

  const [data, setData] = useState(null);

  let { pathYear } = useParams();

  /**
  * Method to obtain response from api.
  * Response contains various information about Sanremo in order to briefly describe the festival.
  * @function getData
  */
  const getData = useCallback(() => {
    api.get(`/info/${pathYear}`)
    .then((response) => {
      // handle data received
      // console.log(response);
      setData(response);
    })
    .catch((err) => console.log(err))
  }, [pathYear]);

  useEffect(() => {
    getData();
  }, [pathYear, getData])


  return (
    <div>
      {/* Title */}
      <Typography className={classes.title} variant="h4">
        Festival di Sanremo - anno {pathYear}
      </Typography>

      <div className={classes.description}>
        {/* Image */}
        <div className={classes.image}>
          <img src={data?.image} alt={"Sanremo year " + pathYear} />
        </div>

        {/* Description */}
        { data?.description.map((par, index) => {
          return <div className={classes.paragraph} key={index}>
            <Typography>{par}</Typography>
          </div>
        }) }
      </div>
    </div>
  );
}