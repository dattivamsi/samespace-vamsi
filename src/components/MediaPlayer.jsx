import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const MediaPlayer = ({ selectedSong, showList, handleNext, handlePrev }) => {
  return (
    <div className={showList ? "media-player display_none" : "media-player"}>
      <div className="played_songs_details">
        <div className="song_played">{selectedSong.name}</div>
        <div className="artist_played">{selectedSong.artist}</div>
      </div>
      <div className="cover_art_container">
        <img
          src={`https://cms.samespace.com/assets/${selectedSong.cover}`}
          alt={selectedSong.name}
          className="cover_art"
        />
      </div>
      <AudioPlayer
        autoPlay
        src={selectedSong.url}
        showDownloadProgress={false}
        showSkipControls={true}
        showJumpControls={false}
        onClickNext={() => handleNext(selectedSong)}
        onClickPrevious={() => handlePrev(selectedSong)}
        onEnded={() => handleNext(selectedSong)}
      />
    </div>
  );
};

export default MediaPlayer;
