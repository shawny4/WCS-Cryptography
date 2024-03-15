import React from 'react';
import './SmallerTitleSection.css'; // Make sure you have the CSS
import pcPic from './pc_pic.png';
const SmallerTitleSection = ({ isVisible }) =>  {
  return (
    <div className={`smaller-title-section ${isVisible ? 'visible' : 'hidden'}`}>
      <h2>The Math of Cyber Security</h2>
      <img src={pcPic} alt="Descriptive aspect of content" />
      <p>Behind every bank account transaction, every password, and every secure message, cryptography is at work. Cryptography is the mathematical science of securing information, existing at the foundation of cybersecurity. As cyber threats become more and more advanced, the next generation of Cybersecurity Engineers must be equipped with an advanced cryptography toolkit. WCS has brought together a team of mathematically talented and computer science savvy students to develop a suite of software implementations of cryptography. Our website is a showcase of our work, as well as a resource for those who want to learn more about the math behind cybersecurity.

</p>
    </div>
  );
};

export default SmallerTitleSection;