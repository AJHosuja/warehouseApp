import React, { useState, useEffect } from "react";
import "./App.css";
import "./containers/ProductCard";
import ProductCard from "./containers/ProductCard";
import SearchBar from "./containers/searchBar/SearchBar";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddItem from "./containers/addItem/AddItem";
import Navbar from "./containers/navbar/Navbar";
import { Inventory } from "./containers/inventory/Inventory";
import Login from "./containers/login/Login";
//"start": "node server/server.js",
//https://warehouseapipower.herokuapp.com
function App() {
  const [logged, setLogged] = useState(false);

  const userIDStored = localStorage.getItem("userID");
  const tokenStored = localStorage.getItem("token");
  const userNameStored = localStorage.getItem("userName");

  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (tokenStored && userNameStored && userIDStored) {
      const config = {
        headers: {
          Authorization: `Basic ${tokenStored}`,
        },
      };

      const tokenCheckURL =
        process.env.REACT_APP_APIURL + "/token/" + userNameStored;
      axios
        .get(tokenCheckURL, config)
        .then((res) => {
          if (res.data.success) {
            console.log(res);
            setLogged(true);
            setUserName(userNameStored);
          }
        })
        .catch((err) => {
          setLogged(false);
          localStorage.removeItem("userID");
          localStorage.removeItem("token");
          localStorage.removeItem("userName");
        });
    }
  });

  return (
    <Router>
      <div className="App">
        {logged ? (
          <div>
            <Navbar setLogged={setLogged} />
            <Routes>
              <Route
                path="/"
                element={
                  <div>
                    <SearchBar token={tokenStored} />
                  </div>
                }
              />
              <Route
                path="/elguide/:elguide"
                element={<ProductCard token={tokenStored} />}
              />
              <Route
                path="/additem"
                element={
                  <AddItem userID={userNameStored} token={tokenStored} />
                }
              />
              <Route
                path="/inventory"
                element={
                  <Inventory token={tokenStored} userName={userNameStored} />
                }
              />
            </Routes>
          </div>
        ) : (
          <Login setLogged={setLogged} />
        )}
      </div>
    </Router>
  );
}

export default App;
