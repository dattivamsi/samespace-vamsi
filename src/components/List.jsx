import React from "react";

const ListItem = ({ icon, artist, name, data, selectedSong, setSelectedSong }) => {
  return (
    <div onClick={() => setSelectedSong(data)} className={`list_item ${selectedSong.name === name ? 'selected' : ''}`}>
      <div><img src={`https://cms.samespace.com/assets/${icon}`} alt={name} width={48} height={48} /></div>
      <div>
        <div className="song_name">{name}</div>
        <div className="artist_name">{artist}</div>
      </div>
    </div>
  );
};

export default ListItem;
