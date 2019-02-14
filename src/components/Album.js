import React, { Component } from 'react';
import albumData from './../data/albums';



class Album extends Component {
  constructor(props) {
    super(props);

    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album: album,
      currentSong: album.songs[0],
      isPlaying: false,
      isHovered: false
     };

     this.audioElement = document.createElement('audio');
     this.audioElement.src = album.songs[0].audioSrc;

   }

     play() {
       this.audioElement.play();
       this.setState({ isPlaying: true });
     }

     pause() {
       this.audioElement.pause()
       this.setState({ isPlaying: false });
     }

     setSong(song) {
       this.audioElement.src = song.audioSrc;
       this.setState({ currentSong: song});
     }

     handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
       if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }


    playButton(e) {
      console.log('playButton executed!')
    this.setState({ isHovered: true })
    }


    returnNumber(e) {
      console.log('returnNumber executed!')
      this.setState({ isHovered: false })
    }




  render() {
    const isHovered = this.state.isHovered

    if (isHovered == true) {

        this.state.album.songs.map( (song, index) =>
      <div className="song-details">
        <tr className="song" key={index} onClick={() => this.handleSongClick(song)} onMouseEnter={(e) => this.playButton(e)} onMouseLeave={(e) => this.returnNumber(e)}>
          <td><i class="icon ion-md-play"></i></td>
          <td>{song.title}</td>
          <td>{song.duration}</td>

        </tr>
      </div>

    } else {

        this.state.album.songs.map( (song, index) =>
      <div className="song-details">
        <tr className="song" key={index} onClick={() => this.handleSongClick(song)} onMouseEnter={(e) => this.playButton(e)} onMouseLeave={(e) => this.returnNumber(e)}>
          <td>{index = 1 + index}</td>
          <td>{song.title}</td>
          <td>{song.duration}</td>

        </tr>
      </div>

    }
    return (
      <section className="album">
       <section id="album-info">
         <img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title}/>
         <div className="album-details">
           <h1 id="album-title">{this.state.album.title}</h1>
           <h2 className="artist">{this.state.album.artist}</h2>
           <div id="release-info">{this.state.album.releaseInfo}</div>
         </div>
       </section>
       <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody>
          {
            this.state.album.songs.map( (song, index) =>
          <div className="song-details">
            <tr className="song" key={index} onClick={() => this.handleSongClick(song)} onMouseEnter={(e) => this.playButton(e)} onMouseLeave={(e) => this.returnNumber(e)}>
              <td>{index = 1 + index}</td>
              <td>{song.title}</td>
              <td>{song.duration}</td>

            </tr>
          </div>
        )}
          </tbody>
        </table>
     </section>
    );
  }
}


export default Album;
