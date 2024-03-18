import cipherImg from '../images/Vanson-Encryption.png';
import keyGenImg from '../images/Vanson-KeyGen.png';
import { useState } from 'react';

import './Information.css';
import './Vanson.css';
import './Alex.css';
import {scramble,delay} from './Scramble.js';

const Vanson = () => {
  const [input, setInput] = useState("");
  const [password, setPassword] = useState("");
  const [encrypt,setCipher] = useState("");
  const [decrypt,setPT] = useState("");

  function clear(){
    setInput("");
    setPassword("");
    setCipher("");
    setPT("");
  }
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

  function xor(message, password,setVal) {
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
    if(setVal){
      setVal(message);
      delay(100).then(()=>{ 
          scramble(message,setVal);
      });
      delay(1000).then(()=>{ 
          setVal(cipher);
      });
    }
    return cipher;
    
}
  return (
    <div className="create">
      
      <img className='diagram' src={cipherImg} alt="cool" style={{width:"100%",left:"0"}}/>
      
      <label className='input-group' style={{width:"100%",  color:'whiteSmoke'}}>
        <h style={{textDecorationLine:'underline'}}>Intructions:</h>  
        <p>
        
          The message can include every ASCII printable character except `, "{", |, "}", and ~. 
          <br/>
          MESSAGE: 
          <input id="enter" className="text-input" defaultValue={""} value={input} onChange={(e) => setInput(e.target.value.toUpperCase())} />
          <br/>
          The password can include any ASCII printable character.
          <br/>
          PASSWORD: 
          <input id="enter" className="text-input" defaultValue={""} value={password} onChange={(e) => setPassword(e.target.value)} />
         
        </p>
      </label>
      {input!=="" && password!==""&&<button className="encrypt-button" onClick={()=>xor(input,password,setCipher)} style={{position:"absolute",top:"550px",left:"140px"}}>Encrypt</button>}
      {encrypt!==""&&<button className="decrypt-button"onClick={()=>xor(encrypt,password,setPT)}style={{position:"absolute",top:"550px",left:"667px"}}>Decrypt</button>}
      {(input!==""||password!=="")&&<button className="encrypt-button" onClick={()=>clear()} style={{position:"absolute",top:"600px",left:"140px"}}>Clear</button>}

      {input!=="" && <p className="returned_text" style={{top:"32.4%",left:"149px"}}>{input}</p>}
      {password!=="" && <p className="returned_text" style={{top:"390.5px",left:"149px"}}>{password}</p>}
     
      {encrypt!=="" && <p className="returned_text" style={{top:"300px",left:"667px"}}>{encrypt}</p>}
      {password!=="" && <p className="returned_text" style={{top:"390.5px",left:"667px"}}>{password}</p>}

      {decrypt!=="" && <p className="returned_text" style={{top:"300px",left:"1187px"}}>{decrypt}</p>}

      <div style={{height:"50px"}}/>
      <img className='diagram' src={keyGenImg} alt="cool" />
    </div>
  );
};

export default Vanson;
