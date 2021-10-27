import React, { useState, useEffect, useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';

import DEFAULT_IMAGE from './default.png';
import Api from '../../api/api';
const api = new Api();

const useStyles = makeStyles((theme) => ({
  head: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1)
  },
  gridListWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    cursor: 'pointer'
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    scrollBehavior: 'smooth'
  },
  title: {
    color: 'white'
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  divider: {
    marginBottom: theme.spacing(2)
  },
  position: {
    color: 'white',
    marginRight: theme.spacing(1)
  }
}));

/**
 * Code for showing Sanremo final ranking.
 * @class FinalRanking
 */
export default function FinalRanking() {
  const classes = useStyles();
  const ref = useRef(null);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  let { pathYear } = useParams();

  /**
  * Method to obtain response from api.
  * Response contains various information about Sanremo artists in according to create a ranking.
  * @function getData
  */
  const getData = useCallback(() =>  {
    setLoading(true);
    api.get(`/ranking/${pathYear}`)
    .then((response) => {
      // handle data received
      // console.log(response);
      setData(response);
    })
    .catch((err) => console.log(err))
    .then(() => setLoading(false))
  }, [pathYear]);

  useEffect(() => {
    getData();
  }, [pathYear, getData])

  /**
  * Scroll ranking list left or right.
  * @function scroll
  */
  function scroll(left) {
    left ? ref.current.scrollLeft -= 500 : ref.current.scrollLeft += 500;
  }

  /**
  * Click handler, redirect to artist details.
  * @function handleClick
  */
  function handleClick(nome, posizione) {
    window.location = `${pathYear}/artistDetails/${nome}/${posizione}`;
  }

// return
  return(
    <>
    <div className={classes.head}>
      <Typography variant="h5">Classifica finale</Typography>
      <IconButton onClick={() => scroll(true)}>
        <ArrowLeftIcon />
      </IconButton>
      <IconButton onClick={() => scroll(false)}>
        <ArrowRightIcon />
      </IconButton>
    </div>

    <Divider className={classes.divider}/>
    
    {loading ? <LinearProgress /> :
      <div className={classes.root}>
        <div className={classes.gridListWrapper}>
          <GridList className={classes.gridList} cellHeight={200} cols={3.5} ref={ref}>
            {data?.Brano.map((_, index) => (
              <GridListTile 
              className={classes.tile} 
              key={index} 
              onClick={() => {handleClick(data.Interprete[index], index+1)}}>

                <img src={data.Immagini[index] ? data.Immagini[index] : DEFAULT_IMAGE} alt={data.Brano[index]} />

                <GridListTileBar
                  title={data.Brano[index]}
                  subtitle={data.Interprete[index]}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title,
                  }}
                  actionIcon={
                    <IconButton className={classes.position}>
                      {/* {data.Posizione[index]} */}
                      {index + 1}
                    </IconButton>
                  }
                  actionPosition="right"
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
      </div>}
    </>
);
}
