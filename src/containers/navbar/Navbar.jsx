import React, { useState } from 'react';
import {
    CCollapse, CNavbar, CNavbarToggler, CContainer, CNavbarBrand, CNavbarNav, CNavItem,
    CNavLink
} from '@coreui/react';
import {
    BrowserRouter as Router,
    Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import './navbar.css'
import Button from '@mui/material/Button';



const Navbar = ({ setLogged }) => {
    const [visible, setVisible] = useState(false)

    const logOut = () => {
        setLogged(false);
        localStorage.removeItem("userID")
        localStorage.removeItem("token")
        localStorage.removeItem("userName")
    }

    return (
        <>
            <CNavbar expand="lg" colorScheme="light" className="bg-light">
                <CContainer fluid>
                    <CNavbarBrand href="/">WareHouse-APP</CNavbarBrand>
                    <CNavbarToggler onClick={() => setVisible(!visible)} />
                    <CCollapse className="navbar-collapse" visible={visible}>
                        <CNavbarNav>
                            <CNavItem>
                                <CNavLink active>
                                    <Link to="/" activeClassName="active" style={{ textDecoration: 'none', color: "black" }} onClick={() => setVisible(!visible)}>Koti</Link>
                                </CNavLink>
                            </CNavItem>
                            <CNavLink active>
                                <Link to="/additem" activeClassName="active" style={{ textDecoration: 'none', color: "black" }} onClick={() => setVisible(!visible)}>Lisää tuote</Link>
                            </CNavLink>
                            <CNavLink active>
                                <Link to="/inventory" activeClassName="active" style={{ textDecoration: 'none', color: "black" }} onClick={() => setVisible(!visible)}>Inventoi</Link>
                            </CNavLink>
                            <div className='log__out'>
                                <Button variant="contained" onClick={logOut}>Kirjaudu ulos</Button>
                            </div>
                        </CNavbarNav>
                    </CCollapse>
                </CContainer>
            </CNavbar>
        </>
    )
}

export default Navbar