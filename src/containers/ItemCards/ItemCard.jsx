import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import './../productcardcss.css';
import axios from 'axios';
import { useAlert } from "react-alert"

const ItemCard = ({ itemData, elguide, token }) => {
  const alert = useAlert();
  const [updateRack, setUpdateRack] = useState(false);
  const [newRackValue, setNewRackValue] = useState("");
  const url =  process.env.REACT_APP_APIURL + "/product/elguide/" + elguide;
  const [data, setData] = useState(itemData);


  function deleteItem(id) {
    console.log(id);
    const config = {
      headers: {
        'Authorization': `Basic ${token}`
      }
    }

    const deleteUrl = process.env.REACT_APP_APIURL + "/product/" + id;
    axios.delete(deleteUrl, config)
      .then(res => {
        window.location.reload(false);
      })
      .catch()

  }

  function changeRack(id) {
    const params = new URLSearchParams()
    params.append('newRack', newRackValue)
    params.append('id', id)

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${token}`
      }
    }
    const changeRackUrl = process.env.REACT_APP_APIURL + "/product/updateRack";
    axios.post(changeRackUrl, params, config)
        .then((result) => {
            console.log(result)
            alert.show("Onnistui");
            setUpdateRack(false);
            data.rack = newRackValue;
            setData(data);     
        })
        .catch((err) => {
            alert.show("Epäonnistui");
            })
  }
  return (
    <Card sx={{ minWidth: 275, justifyContent: 'center', textAlign: 'center', marginTop: '1rem' }}>
      <p>ean <strong>{data.productEAN}</strong></p>
      <p>elguide: <strong>{data.elguideCode}</strong></p>

      {!updateRack ?
        <p>Hylly: <strong>{data.rack}</strong></p>
        : <p>uusi hylly: <input type="text" style={{ width: "80px" }} value={newRackValue} onChange={(e) => setNewRackValue(e.target.value) } />
          <Button onClick={() => changeRack(data.id)} size="small">Päivitä</Button></p>}

      <p>Lisääjä: <strong>{data.updater}</strong></p>
      <CardActions className='card__buttons'>
        <Button onClick={() => deleteItem(data.id)} size="small">Poista</Button>
        {!updateRack ?
          <Button onClick={() => setUpdateRack(!updateRack)} size="small">Vaihda hyllyä</Button>
          :
          <Button onClick={() => setUpdateRack(!updateRack)} size="small">Peruuta</Button>
        }
      </CardActions>
    </Card>

  )
}

export default ItemCard
