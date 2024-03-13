import React, { useState } from 'react';
import './Alex.css';

function simpleEncrypt(text, key) {
  return text.split('').map((char, index) => {
    const charCode = char.charCodeAt(0);
    const keyCode = key.charCodeAt(index % key.length);
    return String.fromCharCode((charCode + keyCode) % 256);
  }).join('');
}

function simpleDecrypt(encrypted, key) {
  return encrypted.split('').map((char, index) => {
    const charCode = char.charCodeAt(0);
    const keyCode = key.charCodeAt(index % key.length);
    return String.fromCharCode((charCode - keyCode + 256) % 256);
  }).join('');
}

function generateRandomKey(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function BlockCipherDemo() {
  const [text, setText] = useState('');
  const [key, setKey] = useState('');
  const [encrypted, setEncrypted] = useState('');
  const [decrypted, setDecrypted] = useState('');
  const [isKeyGenerated, setIsKeyGenerated] = useState(false); // New state to track key generation

  

  const handleDecrypt = () => {
    setDecrypted(simpleDecrypt(encrypted, key));
  };
  const handleEncryptWithRandomKey = () => {
    const randomKey = generateRandomKey(8); // Generate a key of length 8
    setKey(randomKey);
    setEncrypted(simpleEncrypt(text, randomKey));
    setIsKeyGenerated(true); // Set to true after key is generated
  };

  return (
    <div className="block-cipher-demo">
      <div className="input-group">
        <input
          className="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Text to encrypt"
        />
        <input
          className="key-input"
          value={key}
          readOnly={!isKeyGenerated} 
          placeholder="Encryption key"
        />
        <button className="encrypt-button" onClick={handleEncryptWithRandomKey}>
          Encrypt with Random Key
        </button>
        <button className="decrypt-button" onClick={handleDecrypt}>
          Decrypt
        </button>
      </div>
      <div className="output-group">
        <label>Encrypted:</label>
        <textarea className="output-encrypted" value={encrypted} readOnly />
        <label>Decrypted:</label>
        <textarea className="output-decrypted" value={decrypted} readOnly />
      </div>
    </div>
  );
}

export default BlockCipherDemo;