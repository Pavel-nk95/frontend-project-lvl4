import React from 'react';
import './HomePage.css';
import { Navigate } from 'react-router-dom';

function HomePage() {
  const shouldRedirect = true;

  return <>{shouldRedirect && <Navigate replace to="/login" />}</>;
}

export default HomePage;
