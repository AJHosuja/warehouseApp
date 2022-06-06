import React, { useState, useEffect } from 'react';
import './App.css';
import './containers/ProductCard'
import ProductCard from './containers/ProductCard';
import SearchBar from './containers/searchBar/SearchBar';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddItem from './containers/addItem/AddItem';
import Navbar from './containers/navbar/Navbar';
//"start": "node server/server.js",

function App() {
  const [data, setData] = useState([]);
  const [eanElguideData, setEanElguideData] = useState([]);

  useEffect(() => {
    axios.get('https://warehouseapipower.herokuapp.com/product/')
      .then(res => {
        console.log(res.data);
        setData(res.data);
      })
      .catch()
      axios.get('https://warehouseapipower.herokuapp.com/product/eanelguide')
      .then(res => {
        console.log(res.data);
        setEanElguideData(res.data);
      })
      .catch()

  });
  return (
    <Router>
      <div className="App">
        <Navbar />
        {/*  */}
        <Routes>
            <Route path="/" element={
            <SearchBar data={data} />
            } />
            <Route path="/elguide/:elguide" element={<ProductCard />} />
            <Route path="/additem" element={<AddItem data={eanElguideData}/>} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
