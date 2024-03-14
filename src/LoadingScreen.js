import React from 'react';
import Lottie from 'react-lottie';
import animationData from './wired-gradient-27-globe (1).json';
import './LoadingScreen.css';

const LoadingScreen = ({ isVisible }) => { // Accept isVisible prop
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className={`loading-overlay ${!isVisible ? 'hidden' : ' col'}`}> {/* Use isVisible to toggle the hidden class */}
      <Lottie options={defaultOptions} height={300} width={300} />
    </div>
  );
};

export default LoadingScreen;
