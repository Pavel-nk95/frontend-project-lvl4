import React from 'react';
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBContainer,
  MDBBtn,
} from 'mdb-react-ui-kit';

import { useAuth } from '../../hooks/index.js';
import './Header.css';

function Header() {
  const { logOut, user } = useAuth();
  return (
    <MDBNavbar light bgColor="light">
      <MDBContainer breakpoint="lg">
        <MDBNavbarBrand tag="span" className="mb-0 h1">
          Hexlet Chat
        </MDBNavbarBrand>
        {console.log(user)}
        {!!user && (
          <MDBBtn onClick={() => logOut()} color="primary">
            Выйти
          </MDBBtn>
        )}
      </MDBContainer>
    </MDBNavbar>
  );
}

export default Header;
