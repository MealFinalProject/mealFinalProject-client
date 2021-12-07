import React from "react";
import "./Searchbar.css";

const Searchbar = () => {
  return (
    <div className="Searchbar input-group flex-nowrap">
        <input type="text" className="form-control search-bar" aria-label="Search" aria-describedby="addon-wrapping" placeholder=" 🔍  search recipe"/>
    </div>
  );
};

export default Searchbar;
