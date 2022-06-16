import React, { useState, useEffect } from 'react';
import './App.css';
import './containers/ProductCard'
import ProductCard from './containers/ProductCard';
import SearchBar from './containers/searchBar/SearchBar';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddItem from './containers/addItem/AddItem';
import Navbar from './containers/navbar/Navbar';
import { Inventory } from './containers/inventory/Inventory';
import Login from './containers/login/Login';
//"start": "node server/server.js",
//https://warehouseapipower.herokuapp.com
function App() {
  const [data, setData] = useState([]);
  const [eanElguideData, setEanElguideData] = useState([]);
  const [logged, setLogged] = useState(false);

  const userIDStored = localStorage.getItem("userID")
  const tokenStored = localStorage.getItem("token")
  const userNameStored = localStorage.getItem("userName")

  const [userName, setUserName] = useState("");

  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(() => {

    if (tokenStored && userNameStored && userIDStored) {
      setLogged(true);
      setUserName(userNameStored);
    }

    const config = {
      headers: {
        'Authorization': `Basic ${tokenStored}`
      }
    }

    const url = process.env.REACT_APP_APIURL + '/product/';
    axios.get(url, config)
      .then(res => {
        setData(res.data);
      })
      .catch()

    const urlRequest2 = process.env.REACT_APP_APIURL + '/product/eanelguide'
    axios.get(urlRequest2, config)
      .then(res => {
        setEanElguideData(res.data);
      })
      .catch()

  });
  return (
    <Router>
      <div className="App">
        {logged ?
          <div>
            <Navbar setLogged={setLogged} />
            <Routes>
              <Route path="/" element={
                <div>
                  <SearchBar data={data} />

                </div>
              } />
              <Route path="/elguide/:elguide" element={<ProductCard token={tokenStored} />} />
              <Route path="/additem" element={<AddItem data={eanElguideData} userID={userNameStored} token={tokenStored} />} />
              <Route path="/inventory" element={<Inventory token={tokenStored}/>} />
            </Routes>
          </div> : <Login setLogged={setLogged} />}
      </div>
    </Router>
  );
}

export default App;
