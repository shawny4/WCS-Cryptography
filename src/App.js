import './App.css';
import {BrowserRouter, Routes, Route, NavLink} from 'react-router-dom';
import logo from './images/wcs_logo_transparent_background2.png'
import Shawn from './Pages/Shawn-BlockCipher';
import Vanson from './Pages/Vanson';
import BlockChainAndRNG from './Pages/Web';
import Home from './Home'
import animationData from './wired-gradient-27-globe (1).json';
import Lottie from 'react-lottie';
import Alex from './Pages/Alex'

import Duck from './Duck';
import React, { useState, useEffect } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000); // Adjust time as needed

    return () => clearTimeout(timer);
  }, []);

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

            

              <NavLink to="Shawn-blockCipher">Shawn Yuen</NavLink>
              <NavLink to="Vanson-cipher">Vanson</NavLink>

            
              <NavLink to="Web-block"> Web</NavLink>

              <NavLink to="Alex-cipher">Alex</NavLink>

              <NavLink to="/">Home</NavLink>

              
              
            </nav>
          </header>
          
          <main>
          
          <div className="content">
              
          
            
            
            <Routes>
              
            <Route path="/" element={<Home />} />

              <Route path="/idkLol" element={<Duck/>}/>
            
              <Route path="Web-block" element={<BlockChainAndRNG/>} />


              <Route path="Shawn-blockCipher" element={<Shawn/>} />
              <Route path="Vanson-cipher" element={<Vanson/>}/>

              <Route path="Alex-cipher" element= {<Alex/>}/>

            </Routes> 
            
          </div>
          </main> 
        </div>
      )}
      </BrowserRouter> 
  );
}


export default App;
