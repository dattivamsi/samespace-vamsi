import React from "react";

const Sidebar = ({ logo, profile }) => {
  return (
    <div className="sidebar">
      <div>
        <img src={logo} alt="logo" />
      </div>
      <div>
        <img src={profile} alt="profile" />
      </div>
    </div>
  );
};

export default Sidebar;
