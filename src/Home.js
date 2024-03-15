import React, { useState, useEffect } from 'react';
import './Home.css';
import SmallerTitleSection from './SmallerTitleSection';

const Home = ({ isLoaded }) => {
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setHasScrolled(window.scrollY > 600);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`home-content ${isLoaded ? 'show' : ''}`} style={{ minHeight: '140vh' }}>
            <h1 id="home-title">
                <span className="home-line">Software</span>
                <span className="home-line">Cryptography</span>
                <span className="home-line">Implementation</span>
            </h1>
            {/* Apply conditional rendering based on hasScrolled */}
            <SmallerTitleSection isVisible={hasScrolled} />
        </div>
    );
};

export default Home;
