import React, { useState } from "react";
import "./searchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

function SearchBar({ data }) {
  const [filteredData, setFiltereData] = useState([]);
  const [wordGot, setWordGot] = useState("");

  const clickHandler = (e) => {
    const searchWord = e.target.value;
    setWordGot(searchWord);
    const newFilter = data.filter((val) => {
      return val.elguideCode.toLowerCase().includes(searchWord.toLowerCase());
    })
    if (searchWord === "") {
      setFiltereData([]);
    } else {
      setFiltereData(newFilter);
    }
  }

  const clearSearch = () => {
    setFiltereData([]);
    setWordGot("");
  }

  return (
    <div className="search">
      <div className="searchInputs">
        <input type="text" placeholder="Search" value={wordGot} onChange={clickHandler} />
        <div className="searchIcon">
          {wordGot.length === 0 ? (<SearchIcon />) : (<CloseIcon id="clearBtn" onClick={clearSearch} />)}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.map((result, key) => {
            return (
              <p>
              <Link to={`/elguide/${result.elguideCode}`} activeClassName="active" style={{ textDecoration: 'none', color: "black" }}>{result.elguideCode}</Link>
              </p>
            )
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;