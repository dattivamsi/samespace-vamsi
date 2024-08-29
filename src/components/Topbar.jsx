import React from "react";

const TABS = {
  for_you: "for_you",
  top_tracks: "top_tracks",
};

const Topbar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="topbar">
      <div
        onClick={() => setActiveTab(TABS.for_you)}
        className={`for_you ${
          activeTab === TABS.for_you ? "" : "not_selected"
        }`}
      >
        For You
      </div>
      <div
        onClick={() => setActiveTab(TABS.top_tracks)}
        className={`top_tracks ${
          activeTab === TABS.top_tracks ? "" : "not_selected"
        }`}
      >
        Top Tracks
      </div>
    </div>
  );
};

export default Topbar;
