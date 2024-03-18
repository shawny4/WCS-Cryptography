export function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}


function swapChar(text,setVal){
    let ascii_low = 32;
    let ascii_high = 127;
    let swapText = "";
    for(let i=0; i<text.length; i++){
        let random_ascii = Math.floor((Math.random() * (ascii_high - ascii_low)) + ascii_low);
        let random_char= String.fromCharCode(random_ascii) 
        swapText+=random_char;
    }
    setVal(swapText);
}



export function scramble(text,setVal) {
    
    const numScramble = 1000;
    
    for(let j=0; j<numScramble; j++){
        //for(let i=0; i<text.length; i++){
            delay(100).then(()=>{
                setTimeout(swapChar(text,setVal),5); 
            });   
        //}   
    }
}

