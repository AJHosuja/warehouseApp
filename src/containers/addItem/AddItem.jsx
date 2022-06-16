import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert"
import axios from 'axios';
import './additem.css'

const AddItem = ({ userID, token, ChangeRack }) => {
    const [filteredData, setFiltereData] = useState([]);
    const [elguide, setElguide] = useState("");
    const [ean, setEan] = useState("");
    const [rack, setRack] = useState(ChangeRack);
    const [data, setData] = useState([]);
    const alert = useAlert();

    useEffect(() => {
        const config = {
            headers: {
                'Authorization': `Basic ${token}`
            }
        }

        const urlRequest = process.env.REACT_APP_APIURL + '/product/eanelguide'
        axios.get(urlRequest, config)
            .then(res => {
                setData(res.data);
            })
            .catch()
    })


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

    const clickHandlerEan = (e) => {
        setEan(e.target.value)
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
        params.append('productEAN', ean)
        params.append('rack', rack)
        params.append('updater', userID)

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${token}`
            }
        }

        const addItemURL = process.env.REACT_APP_APIURL + '/product/';
        axios.post(addItemURL, params, config)
            .then((result) => {
                console.log(result)
                alert.show("Onnistui");
            })
            .catch((err) => {
                console.log(err)
                alert.show("Epäonnistui");
            })
    }
    return (
        <div className="additem__parent__div">
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
                    <div className="dataResult__add__item">
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
                        onChange={clickHandlerEan}
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