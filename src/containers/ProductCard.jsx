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


{/*<Card sx={{ minWidth: 275, justifyContent: 'center', textAlign: 'center', marginTop: '1rem' }}>
            <p>ean <strong>{data1.productEAN}</strong></p>
            <p>elguide: <strong>{data1.elguideCode}</strong></p>
            
            {!updateRack ?
              <p>Hylly: <strong>{data1.rack}</strong></p>
              : <p>uusi hylly: <input type="text" style={{width: "80px"}} />
                <Button onClick={() => changeRack(data1.id)} size="small">Päivitä</Button></p>}

            <p>Lisääjä: <strong>{data1.updater}</strong></p>
            <CardActions className='card__buttons'>
              <Button onClick={() => deleteItem(data1.id)} size="small">Poista</Button>
              {!updateRack ?
              <Button onClick={() => setUpdateRack(!updateRack)} size="small">Vaihda hyllyä</Button>
              : 
              <Button onClick={() => setUpdateRack(!updateRack)} size="small">Peruuta</Button>
              }
            </CardActions>
          </Card>*/}