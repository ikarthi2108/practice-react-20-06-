import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
 
  return (
    
    <BrowserRouter>
      <div >
        <NavbarMain />
        <div>
          <Routes>
            <Route path="/contact" element={<Contact />} />
            <Route path="Reports" element={<Retrive />}/>
            <Route path='/Register' element={<Register/>}/>
            {/* <Route path="/SignIn" element={<SignIn />} />
            <Route path='/Admin' element={<Admin/>} /> */}
            <Route path='/Todo'  element={<PrivateElement><AppMain /></PrivateElement>}/>
            <Route path='/Viewtask' element={<PrivateUserElement><ViewTask /></PrivateUserElement>}/>
            <Route path="/SignIn" element={<SignIn userLogin={Authentication.userLogin} />} />
            <Route path="/Admin" element={<Admin adminLogin={Authentication.adminLogin} />} />

 

          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
