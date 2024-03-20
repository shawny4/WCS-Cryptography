import './Alex.css';
import './Information.css';

import {scramble,delay} from './Scramble.js';
import { useState } from 'react';
import cipher from '../images/Shawn-Cipher.png';

const BlockCipher = () => {

    const [pt, setPt] = useState("");
    const [ct, setDT] = useState("______________________________");
    const [compPT, setCPT] = useState("______________________________");

    function reset (){
        setPt("");
        setDT("______________________________");
        setCPT("______________________________");
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
    let iv = "0";
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
        scramble(pt,setDT);
    });
    delay(1000).then(()=>{ 
        setDT(ciphertext);
    });
}
       
    

// CBC block cipher decryption function
function decrypt() {
    let ciphertext = ct;
    let iv = "0";
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
        scramble(ct,setCPT);
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
    //     let ptt = pt.toUpperCase();
    //     let key = "thisisakey";
    //     let keyLength = key.length;
    //     let cipher = "";
    //     let IV = "0";
    //     let block = "";
        

    //     while (ptt.length>0){
    //         if(ptt.length>=keyLength){
    //             //separate the appropriate number of bits from the plaintext.
    //             block = ptt.substring(0,keyLength);
    //             ptt =  ptt.substring(keyLength,ptt.length);

                
    //         }else{
    //             block = ptt;
    //             ptt = "";
    //         }
    //         //XOR the block with the current IV value for extra security
    //         IV = xor(block,IV);

    //         IV = xor(IV,key);
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
    //     let cipher = ct.toUpperCase();
    //     let key = "thisisakey";
    //     let keyLength = key.length;
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
            
    //         blockComp = xor(block,key);
 
    //         blockComp = xor(block,IV);
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
                <text>Computed Ciphertext:                </text>
                <text class = "returned-text">{ct} <br/></text>
                {ct!=="______________________________"&&
                <button className='decrypt-button'id="decrypt" onClick={()=>decrypt()}>Decrypt</button>}
            </label>
            
            {compPT !=="" &&
            <label className='output-group' >
                <text>Decrypted Plaintext:                </text>
                <text class = "returned-text">{compPT} <br/></text>
            </label>}
            <div style={{height:"200px"}}/>

            <p className='info'>
                Basic CBC system (Cypher Block Chaining) <br/><br/>
                A normal block cipher consists divides the input plaintext into portions equal to a specified size (usually in increments
                of 32 bits), then performs 'the same' operation on each of them to produce a cipher text. 

                For a CBC cypher, an 'intial value' is utilized as a secondary key to provide an extra layer of security.<br/>
                This operation is done before the key is used, and each block uses the cipher text generated by the previous block 
                as the initial value.<br/><br/>
                Advantages:<br/>
                -   Allow a small key to encrypt texts much larger than it.<br/>
                -	Relatively easy to implement.<br/>
                -	Relatively more secure as multiple computations are required to decrypt.<br/><br/>

                Disadvantages:<br/>
                -	Each block is sequential (requires input from the previous block), so computation time for longer plaintexts may take longer.<br/><br/>

                In the current implementation, encryption and decryption is done using the simplest method; the XOR operation. Converts any character: letters, 
                or numbers into binary, then comparing the bits to each other before recompiling them, resulting in a different character.<br/><br/>

                In practice, encryption algorithms such as AES are used.

                Additionally, when the length of the plaintext is not long enough, a padding scheme such as PKCS#7 are generally used to 'fill in'
                the plaintext with secure, extra characters. Padding in this program is simply appending spaces to the plaintext. 

            </p>

        </div>
    );


}

export default BlockCipher;