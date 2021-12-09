import React from "react";

import "./Searchbar.css";

// import { useState } from "react"


const Searchbar = (props) => {

  const { setSearchState } = props

  return (
    <div className="Searchbar input-group flex-nowrap">
        <input type="text" onChange={(event) => setSearchState(event.target.value)} className="form-control search-bar" aria-label="Search" aria-describedby="addon-wrapping" placeholder=" 🔍  search recipe"/>
    </div>
  );
};

export default Searchbar;
