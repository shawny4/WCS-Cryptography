function inputs() {
    let choice = prompt("What type of cipher would u like?");
    if (choice.toLowerCase() === "b") {
        blockCipher();
    } else if (choice.toLowerCase() === "c") {
        caesarCipher();
    } else if (choice.toLowerCase() === "s") {
        streamCipher();
    }
}





function caesarCipher() {
    let message = prompt("Alright, what message would you like to encrypt: ").toLowerCase();
    let encrypted = "";
    for (let i = 0; i < message.length; i++) {
        let char = message[i];
        encrypted += String.fromCharCode((char.charCodeAt(0) - (char >= 'A' && char <= 'Z' ? 'A' : 'a').charCodeAt(0) + 5) % 26 + (char >= 'A' && char <= 'Z' ? 'A' : 'a').charCodeAt(0));
    }
    let decrypted = "";
    for (let i = 0; i < encrypted.length; i++) {
        decrypted += String.fromCharCode(encrypted.charCodeAt(i) - 5);
    }
    console.log("\n\n                 OKAYYY, we finished encrypting your message. WHOS EXCITED???? DEFINITELY MEEE");
    console.log("Plain text is " + message);
    console.log("Your encrypted text is: " + encrypted);

    
    const decryption = prompt("Would you like to decrypt? ")
    if (decryption.toLowerCase() == "yes"){

        console.log("Your decrypted text is: " + decrypted);
    }
}

function xor_two_str(a, b) {
    let xored = [];
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
        let xoredValue = a.charCodeAt(i % a.length) ^ b.charCodeAt(i % b.length);
        xored.push(xoredValue.toString(16));
    }
    return xored.join('');
}


function streamCipher() {
    console.log("You chose stream cipher! ");

    let key = prompt('Alright, gimme your key: ');
    let plain = prompt("Your plain text please: ");
    let encrypted, decrypted;

    function xor_two_str(a, b) {
        let result = '';
        for (let i = 0; i < Math.max(a.length, b.length); i++) {
            result += String.fromCharCode(a.charCodeAt(i % a.length) ^ b.charCodeAt(i % b.length));
        }
        return result;
    }

    // Check if key and plain are numbers (integers)
    if (!isNaN(key) && !isNaN(plain)) {
        key = parseInt(key);
        plain = parseInt(plain);
        encrypted = key ^ plain;
        decrypted = key ^ encrypted;
    } else {
        encrypted = xor_two_str(key, plain);
        decrypted = xor_two_str(encrypted, key);
    }

    console.log("\n\n                 OKAYYY, we finished encrypting your message. WHOS EXCITED???? DEFINITELY MEEE");
    console.log("Plain text is " + plain);
    console.log("Your encrypted text is: " + encrypted);

    const decryption = prompt("Would you like to decrypt? ")
    if (decryption.toLowerCase() == "yes"){

        console.log("Your decrypted text is: " + decrypted);
    }
   
}





inputs()
