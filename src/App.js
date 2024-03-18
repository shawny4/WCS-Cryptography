import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import LoadingScreen from './LoadingScreen'; // Ensure this component is correctly implemented
import Home from './Home'; // Your Home component
import Shawn from './Pages/Shawn';// Other components
import Vanson from './Pages/Vanson';
import Web from './Pages/Web';
import Alex from './Pages/Alex';
import Sanvid from './Pages/Sanvid';
import Mollo from './Pages/Mollo';
import Dominik from './Pages/Dominik';
import CeasarCipher from './crypto';

import './App.css'; // Ensure your styles are correctly applied

// Assuming logo is correctly imported or defined elsewhere in your project
import logo from './images/wcs_logo_transparent_background2.png';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  // Add a new state to track if the animation should start
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    // Delay setting startAnimation to true to ensure it only happens once and after loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      setStartAnimation(true); // Trigger animation after loading is done
    }, 1500); // Loading time

    return () => clearTimeout(timer);
  }, []);
 
  return (
    <BrowserRouter>
      <div className="App">
        {/* Keep loading screen in DOM but hide it to allow CSS transition */}
        <LoadingScreen isVisible={isLoading} /> {/* Pass isLoading as isVisible */}
        {/* Conditional rendering based on isContentVisible */}
        {!isLoading && (
          <>
            <header className={`App-header ${startAnimation ? 'fade-in' : ''}`}>
              <img src={logo} className={`App-logo ${startAnimation ? 'fade-in' : ''}`} alt="Logo" />
              <nav>
                <NavLink to="/Vanya">Vanya</NavLink>
                <NavLink to="/Vanson">Vanson</NavLink>
                <NavLink to="/Shawn">Shawn</NavLink>
                <NavLink to="/Web">Web</NavLink>
                <NavLink to="/Alex">Alex</NavLink>

                <NavLink to="/Sanvid">Sanvid</NavLink>
                <NavLink to="/Mollo">Mollo</NavLink>
                <NavLink to="/Dominik">Dominik</NavLink>

                <NavLink to="/">Home</NavLink>
              </nav>
            </header>
            <main>
              <div className="content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  {/* Other routes */}
                  <Route path="/Web" element={<Web />} />
                  <Route path="/Shawn" element={<Shawn />} />
                  <Route path="/Vanson" element={<Vanson />} />
                  <Route path="/Vanya" element={<CeasarCipher />} />
                  <Route path="/Alex" element={<Alex />} />
                  <Route path="/Sanvid" element={<Sanvid />} />
                  <Route path="/Mollo" element={<Mollo />} />
                  <Route path="/Dominik" element={<Dominik />} />
                </Routes>
              </div>
            </main>
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;