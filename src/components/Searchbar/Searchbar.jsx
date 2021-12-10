import React from "react";
import { Link } from "react-router-dom";
import "./Searchbar.css";

const Searchbar = (props) => {
  const { searchState, setSearchState } = props;
  return (
    <div className="Searchbar row flex-wrap m-0">
      <div className="input-group col-12">
        <input
          type="text"
          onChange={(event) => setSearchState(event.target.value)}
          className="form-control search-bar"
          aria-label="Search"
          aria-describedby="addon-wrapping"
          placeholder=" Search recipe..."
        />
        <Link
          className="input-group-text search-button"
          to={`/search/results/${searchState}`}
        >
          <span id="basic-addon2">
            <i className="bi bi-search"></i>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Searchbar;
