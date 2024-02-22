
import { useState } from 'react';

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
    
    return(
        <div className = "createBlock">
            <h1>Dino nuggets</h1>

            {key === "" && <button type="submit" onClick={()=> setKey(randomNumGen(6))}>Generate Key</button>}

            {key !=="" && <p class = "returned_text">Your Key: {key}</p>}

            {key !== "" && block === "" &&
                <label>
                    Enter a string: <input 
                        id="enter" 
                        defaultValue={""} 
                        value={plaintext}
                        onChange={e => setPt(e.target.value)}
                    />

                    <button 
                        type="submit"
                        onClick={()=> setBlock(new Block(plaintext, key))}
                    > Create New Blockchain </button>
                </label>
            }

            {plaintext !=="" && <p class = "returned_text">Entered Plaintext: {plaintext}</p>}

            {block !== "" &&
                <label>
                    To decrypt, enter your key: <input 
                        id="enter" 
                        defaultValue={""} 
                        value={inKey}
                        onChange={e => setInKey(e.target.value)}
                    />

                    <button 
                        type="submit"
                        onClick={()=> {
                            setOutStr(block.decode(key)); 
                        }}
                    > Decrypt Blockchain </button>
                </label>
            }

            {outStr !== "" && <p class = "returned_text">Decrypted Text: {outStr}</p>}

        </div>
    );
}

export default BlockChainAndRNG;