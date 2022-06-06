import React, { useState, useEffect } from 'react'
import { Button, ButtonGroup } from 'react-bootstrap';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import './inventory.css'


export const Inventory = () => {
    const [rack, setRack] = useState("");
    const [rackGap, setRackGap] = useState("");
    const [rackSpot, setRackSpot] = useState("");
    const [data, setData] = useState([]);
    const url = "https://warehouseapipower.herokuapp.com/product/all/";

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
            <div className='button__group__1'>
                <ButtonGroup aria-label="Basic example">
                    <Button variant="secondary" onClick={() => { setRack("A") }}>A</Button>
                    <Button variant="secondary" onClick={() => { setRack("B") }}>B</Button>
                    <Button variant="secondary" onClick={() => { setRack("C") }}>C</Button>
                    <Button variant="secondary" onClick={() => { setRack("D") }}>D</Button>
                </ButtonGroup>
            </div>
            <div className='button__group__2'>
                <ButtonGroup aria-label="Basic example">
                    <Button variant="secondary" onClick={() => { setRackGap("1") }}>1</Button>
                    <Button variant="secondary" onClick={() => { setRackGap("2") }}>2</Button>
                    <Button variant="secondary" onClick={() => { setRackGap("3") }}>3</Button>
                    <Button variant="secondary" onClick={() => { setRackGap("4") }}>4</Button>
                    <Button variant="secondary" onClick={() => { setRackGap("5") }}>5</Button>
                </ButtonGroup>
            </div>
            <div className='button__group__3'>
                <ButtonGroup aria-label="Basic example">
                    <Button variant="secondary" onClick={() => { setRackSpot("1") }}>1</Button>
                    <Button variant="secondary" onClick={() => { setRackSpot("2") }}>2</Button>
                    <Button variant="secondary" onClick={() => { setRackSpot("3") }}>3</Button>
                    <Button variant="secondary" onClick={() => { setRackSpot("4") }}>4</Button>
                    <Button variant="secondary" onClick={() => { setRackSpot("5") }}>5</Button>
                    <Button variant="secondary" onClick={() => { setRackSpot("6") }}>6</Button>
                    <Button variant="secondary" onClick={() => { setRackSpot("7") }}>7</Button>
                    <Button variant="secondary" onClick={() => { setRackSpot("8") }}>8</Button>
                </ButtonGroup>
            </div>
            <label >{rack + rackGap + rackSpot}</label>
            <div className='addItem'>
            <Button variant="secondary">Add Item</Button>
            </div>
            <div>
                {data.map((data1) => {
                    const data2 = rack + rackGap + rackSpot;
                    console.log(data1)
                    if( data1.rack=== rack + rackGap + rackSpot){
                        console.log("täällä");
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
                    )}
                })}
            </div>
        </div>
    )
}
