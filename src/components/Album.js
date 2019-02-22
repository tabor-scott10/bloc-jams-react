import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';



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
      isPaused: false,
      currentlyHoveredSong: null
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
       this.setState({ isPlaying: false, isPaused: true });
     }

     setSong(song) {
       this.audioElement.src = song.audioSrc;
       this.setState({ currentSong: song});
     }

     handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    console.log('handleSongClick')
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
       if (!isSameSong) { this.setSong(song); }
      this.play();

    }
    this.setState({ isPaused: true})
  }

    handlePrevClick() {
      const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
      const newIndex = Math.max(0, currentIndex - 1);
      const newSong = this.state.album.songs[newIndex];
      this.setSong(newSong);
      this.play();
    }

    handleNextClick() {
      const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
      const newIndex = function (currentIndex) {
        if (currentIndex > this.state.album.songs.length) {
          return
        } else {
          return currentIndex + 1
        };
      }
      const newSong = this.state.album.songs[newIndex];
      this.setSong(newSong);
      this.play();

    }

    playButton(song) {
      console.log('playButton executed!')
    this.setState({ currentlyHoveredSong: song })
    }


    returnNumber(e) {
      console.log('returnNumber executed!')
      this.setState({ currentlyHoveredSong: null })
    }




  render() {
   const noSongActivity = !this.state.currentlyHoveredSong && !this.state.isPlaying && !this.state.isPaused;
   const hoveredNotPlaying = this.state.currentlyHoveredSong && !this.state.isPlaying;
   const hoveredPlaying = this.state.currentlyHoveredSong && this.state.isPlaying;
   const notHoveredPlaying = this.state.isPlaying && !this.state.currentlyHoveredSong;
   const isPlaying = hoveredPlaying || notHoveredPlaying
   const notHoveredPaused = !this.state.currentlyHoveredSong && !this.state.isPlaying && this.state.isPaused;
   const pauseButton = <td><i class="icon ion-md-pause"></i></td>;
   const playButton = <td><i class="icon ion-md-play"></i></td>;

      // <td>{index = 1 + index}</td> song number!

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
            this.state.album.songs.map( (song, index) => {
          const youHoverASong = this.state.currentlyHoveredSong === song
          const currentlyPlayingSong = this.state.currentSong === song
          const notTheHoveredSong = !this.state.currentlyHoveredSong === song
          return <div className="song-details">
            <tr className="song" key={ index } onClick={() => this.handleSongClick(song)} onMouseEnter={() => this.playButton(song)} onMouseLeave={(e) => this.returnNumber(e)}>

            { youHoverASong && !this.state.isPlaying ? playButton : <td>{index = 1 + index}</td> }





























































              <td>{song.title}</td>
              <td>{song.duration}</td>
            </tr>
          </div> }
        )}
          </tbody>
        </table>
        <PlayerBar isPlaying={this.state.isPlaying}
         currentSong={this.state.currentSong}
         handleSongClick={() => this.handleSongClick(this.state.currentSong)}
         handlePrevClick={() => this.handlePrevClick()}
         handleNextClick={() => this.handleNextClick()}
        />
     </section>
    );
  }
}


export default Album;
