import React from 'react';
import { Navigate,useLocation } from 'react-router-dom';
import { Authentication } from './Auth';

const PrivateElement = ({ children }) => {
  let location = useLocation();
  return Authentication.adminAuthenticated ? (
    children
  ) : (
    <Navigate to="/Admin" state={{ from: location }} />
  );
};
 
export default PrivateElement