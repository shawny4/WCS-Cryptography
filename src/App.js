import './App.css';

import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom';
import logo from './images/wcs_logo_transparent_background2.png'
import React, { useState, useEffect } from 'react';

import animationData from './wired-gradient-27-globe (1).json';
import Lottie from 'react-lottie';


import Duck from './Duck';

import Shawn from './Pages/Shawn';
import Vanson from './Pages/Vanson';
import Web from './Pages/Web';
import Home from './Home';
import Alex from './Pages/Alex';
function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000); // Adjust time as needed

    return () => clearTimeout(timer);
  }, );

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  
  return (
    <BrowserRouter>
      {isLoading && (
      <div className="loading-overlay">
        <Lottie options={defaultOptions} height={300} width={300} />
      </div>
    )}

    
      <div className={`App ${isLoading ? 'is-blurred' : ''}`}>
        <header className="App-header">
          <img src={logo} alt="Logo"  className="App-logo"/>
            <nav>
              <NavLink to ="idkLol"> uhhhhh</NavLink>

            

              <NavLink to="Shawn">Shawn</NavLink>
              <NavLink to="Vanson">Vanson</NavLink>

            
              <NavLink to="Web"> Web</NavLink>

              <NavLink to="Alex">Alex</NavLink>

              <NavLink to="/">Home</NavLink>

              
              
            </nav>
          </header>
          
          <main>
          
          <div className="content">
              
          
            
            
            <Routes>
              
            <Route path="/" element={<Home />} />

              <Route path="/idkLol" element={<Duck/>}/>
            
              <Route path="Web" element={<Web/>} />


              <Route path="Shawn" element={<Shawn/>} />
              <Route path="Vanson" element={<Vanson/>}/>

              <Route path="Alex" element= {<Alex/>}/>

            </Routes> 
            
          </div>
          </main> 
        </div>
      
      </BrowserRouter> 
  );
}


export default App;
