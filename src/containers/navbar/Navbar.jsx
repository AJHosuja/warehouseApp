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

const Navbar = () => {
    const [visible, setVisible] = useState(false)
    return (
        <>
            <CNavbar expand="lg" colorScheme="light" className="bg-light">
                <CContainer fluid>
                    <CNavbarBrand href="#">WareHouse-APP</CNavbarBrand>
                    <CNavbarToggler onClick={() => setVisible(!visible)} />
                    <CCollapse className="navbar-collapse" visible={visible}>
                        <CNavbarNav>
                            <CNavItem>
                                <CNavLink active>
                                    <Link to="/" activeClassName="active" style={{ textDecoration: 'none' ,color: "black"  }}>Koti</Link>
                                </CNavLink>
                            </CNavItem>
                            <CNavLink active>
                            <Link to="/additem" activeClassName="active" style={{ textDecoration: 'none'  ,color: "black" }}>Lisää tuote</Link>
                            </CNavLink>
                            <CNavLink active>
                            <Link to="/additem" activeClassName="active" style={{ textDecoration: 'none' ,color: "black" }}>Inventoi</Link>
                            </CNavLink>
                        </CNavbarNav>

                    </CCollapse>
                </CContainer>
            </CNavbar>
        </>
    )
}

export default Navbar