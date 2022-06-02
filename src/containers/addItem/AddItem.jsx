import React, { useState } from 'react';
import './additem.css'

const AddItem = () => {
    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    console.log('täällä'); 
    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();
        console.log('pääsi');
        console.log(user);
        console.log(pass);
    };

    return(
        <div className='body'>
        <h1>Lisää tuote</h1>
            <form onSubmit={handleSubmit}>
                <div className='txt_field'>
                    <input type="text" 
                    onChange={e => setUser(e.target.value)}
                    required></input>
                    <span></span>
                    <label>Elguide Code</label>
                </div>
                <div className='txt_field'>
                    <input type="password" 
                    onChange={e => setPass(e.target.value)}
                    required></input>
                    <span></span>
                    <label>EAN</label>
                </div>
                <div className='txt_field'>
                    <input type="password" 
                    onChange={e => setPass(e.target.value)}
                    required></input>
                    <span></span>
                    <label>Hylly</label>
                </div>
                <input type="submit" 
                value="Lisää"
                onClick={() => {console.log('clicked') }}>
                </input>
            </form>
        </div>
    )

    }
export default AddItem