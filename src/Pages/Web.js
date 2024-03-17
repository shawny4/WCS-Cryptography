
import { useState, useRef } from 'react';
import "./Web.css";
import process from "./Process.png";
import keyGenProcess from "./Key Gen Process.png";

//simple block chain and number generation program

function randomNumGen(n) {
    const a = 1664525;
    const b = 1013904223;
    let num = [];

    let seed = Date.now();

    num[0] = Math.abs(seed % 128);

    //sn = (a * sn-1 + b) % 128
    for (let i = 1; i < n; i++) {
        num[i] = (a * (num[i - 1]) + b) % 128;
    }

    return num;
}

class Block {
    constructor(message, key) {

        console.log("created");
        this.cText = [];
        this.next = null;
        this.n = message.length;
        const keySize = key.length;

        //pushes the beginning key sized section of the message string into the ciphertext (cText) holder
        let bound = Math.min(keySize, this.n);
        for (let i = 0; i < bound; i++) {
            this.cText.push(message.charCodeAt(i));
        }

        //cuts off the text pushed into cText from the main message
        message = message.substring(keySize, this.n);

        //XORs cText with the key
        for (let i = 0; i < bound; i++) {
            this.cText[i] ^= key[i];
        }

        bound = Math.min(keySize, message.length);

        //if the incoming message was bigger than the key, push its remains into a new block
        if (this.n > keySize) 
        {
            let temp = '';

            //XORs cText with a same sized portion of the message being pushed to the new block
            for (let i = 0; i < bound; i++) 
            {
                temp += String.fromCharCode(message.charCodeAt(i) ^ this.cText[i]);
            }

            let newMessage = temp + message.substring(keySize, message.length);
            this.next = new Block(newMessage, key);
        } 
        else 
        {
            this.next = null;
        }
    }

    getCText() {
        let out = '';

        for (let i = 0; i < this.cText.length; i++) 
        {
            out += String.fromCharCode(this.cText[i]);
        }

        if (!this.next) return out;
        return out + this.next.getCText();
    } 
    
    decode(key) {
        let out = '';
        let nextBlockText = '';
        let passUp = '';
        let bounds = this.cText.length;
        
        for (let i = 0; i < bounds; i++) 
        {
            out += String.fromCharCode(key[i] ^ this.cText[i]);
        }

        if (this.next != null) 
        {
            nextBlockText = this.next.decode(key);
            let tempSize = nextBlockText.length;
            bounds = Math.min(bounds, tempSize);
            for (let i = 0; i < bounds; i++) 
            {
                passUp += String.fromCharCode(nextBlockText.charCodeAt(i) ^ this.cText[i]);
            }
            passUp += nextBlockText.substring(bounds, tempSize);
        }

        if (!this.next) return out;
        return out + passUp;
    }
}

function keyToString(key) {
    let n = key.length;
    let str = "";

    for(let i = 0; i < n; i++) {
        str += key[i];
        str += " ";
    }
    
    return str;
}

function stringToKey(str) {
    let key = [];
    let size = str.length;
    let index = 0;
    let temp = "";

    for(let i = 0; i < size; i++) {
        if(str[i] === ' ') {
            key[index] = parseInt(temp);
            temp = "";
            index++;
        } else {
            temp += str[i];
        }
    }

    if(str[size-1] !== ' ') {
        key[index] = parseInt(temp);
    }

    return key;
}

/*
const key = randomNumGen(10);
sleep(1);
const secondKey = randomNumGen(100);

const secondBlock = new Block("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.\nExcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum", key);
const firstBlock = new Block("Testing out the blockchain", secondKey);

console.log("first key: "+ key);
console.log("\nsecond key: " + secondKey);

console.log("\n\nPrinting decoding results with wrong key\n");
console.log("first block:\n" + firstBlock.decode(key));
console.log("\nsecond block:\n" + secondBlock.decode(secondKey));

console.log("\n\nPrinting results with correct key\n");
console.log("first block:\n" + firstBlock.decode(secondKey));
console.log("\nsecond block:\n" + secondBlock.decode(key));
*/

const BlockChainAndRNG = () => {
    const [plaintext, setPt] = useState("");
    const [key, setKey] = useState("");
    const [block, setBlock] = useState("");
    const [inKey, setInKey] = useState("");
    const [outStr, setOutStr] = useState("");

    const processRef = useRef(null);
    const kGRef = useRef(null);
    const processScroll = () => processRef.current.scrollIntoView()
    const kGScroll = () => kGRef.current.scrollIntoView()
    
    return(
        <div className = "web-block-cipher">
            <div className="input-group">
                {key === "" && <button type="submit" className="encrypt-button" onClick={()=> setKey(randomNumGen(6))}>Generate Key</button>}

                {key !=="" && block === "" && 
                    <div className="web-text">
                        <input 
                            id="enter" 
                            defaultValue={""} 
                            className="web-text"
                            value={plaintext}
                            onChange={e => setPt(e.target.value)}
                        />
                        <button 
                            type="submit"
                            className="encrypt-button"
                            onClick={()=> setBlock(new Block(plaintext, key))}
                        > Create New Blockchain </button>
                    </div>
                }

                {key !== "" && 
                    <div className="web-text">
                        <br/><p>Entered Plaintext: {plaintext}</p>
                        <br/><p>Your Key: {keyToString(key)}</p><br/>
                    </div>
                }
                
                {block !== "" &&
                    <div>
                        <label>To decrypt, enter your key: </label>
                        <input
                            id="enter" 
                            defaultValue={""} 
                            className="web-text"
                            value={inKey}
                            onChange={e => setInKey(e.target.value)}
                        />

                        <button 
                            type="submit"
                            className="encrypt-button"
                            onClick={()=> {
                                setOutStr(block.decode(stringToKey(inKey))); 
                                console.log(block.getCText());
                            }}
                        > Decrypt Blockchain </button>
                    </div>
                }

                {outStr !== "" && <p class = "web-text">Decrypted Text: {outStr}</p>}
            </div>

            {outStr !== "" &&
                <button 
                    type="submit"
                    className="encrypt-button"
                    onClick={processScroll}
                > Want to Learn the Process? </button>
            }
            
            {outStr !== "" && 
            <div ref={processRef} className="info-group">
                <img src={process} alt="process"></img>
                <br/><button 
                    type="submit"
                    className="encrypt-button"
                    onClick={kGScroll}
                > Psuedo Random Number Generator </button>
            </div>}

            {outStr !== "" && <img ref={kGRef} className="info-group" src={keyGenProcess}></img>}
        </div>
    );
}

export default BlockChainAndRNG;