import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import './productcardcss.css';
import axios from 'axios';
import { useParams } from "react-router-dom";
import ItemCard from './ItemCards/ItemCard';


const ProductCard = ({ token }) => {
  var { elguide } = useParams();
  const [data, setData] = useState([]);
  const url = process.env.REACT_APP_APIURL + "/product/elguide/" + elguide;
  console.log(data);
  console.log("tää");

  useEffect(() => {
    const config = {
      headers: {
        'Authorization': `Basic ${token}`
      }
    }
    axios.get(url, config)
      .then(res => {
        console.log(res.data);
        setData(res.data);
      })
      .catch()

  }, []);


  return (
    <div className='parent__div'>
      {data.map((data1) => {
        return (
          <div>
          <ItemCard itemData={data1} elguide={elguide} token={token}/>
          </div>
        )
      })}
    </div>
  )
}

export default ProductCard
