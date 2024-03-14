import React from 'react';
import './Home.css'; // Ensure your CSS has the necessary animations

const Home = ({ isLoaded }) => {
  return (
    <div className={`home-content ${isLoaded ? 'show' : ''}`}>
      <h1 id="home-title">
        <span className="home-line">Understanding</span>
        <span className="home-line">Cryptography</span>
        <span className="home-line">With WCS</span>
      </h1>
    </div>
  );
};

export default Home;