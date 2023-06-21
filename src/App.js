import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import About from './components/About';
import Contact from './components/Contact';
import Home from './components/Home';
import NavbarMain from './components/NavrbarMain';
import Retrive from './components/Retrive';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavbarMain />
        
        <div>
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/" element={<Home />} />
            <Route path="Retrive" element={<Retrive />}/>

          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
