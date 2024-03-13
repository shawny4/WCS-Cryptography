
import { useState } from 'react';
import cipher from '../images/Shawn-CBC_Block_Cipher.png';

const BlockCipher = () => {

    const [plaintext, setPt] = useState("");
    const [displayText, setDT] = useState("");


    function reset (){
        setPt("");
        setDT("");
    }

    function encrypt(){
        let pt = plaintext;
        let key = 9876;
        let cipher = "";
        let IV = "0";

        let numDigits = pt.toString().length;
        let numDigitsPBlocks = 4;
        let numBlocks = Math.ceil(numDigits/numDigitsPBlocks);



        for(let i=numBlocks; i>0; i--){
            let blockPT = pt%Math.pow(10,numDigitsPBlocks);
            //remove nth block from pt
            pt-= blockPT;
            pt/= Math.pow(10,numDigitsPBlocks);
            //console.log("removed"+pt);

            blockPT = IV^blockPT;
            //console.log(blockPT);
            IV = blockPT^key; 

            if(IV/10000<1){
                //pad to keep the number of values consistant
                console.log("pad");
                IV="0"+IV;
            }
            cipher = IV+cipher+"";
        }
        setDT(plaintext);
        scramble(displayText)
        
        delay(200).then(()=>{ 
            setDT(cipher);
        });
    }

    function decrypt(){
        let cipher = plaintext;
        let key = 9876;
        let revPT = "";
        let IV = 0;
        let ct;

        let numDigits = cipher.toString().length;
        let numDigitsPBlocks = 4;
        let numBlocks = Math.ceil(numDigits/numDigitsPBlocks)-1;

        for(let i=numBlocks; i>0; i--){
            let blockCT = cipher.toString().substring(cipher.length-1-numDigitsPBlocks,cipher.length);
            //%Math.pow(10,numDigitsPBlocks+1);
            
            //remove nth block from pt
            cipher = cipher.toString().substring(0,cipher.length-1-numDigitsPBlocks);
                
            ct = blockCT^key; 
            ct^=IV;
    
            IV = blockCT;
            
            revPT = ct+revPT+"";
        }

        setDT(plaintext);
        scramble(plaintext);
        delay(20).then(()=>{
            setDT(revPT);
        });
        
    }

    function replaceAt(str, index, replacement) {
        return str.toString().substring(0, index) + replacement + str.toString().substring(index + replacement.length);
    }
    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    function swapChar(text,index){
        delay(1).then(()=>{ 
        let ascii_low = 32;
        let ascii_high = 127;

        let random_ascii = Math.floor((Math.random() * (ascii_high - ascii_low)) + ascii_low);
        let random_char=String.fromCharCode(random_ascii)

        text = replaceAt(text,index,random_char);

        
        console.log('ran after 1 second1 passed');
        setDT(text);
    });
}

function scramble(text) {
    
    const numScramble = 2000;
    
    for(let j=0; j<numScramble; j++){
        for(let i=0; i<text.length; i++){
                setTimeout(swapChar(i),5000);    
        }   
    }
}

    
    return(
        <div className = "create">
            <h1>Imagine my Cipher stuff is here pls</h1>
        
            <label>
                Enter a Number: <input id = "enter" defaultValue={""} value = {plaintext} onChange={e => setPt(e.target.value)}/>
                <button type="reset" onClick={()=>reset()}>Reset form</button>
                <button type="submit">Submit form</button>
            </label>
            

            <img src={cipher} alt="duck" />

            {plaintext !=="" && <p class = "returned_text">Entered Plaintext: {plaintext}</p>}
            
            {plaintext !=="" && <button id="encrypt" onClick={()=>encrypt()}>Encrypt</button>}

            {plaintext !=="" && <button id="decrypt" onClick={()=>decrypt()}>Decrypt</button>}

            {displayText !=="" && <p class = "returned_text">Computed Text: {displayText}</p>}
            
        </div>
    );


}

export default BlockCipher;