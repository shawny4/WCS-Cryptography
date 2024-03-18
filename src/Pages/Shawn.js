import './Alex.css';
import './Information.css';

import {scramble,delay} from './Scramble.js';
import { useState } from 'react';
import cipher from '../images/Shawn-Cipher.png';

const BlockCipher = () => {

    const [pt, setPt] = useState("");
    const [ct, setDT] = useState("_______");
    const [compPT, setCPT] = useState("_______");

    function reset (){
        setPt("");
        setDT("_______");
        setCPT("_______");
    }

    // XOR function
function xor(str1, str2) {
    let result = '';
    const length = Math.min(str1.length, str2.length);
    for (let i = 0; i < length; i++) {
        const charCode1 = str1.charCodeAt(i);
        const charCode2 = str2.charCodeAt(i);
        const xorResult = charCode1 ^ charCode2;
        result += String.fromCharCode(xorResult);
    }
    return result;
}

// CBC block cipher encryption function
function encrypt() {
    let plaintext = pt;
    let iv = "ivalue";
    let key = "thisiskey123";
    let ciphertext = '';
    let prevBlock = iv;

    // Pad plaintext if necessary
    if (plaintext.length % iv.length !== 0) {
        plaintext += ' '.repeat(iv.length - plaintext.length % iv.length);
    }

    for (let i = 0; i < plaintext.length; i += iv.length) {
        // Extract current block
        const block = plaintext.slice(i, i + iv.length);

        // XOR with previous ciphertext block (or IV)
        const xoredBlock = xor(block, prevBlock);

        // Encrypt the XORed block with the key
        const encryptedBlock = xor(xoredBlock, key);

        // Append the ciphertext block to the result
        ciphertext += encryptedBlock;

        // Update previous block for the next iteration
        prevBlock = encryptedBlock;
    }

    setDT(pt);
    delay(100).then(()=>{ 
        scramble(ct,setDT);
    });
    delay(1000).then(()=>{ 
        setDT(ciphertext);
    });
}
       
    

// CBC block cipher decryption function
function decrypt() {
    let ciphertext = ct;
    let iv = "ivalue";
    let key = "thisiskey123";
    let plaintext = '';
    let prevBlock = iv;

    for (let i = 0; i < ciphertext.length; i += iv.length) {
        // Extract current block
        const block = ciphertext.slice(i, i + iv.length);

        // Decrypt the block with the key
        const decryptedBlock = xor(block, key);

        // XOR with previous ciphertext block (or IV)
        const xoredBlock = xor(decryptedBlock, prevBlock);

        // Append the plaintext block to the result
        plaintext += xoredBlock;

        // Update previous block for the next iteration
        prevBlock = block;
    }

    setCPT(ct);

    delay(100).then(()=>{ 
        scramble(compPT,setCPT);
    });
    
    delay(1000).then(()=>{
            setCPT(plaintext.trim()); // Trim any padding
    });
}
// function xor(str,str2,useKey){
    //     let xoredString = "";
    //     let key;
    //     if(useKey){
    //         key = "thisisakey123";
    //     } else{
    //         key = str2;
    //     }
    
    //     //we want printable assciis. So 32-122
    //     for(let i=0; i<str.length; i++){
    //         let strChar = (str.charCodeAt(i)-32)%64;
    //         let keyChar = (key.charCodeAt(i)-32)%64;
    //         let xoredChar = [strChar]^[keyChar];
    //         xoredString += String.fromCharCode(xoredChar + 32);
    //     }
       
    //     return xoredString;
    // }

    // function encrypt(){
    //     let pt = plaintext.toUpperCase();
    //     let keyLength = 5;
    //     let cipher = "";
    //     let IV = "0";
    //     let block = "";
        

    //     while (pt.length>0){
    //         if(pt.length>=keyLength){
    //             //separate the appropriate number of bits from the plaintext.
    //             block = pt.substring(0,keyLength);
    //             pt =  pt.substring(keyLength,pt.length);

                
    //         }else{
    //             block = pt;
    //             pt = "";
    //         }
    //         //XOR the block with the current IV value for extra security
    //         IV = xor(block,IV,false);

    //         IV = xor(IV,0,true);
    //         cipher += IV;
    //     }

    //     //cipher = xor(pt,0,true);

    //     //setDT(plaintext);
    //     //delay(100).then(()=>{ 
    //     //    scramble(cipherText,setDT);
    //     //});
    //     //delay(1000).then(()=>{ 
    //         setDT(cipher);
    //     //});

    // }

    // function decrypt(){
    //     let cipher = cipherText.toUpperCase();
    //     let keyLength = 5;
    //     let block = "";
    //     let IV = "0";
    //     let blockComp = "";
    //     let rePT = "";


    //     while(cipher.length>0){

    //         if(cipher.length>=keyLength){
    //             block = cipher.substring(0,keyLength);
    //             cipher =  cipher.substring(keyLength,cipher.length);
    //         }else{
    //             block = cipher;
    //             cipher="";
    //         }
            
    //         blockComp = xor(block,0,true);
 
    //         blockComp = xor(block,IV,false);
    //         IV = block;
    //         rePT += blockComp;
    //     }
    //     //rePT = xor(cipher,0,true);


    //     // setCPT(cipherText);

    //     // delay(100).then(()=>{ 
    //     //     scramble(compPT,setCPT);
    //     // });
        
    //     // delay(1000).then(()=>{
    //         setCPT(rePT);
    //     // });
        
    // }
    
    return(
        <div className = "create">
            <h1>CBC Block Cipher</h1>
        
            <label className='input-group'>
                Enter a Number: <input id = "enter" className='text-input' defaultValue={""} value = {pt} onChange={e => setPt(e.target.value)}/>
                <button className='reset-button'  onClick={()=>reset()}>Clear</button>
                <h>               </h>
                {pt !=="" && <button id="encrypt" className='encrypt-button' onClick={()=>encrypt()}>Encrypt</button>}
                {pt !=="" &&  <h class = "returned-text">Entered Plaintext: {pt}</h>}
            </label>
            

            <img src={cipher} alt="duck" className='diagram' style={{position:"absolute",top:"260px",right:"100px",width:"35%",height:"auto"}}/>

            
            <label className='output-group'>{/*Holds Returned Cipher Text*/}
                <text>Computed Ciphertext:</text>
                <text class = "returned-text">{ct} <br/></text>
                <button className='decrypt-button'id="decrypt" onClick={()=>decrypt()}>Decrypt</button>
            </label>
            
            {compPT !=="" &&
            <label className='output-group' >
                <text>Decrypted Plaintext:</text>
                <text class = "returned-text">{compPT} <br/></text>
            </label>}
            <div style={{height:"100px"}}/>

            <p className='info'>
                Basic CBC system (Cypher Block Chaining) <br/><br/>
                A normal block cipher consists of several operations where each block takes a portion of the input plaintext equal to the length of the key… 
                explanation of a normal block cipher…
                In this implementation however, an extra step is added where the ciphertext of the previous block is used as an extra layer of security…<br/><br/>
                Advantages:<br/>
                -   Allow a small key to encrypt texts much larger than it.<br/>
                -	Relatively easy to implement.<br/>
                -	Relatively more secure as multiple computations are required to decrypt.<br/><br/>

                Disadvantages:<br/>
                -	Each block is sequential (requires input from the previous block), so computation time for longer plaintexts may take longer.<br/>
                Current implementation: Encryption and decryption is done using the simplest method; the XOR operation. Converts any character: letters, 
                or numbers into binary, then comparing the bits to each other before recompiling them, resulting in a different character.
            </p>

        </div>
    );


}

export default BlockCipher;