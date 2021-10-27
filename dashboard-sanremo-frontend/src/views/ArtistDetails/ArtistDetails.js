import React from 'react';
import Api from '../../api/api';

import './ArtistDetails.css';
import LinearProgress from '@material-ui/core/LinearProgress';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
const api = new Api ();

/**
 * Code for showing some information about artists.
 * @class ArtistDetails
 */

export default class ArtistDetails extends React.Component{
  /**
  * 
  * Method to set the intial state  of the ArtistDetails component.
  * @param {object} props
  * @constructs
  */
  constructor(props){
    super(props);
    const name = this.props.location.pathname.split("/")[3];
    const year = this.props.location.pathname.split("/")[1];
    const position = this.props.location.pathname.split("/")[4];
    this.state = {
      description: "Errore durante il recupero dei dati relativa all'artista...",
      artist: name,
      year: year,
      position: position,
      authors: null,
      title: null, 
      lyrics: null,
      img: null,
      loading: false,
      spotify: null
    }
  }


  /**
   * This method is called after all the elements of the page are rendered correctly
   * It contains the call to getAuthors method.
   * @function componentDidMount
  */
  componentDidMount() {
    this.getAuthors()
  }

  /**
  * Method to obtain response from api.
  * Response contains various information about Sanremo artists.
  * @function getAuthors
  */

  getAuthors = () => {
    this.setState({loading: true})
    api.get('/' + this.state.year + '/artistDetails/' + this.state.artist + '/' + this.state.position)
    .then((response) => {
      // eslint-disable-next-line
      response.map((resp) => {
        this.setState({
          authors: resp[0],
          title: resp[1],
          lyrics: resp[2], 
          description: resp[3],
          img: resp[4],
          spotify: resp[5]
        });
      });
    })
    .catch((err) => console.log(err))
    .then(() => this.setState({loading: false}))
  };

  // Render
  render () {
    let html_lyrics = this.state.lyrics
    let html_img = this.state.img
    let link = this.state.spotify
    return(
      <>
        <div className='main-wrapper'>
          <h1> { this.state.artist } </h1>   
          {this.state.loading ? <LinearProgress /> : 
            <>  
            <div class='sezione'>Artista </div>
            <div class='box1'> 
            <div class= 'img' dangerouslySetInnerHTML={{ __html: html_img }} />
            <div dangerouslySetInnerHTML={{ __html: this.state.description }} /></div>
            <div class='sezione'> Brano </div>
            <div class='box2'>
            <p><div class="insieme"><div></div><div class= 'title'><b> { this.state.title } </b></div><Button style={{
        borderRadius: 35,
        color: "white",
        backgroundColor: "#1DB954", 
        padding: "8px",
        float: "right",
        justifySelf: "end",
    }} size="small" startIcon={<PlayCircleOutlineIcon />} onClick={() =>  window.open(link, "_blank") }> <b>{this.state.title}</b> </Button></div></p>
            <p><div dangerouslySetInnerHTML={{ __html: html_lyrics }} class= 'lyrics'/></p>
            <p><Divider className='divider'/></p>
            <p><div> <b>Autori del brano: </b> { this.state.authors } </div></p>
            </div>
          </>
          }
        </div>
      </>
    );
  }
}