import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import './productcardcss.css';
import axios from 'axios';
import { useParams } from "react-router-dom";


const ProductCard = () => {
  var { elguide } = useParams();
  const [data, setData] = useState([]);
  const url = "https://warehouseapipower.herokuapp.com/product/elguide/" + elguide;

  useEffect(() => {
    console.log(url)
    axios.get(url)
      .then(res => {
        console.log(res.data);
        setData(res.data);
      })
      .catch()

  }, []);

  function deleteItem(id) {
    console.log(id);
    const deleteUrl = 'https://warehouseapipower.herokuapp.com/product/' + id;
    axios.delete(deleteUrl)
      .then(res => {
        console.log(res.data);
        axios.get(url)
          .then(res => {
            console.log(res.data);
            setData(res.data);
          })
          .catch()
      })
      .catch()

  }

  return (
    <div className='parent__div'>
      {data?.map((data1) => {
        return (
          <Card sx={{ minWidth: 275, justifyContent: 'center', textAlign: 'center', marginTop: '1rem' }}>
            <p>ean <strong>{data1.productEAN}</strong></p>
            <p>elguide: <strong>{data1.elguideCode}</strong></p>
            <p>Hylly: <strong>{data1.rack}</strong></p>
            <p>Lisääjä: <strong>{data1.updater}</strong></p>
            <CardActions>
              <Button onClick={() => deleteItem(data1.id)} size="small">Delete</Button>
            </CardActions>
          </Card>
        )
      })}
    </div>
  )
}

export default ProductCard