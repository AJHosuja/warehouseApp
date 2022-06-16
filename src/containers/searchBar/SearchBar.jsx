import React, { useState, useEffect } from "react";
import "./searchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import axios from 'axios';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

function SearchBar({ token }) {
  const [data , setData] = useState([]);
  const [filteredData, setFiltereData] = useState([]);
  const [wordGot, setWordGot] = useState("");

  useEffect(() => {
    const config = {
      headers: {
        'Authorization': `Basic ${token}`
      }
    }

    const url = process.env.REACT_APP_APIURL + '/product/';
    axios.get(url, config)
      .then(res => {
        setData(res.data);
      })
      .catch()
  })

  const clickHandler = (e) => {
    const searchWord = e.target.value;
    setWordGot(searchWord);
    const newFilter = data.filter((val) => {
      return val.elguideCode.toLowerCase().includes(searchWord.toLowerCase());
    })

    //console.log(newFilter);

    const uniqueArray = newFilter.filter((value, index) => {
      const _value = JSON.stringify(value);
      return index === newFilter.findIndex(obj => {
        return JSON.stringify(obj) === _value;
      });
    });

    console.log(uniqueArray);

    if (searchWord === "") {
      setFiltereData([]);
    } else {
      setFiltereData(uniqueArray);
    }
  }

  const clearSearch = () => {
    setFiltereData([]);
    setWordGot("");
  }

  return (
    <div className="search__searchbar">
      <div className="searchInputs__searchbar">
        <input type="text" placeholder="Search" value={wordGot} onChange={clickHandler} />
        <div className="searchIcon__searchbar">
          {wordGot.length === 0 ? (<SearchIcon />) : (<CloseIcon id="clearBtn" onClick={clearSearch} />)}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult__searchbar">
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