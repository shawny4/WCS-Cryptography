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
  const [showDecryption, setShowDecryption] = useState(false);

  const handleEncryptWithRandomKey = () => {
    const randomKey = generateRandomKey(16);
    setKey(randomKey);
    setEncrypted(simpleEncrypt(text, randomKey));
    setShowDecryption(true);
  };

  const handleDecrypt = () => {
    setDecrypted(simpleDecrypt(encrypted, key));
  };
  const resetFields = () => {
    setText('');
    setKey('');
    setEncrypted('');
    setDecrypted('');
    setShowDecryption(false);
  };


  return (
    <div className="block-cipher-demo">
      {!showDecryption && (
        <div className="input-group">
          <input
            className="text-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Text to encrypt"
          />
          <button className="encrypt-button" onClick={handleEncryptWithRandomKey}>
            Encrypt
          </button>
        </div>
      )}
      {showDecryption && (
        <>
          <div className="output-group">
            <label>Encryption key:</label>
            <input
              className="key-output"
              value={key}
              readOnly
            />
            <label>Encrypted:</label>
            <textarea
              className="output-encrypted"
              value={encrypted}
              readOnly
            />
            <button className="decrypt-button" onClick={handleDecrypt}>
              Decrypt
            </button>
          </div>
          {decrypted && (
            <div className="output-group decrypted-group">
            <label>Decrypted:</label>
            <textarea
              className="output-decrypted"
              value={decrypted}
              readOnly
            />
            <button className="reset-button" onClick={resetFields}>
              Reset
            </button>
          </div>
          )}
        </>
      )}
    </div>
  );
}

export default BlockCipherDemo;