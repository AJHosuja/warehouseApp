import axios from "axios";
import React, { useEffect, useState } from "react";

import './additem.css'

const AddItem = ({ data }) => {
    const [filteredData, setFiltereData] = useState([]);
    const [elguide, setElguide] = useState("");
    const [ean, setEan] = useState("");
    const [rack, setRack] = useState("");

    const clickHandlerGuide = (e) => {
        const searchWord = e.target.value;
        setElguide(searchWord);
        const newFilter = data.filter((val) => {
            return val.elguide.toLowerCase().includes(searchWord.toLowerCase());
        })
        if (searchWord === "") {
            setFiltereData([]);
        } else {
            setFiltereData(newFilter);
        }
    }

    const clickHandlerRack = (e) => {
        setRack(e.target.value)
    }
    const dataClicked = (e) => {
        console.log(e)
        setElguide(e)

        filteredData.map((data) => {
            console.log(data.elguide)
            console.log(elguide)
            if (e === data.elguide) {
                setEan(data.ean)
            }
        })
        console.log(ean);
        setFiltereData([]);

    }

    const addIem = (e) => {
        e.preventDefault();
        const params = new URLSearchParams()
        params.append('elguideCode', elguide)
        params.append('rack', rack)
        params.append('updater', 'anvi05')

        

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        axios.post('https://warehouseapipower.herokuapp.com/product/', params, config)
            .then((result) => {
                console.log(result)
            })
            .catch((err) => {
                // Do somthing
            })
    }
    return (
        <div className='body'>
            <h1>Lisää tuote</h1>
            <form onSubmit={addIem}>
                <div className='txt_field'>
                    <input type="text"
                        onChange={clickHandlerGuide}
                        value={elguide}
                        required></input>
                    <span></span>
                    <label>Elguide Code</label>
                </div>
                {filteredData.length != 0 && (
                    <div className="dataResult">
                        {filteredData.slice(0, 20).map((result, key) => {
                            return (
                                <p onClick={() => dataClicked(result.elguide)}>
                                    {result.elguide}
                                </p>
                            )
                        })}
                    </div>
                )}
                <div className='txt_field'>
                    <input type="text"
                        value={ean}
                        required></input>
                    <span></span>
                    <label>EAN</label>
                </div>
                <div className='txt_field'>
                    <input type="text"
                        value={rack}
                        onChange={clickHandlerRack}
                        required></input>
                    <span></span>
                    <label>Hylly</label>
                </div>
                <input type="submit"
                    value="Lisää"
                >
                </input>
            </form>
        </div>
    )

}
export default AddItem