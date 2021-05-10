import React from 'react';
import { Navbar } from 'react-bootstrap';
import Logo from '../images/logo.svg'

const NavBar = () => {
    return ( 
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">
                <img
                    alt=""
                    src={Logo}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />{' '}
      Disaster News
    </Navbar.Brand>
        </Navbar>
     );
}
 
export default NavBar;