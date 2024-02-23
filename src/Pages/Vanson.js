import cipherImg from '../images/Vanson-cipher.png';
import { useState } from 'react';



const Vanson = () => {
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [encrypt,setCipher] = useState("");


  function caesar(message) {
    let cipher = "";
    const offset = message.length;
    for (let i = 0; i < message.length; i++) {
        let msgChar = message.charCodeAt(i);
        msgChar = (msgChar + offset) % 126;
        if (msgChar < 32) {
            msgChar += 32;
        }
        cipher += String.fromCharCode(msgChar);
    }
    return cipher;
}

/* extends a key to at least the length of the message */
function extendKey(key, message) {
    let password = key;
    let next = key;
    while (password.length < message.length) {
        next = xor(key, caesar(next));
        password += next;
    }
    return password;
}

  function xor(message, password) {
    let key = caesar(password);
    if (key.length < message.length) {
        key = extendKey(key, message); // extends key if required
    }
    let cipher = "";
    for (let i = 0; i < message.length; i++) {
        let msgChar = (message.charCodeAt(i) - 32) % 64; // - 32 gets value for original character for decoding
        let keyChar = (key.charCodeAt(i) - 32) % 64;
        let cphChar = ((msgChar) ^ (keyChar));
        if (cphChar >= 64) {
            console.log("Invalid character entered.");
            return null;
        }
        cphChar += 32;
        cipher += String.fromCharCode(cphChar);
    }
    setCipher(cipher);
    return cipher;
    
}
  return (
    <div className="create">
      <p>Hello</p>
      <p>
        The message can include every ASCII printable character except `, "{", |, "}", and ~.
        <input id="enter" defaultValue={""} value={input} onChange={(e) => setInput(e.target.value)} />
        
      </p>

      <label>
        The password can include any ASCII printable character.
        <input id="enter" defaultValue={""} value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={()=>xor(input,password)}>Encrypt</button>
      </label>

      <p className="returned_text">Entered Text: {input}</p>
      <p className="returned_text">Entered Password: {password}</p>
      <p className="returned_text">Cipher: {encrypt}</p>

      <img src={cipherImg} alt="cool" />
    </div>
  );
};

export default Vanson;
