import React, { useState, useEffect } from 'react';
import './App.css';
import './containers/ProductCard'
import ProductCard from './containers/ProductCard';
import SearchBar from './containers/searchBar/SearchBar';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddItem from './containers/addItem/AddItem';
import Navbar from './containers/navbar/Navbar';

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get('https://warehouseapipower.herokuapp.com/product/')
      .then(res => {
        console.log(res.data);
        setData(res.data);
      })
      .catch()

  }, []);
  return (
    <Router>
      <div className="App">
        <Navbar />
        {/*  */}
        <Routes>
            <Route path="/" element={
            <div>
            <SearchBar data={data} />
            </div>
            } />
            <Route path="/elguide/:elguide" element={<ProductCard />} />
            <Route path="/additem" element={<AddItem/>} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;
