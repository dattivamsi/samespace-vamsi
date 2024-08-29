import React, { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import logo from './assets/Logo.svg';
import Frame from './assets/Frame.svg';
import profile from "./assets/Profile.svg";
import ListItem from "./components/List";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import SearchBar from "./components/SearchBar";
import MediaPlayer from "./components/MediaPlayer";

const TABS = {
  for_you: "for_you",
  top_tracks: "top_tracks",
};

const Homepage = () => {
  const [songsData, setSongsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSong, setSelectedSong] = useState({});
  const [activeTab, setActiveTab] = useState(TABS.for_you);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [showList, setShowList] = useState(true);

  useEffect(() => {
    fetchSongsData();
  }, []);

  useEffect(() => {
    if (!loading) {
      setFilteredData(songsData);
      setActiveTab(TABS.for_you);
    }
  }, [loading, songsData]);

  useEffect(() => {
    if (activeTab === TABS.top_tracks) {
      const topTracks = songsData.filter((item) => item.top_track === true);
      setFilteredData(topTracks);
    } else if (activeTab === TABS.for_you) {
      setFilteredData(songsData);
    }
  }, [activeTab, songsData]);

  const fetchSongsData = async () => {
    try {
      const response = await fetch("https://cms.samespace.com/items/songs");
      const result = await response.json();
      setSongsData(result.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching songs:", error);
      setLoading(false);
    }
  };

  function handleNext(data) {
    const currentIndex = filteredData.findIndex((item) => item.id === data.id);
    setSelectedSong(filteredData[(currentIndex + 1) % filteredData.length]);
  }

  function handlePrev(data) {
    const currentIndex = filteredData.findIndex((item) => item.id === data.id);
    setSelectedSong(
      filteredData[
        (currentIndex - 1 + filteredData.length) % filteredData.length
      ]
    );
  }

  function handleSearch(value) {
    setSearchValue(value.toLowerCase());
  }

  return (
    <div
      className="homepage"
      style={{
        background: `linear-gradient(108deg, ${selectedSong.accent}, rgba(0, 0, 0, 0.60) 99.84%), #000`,
      }}
    >
      <Sidebar logo={logo} profile={profile} />
      <div className="show_list" onClick={() => setShowList(!showList)}>
        {!showList ? "Show List" : "Hide List"}
      </div>
      <div className={showList ? "middle" : "middle display_none"}>
        <Topbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchBar searchValue={searchValue} handleSearch={handleSearch} frame={Frame} />
        <div className="list_item_container">
          {filteredData
            ?.filter(
              (data) =>
                data.name.toLowerCase().includes(searchValue) ||
                data.artist.toLowerCase().includes(searchValue)
            )
            .map((item, index) => {
              return (
                <ListItem
                  icon={item.cover}
                  artist={item.artist}
                  name={item.name}
                  data={item}
                  selectedSong={selectedSong}
                  setSelectedSong={(value) => setSelectedSong(value)}
                  key={index}
                />
              );
            })}
        </div>
      </div>
      {selectedSong && Object.keys(selectedSong).length > 0 && (
        <MediaPlayer
          selectedSong={selectedSong}
          showList={showList}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      )}
    </div>
  );
};

export default Homepage;
