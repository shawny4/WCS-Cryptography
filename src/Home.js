import React, { useState, useEffect } from 'react';
import './Home.css';
import SmallerTitleSection from './SmallerTitleSection';

const Home = ({ isLoaded }) => {
  // State to track if the user has scrolled down
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up function to remove the event listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`home-content ${hasScrolled ? 'scrolled' : ''} ${isLoaded ? 'show' : ''}`} style={{ minHeight: '140vh' }}>
      <h1 id="home-title">
        <span className="home-line">Understanding</span>
        <span className="home-line">Cryptography</span>
        <span className="home-line">With WCS</span>
      </h1>
      {/* Place SmallerTitleSection outside of .home-content if .home-content is fixed or absolute positioned */}
      {hasScrolled && <SmallerTitleSection />}
      {/* Temporary content to allow for scrolling */}
    
      
    </div>
  );
};

export default Home;
