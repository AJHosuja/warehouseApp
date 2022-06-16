import React, { useState } from 'react'
import './login.css'
import axios from 'axios';
import { useAlert } from "react-alert"


const Login = ({ setLogged }) => {

    const [user, setUser] = useState("");
    const [pass, setPass] = useState("");
    const alert = useAlert();

    const handleSubmit = (event) => {
        event.preventDefault();

        const params = new URLSearchParams()
        params.append('user', user)
        params.append('password', pass)
        
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        const loginURL = process.env.REACT_APP_APIURL + "/login";
        console.log(loginURL)
        axios.post(loginURL, params, config)
        .then((result) => {
            console.log(result.data)
            if(result.data=="false"){
                alert.show("Väärä salasana");
            }  else if(result.data.token.length > 10) {
                setLogged(true);
                localStorage.setItem("token", result.data.token)
                localStorage.setItem("userID", result.data.userID)
                localStorage.setItem("userName", result.data.userName)
            }
            
            })
            .catch((err) => {
                console.log(err)
                alert.show("Väärä käyttäjätunnus tai salasana yritä uudelleen");
            })
    };

    return(
        <div className='body'>
        <h1>Kirjaudu</h1>
            <form onSubmit={handleSubmit}>
                <div className='txt_field'>
                    <input type="text" 
                    onChange={e => setUser(e.target.value)}
                    required></input>
                    <span></span>
                    <label>Username</label>
                </div>
                <div className='txt_field'>
                    <input type="password" 
                    onChange={e => setPass(e.target.value)}
                    required></input>
                    <span></span>
                    <label>Password</label>
                </div>
                <input type="submit" 
                value="Kirjaudu"
                >
                </input>
            </form>
        </div>
    )
}

export default Login