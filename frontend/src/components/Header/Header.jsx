import React from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBContainer,
  MDBBtn,
} from 'mdb-react-ui-kit';
import './Header.css';

function Header() {
    return (
      <MDBNavbar light bgColor='light'>
        <MDBContainer breakpoint="lg">
          <MDBNavbarBrand tag="span" className='mb-0 h1'>Hexlet Chat</MDBNavbarBrand>
          <MDBBtn color='primary'>Выйти</MDBBtn>
        </MDBContainer>
      </MDBNavbar>
      );
  }

export default Header;