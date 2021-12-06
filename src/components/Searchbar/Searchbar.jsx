import React from "react";
import "./Searchbar.css";

const Searchbar = () => {
  return (
    <div class="input-group flex-nowrap">
        <span class="input-group-text" id="addon-wrapping">Search</span>
        <input type="text" class="form-control" aria-label="Search" aria-describedby="addon-wrapping"/>
    </div>
  );
};

export default Searchbar;
