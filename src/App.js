import React, { useState} from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Contact from './components/Contact';
import NavbarMain from './components/NavrbarMain';
import Retrive from './components/Retrive';
import Register from './components/Register';
import SignIn from './components/SignIn';
import PrivateElement from './components/PrivateRoute';
import Admin from './components/Admin';
import AppMain from './components/AppMain';
import PrivateUserElement from './components/PrivateUserEletment';
import ViewTask from './components/ViewTask';
import { Authentication } from './components/Auth';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleUserLogin = (user) => {
    setCurrentUser(user);
  };

  return (
    <BrowserRouter>
      <div>
        <NavbarMain />
        <div>
          <Routes>
            <Route path="/contact" element={<Contact />} />
            <Route path="Reports" element={<Retrive />} />
            <Route path="/Register" element={<Register />} />
            <Route
              path="/SignIn"
              element={<SignIn onUserLogin={handleUserLogin} />}
            />
            <Route
              path="/Admin"
              element={<Admin adminLogin={Authentication.adminLogin} />}
            />
            <Route
              path="/Viewtask"
              element={
                currentUser ? (
                  <ViewTask user={currentUser} />
                ) : (
                  <Navigate to="/SignIn" />
                )
              }
            />
            <Route
              path="/Todo"
              element={<PrivateElement><AppMain /></PrivateElement>}
            />
            <Route
              path="/Viewtask"
              element={<PrivateUserElement><ViewTask /></PrivateUserElement>}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
