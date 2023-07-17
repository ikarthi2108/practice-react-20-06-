import React from 'react';
import { Navigate,useLocation } from 'react-router-dom';
import { Authentication } from './Auth';

const PrivateUserElement = ({ children }) => {
    let location = useLocation();
    return Authentication.userAuthenticated ? (
      children
    ) : (
      <Navigate to="/SignIn" state={{ from: location }} />
    );
  };
  
 
export default PrivateUserElement