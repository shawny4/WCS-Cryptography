import React, { useState } from 'react';

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

function BlockCipherDemo() {
  const [text, setText] = useState('');
  const [key, setKey] = useState('');
  const [encrypted, setEncrypted] = useState('');
  const [decrypted, setDecrypted] = useState('');

  const handleEncrypt = () => {
    setEncrypted(simpleEncrypt(text, key));
  };

  const handleDecrypt = () => {
    setDecrypted(simpleDecrypt(encrypted, key));
  };

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Text to encrypt" />
      <input value={key} onChange={(e) => setKey(e.target.value)} placeholder="Encryption key" />
      <button onClick={handleEncrypt}>Encrypt</button>
      <button onClick={handleDecrypt}>Decrypt</button>
      <p>Encrypted: {encrypted}</p>
      <p>Decrypted: {decrypted}</p>
    </div>
  );
}

export default BlockCipherDemo;