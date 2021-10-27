import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import theme from '../../theme'
import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Tooltip from '@material-ui/core/Tooltip';

import SideBar from '../../components/SideBar/SideBar'
import FinalRanking from '../../components/FinalRanking/FinalRanking.js'
import ArtistDetails from '../ArtistDetails/ArtistDetails.js'
import SanremoInfo from '../../components/SanremoInfo/SanremoInfo';
import Youtube from '../../components/Youtube/Youtube';
import TweetFeed from '../../components/TwitterIntegration/TwitterIntegration';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // height: '-webkit-fill-available',
    height: '100%'
  },
  flexColumn: {
    display: 'flex',
    height: '100%'
  },
  main: {
    padding: '15px 30px',
    overflowY: 'scroll',
    width: '-webkit-fill-available'
  },
  spacer: {
    flexGrow: 2
  },
  welcome: {
    width: '80%',
    marginTop: '15%',
    marginLeft: '10%',
    textAlign: 'center'
  }
}));

/**
 * Code for rendering and managing homepage.
 * @class Home
 */
export default function Home() {

  const classes = useStyles();

  /**
   * Used to render homepage
   * @function homePage
   */
  function homePage() {
    return (
      <div className={classes.welcome}>
        <Typography variant="h3">
          Benvenuto sulla Dashboard
        </Typography>
        <Typography variant="h3">
          Festival di Sanremo
        </Typography>
        <Typography variant="h5" style={{ margin: '40px' }}>
          Seleziona un anno per iniziare
        </Typography>
      </div>
    );
  }

  /**
   * Used to every edition information and ranking
   * @function yearInfo
   */
  function yearInfo() {
    return (
      <div>
        <SanremoInfo />
        <FinalRanking />
      </div>
    );
  }

  /**
  * Function that is used to wrap multiple <Route/> components.
  * A <Route /> component render the appropriate user interface when 
  * the current location matches the route’s path.
  * @function bswitch
  */
  function bswitch() {
    return (
      <>
        <Switch>
          <Route path="/:pathYear/artistDetails/" component={ ArtistDetails } />
          <Route path="/youtube/:pathYear" component={ Youtube } />
          <Route path="/youtube/" component={ Youtube } />
          <Route path="/twitter/:pathYear" component={TweetFeed} />
          <Route path="/twitter/" component={TweetFeed} />
          <Route path="/:pathYear" children={yearInfo()} />
          <Route path="/" children={homePage()} />
        </Switch>
      </>
    );
  }

  // Render
  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <AppBar color="primary" position="static">
          <Toolbar>
            <Typography variant="h4" className={classes.title}>
              Dashboard Festival di Sanremo
            </Typography>
            <div className={classes.spacer}></div>
            <Tooltip title="Torna alla Home">
              <IconButton aria-label="back to home" href="/">
                <HomeIcon fontSize="large" style={{ color: '#fff' }} />
              </IconButton>
            </Tooltip>

          </Toolbar>
        </AppBar>
        <Router>
          <div className={classes.flexColumn}>
            <SideBar />
            <div className={classes.main}>
              {bswitch()}
            </div>
          </div>
        </Router>
      </ThemeProvider>
    </div>
  );
}
