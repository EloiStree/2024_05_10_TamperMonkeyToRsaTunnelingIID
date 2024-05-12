
// ==UserScript==
// @name         RSA SIGN WITH KEY PAIR TO TUNNELING WS PUSH INT WSVAR
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Allows to push integer wsvar from a scratch to a unsecure websocket
// @description Code of this script : https://github.com/EloiStree/2024_05_10_TamperMonkeyToRsaTunnelingIID/blob/main/ScratchToIIDWS/PushWsVarIntegerToIIDWS.js
// @description Server: https://github.com/EloiStree/2024_04_04_IndexIntegerDateTunnelingRSA/tree/main/CloudTunnelingRSA
//
// @author       Eloi stree
// @match        https://scratch.mit.edu/projects/*
// @require      http://code.jquery.com/jquery-1.8.3.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/jsencrypt/3.3.2/jsencrypt.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js
// @grant        none

// ==/UserScript==
//TO LOOK LATER
//https://github.com/travist/jsencrypt
(function() {
    'use strict';


// Replace with your RSA KEY THIS ONE IS A EXAMPLE
const privateKey =
`-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQDXUkJcl8o9AYV2yK90c+FqL2tmfWs/rVtpqtS9X2CyRIwUrS6H
hT7Ji376G7uIQoVeq7IOWODCSpc7DORwnmmNSm+SGULVIj7opviIqlpQwOpHy6yo
jgOMHmSDaJU3dFtG6F0wWpuZzXMrBrDJsQOgSsK1DlP7YcL16+YfKBYxSQIDAQAB
AoGBAJuoIsMvFAtwGxyYzYYA85bAuwJ3bl21I91KmspftdaJiT61R2q+33nxtxR1
kedaN3IN6wVGKQ0rwRH2Kvpi+mfOsh/3y36ODAaoc+wzWZjZLTzq+yxMChqjb/oz
9EpxHSSJlDjEaLRIjOGrKbCVsrhEOxMfaYEqknQeoTIy9qjFAkEA3QczNk795Gr2
u+RUesKv+KrGM3sskYvWOyOeNPSLx82hk2nPxEcyHfSTYCnfLD5UCeZTpBfZu9KP
orb10hP88wJBAPlj51+EH0s27WHWq8pHRaSnrHmoZvy4K5EeE8vO48PmBXoqaOOR
2BZIozl3iKYirOOjb9hSW7Eay/vrGa/Jt9MCQBHGAHI/i98QUuLtC3YLrcbbRLDj
GMRjcEi1JoWvnIXmnTWTbqej6f3KqwcylsWiBXP+V398g3+9ANvexomsHc0CQFUx
n7StedND7Evj/cOYHV5mOTFGKghjEd79G14gSwZ86ZoWKsay59KU9c2H3BKE/fK1
vltzpwcVVGG2qou2qSkCQQDHG0I+jswkPYWZ3v5mKgHCCZ9HfN0gO05LiZEmka3w
/Ov5KjHhYajQNhEwa2V6+R0TAX3nSkn1BT1kjGWDvcZs
-----END RSA PRIVATE KEY-----`;


// Replace with your RSA KEY THIS ONE IS A EXAMPLE
const publicKey =
`-----BEGIN RSA PUBLIC KEY-----
MIGJAoGBANdSQlyXyj0BhXbIr3Rz4Wova2Z9az+tW2mq1L1fYLJEjBStLoeFPsmL
fvobu4hChV6rsg5Y4MJKlzsM5HCeaY1Kb5IZQtUiPuim+IiqWlDA6kfLrKiOA4we
ZINolTd0W0boXTBam5nNcysGsMmxA6BKwrUOU/thwvXr5h8oFjFJAgMBAAE=
-----END RSA PUBLIC KEY-----`;


    //////////// START LOCAL WEBSOCKET ////////////////////
let localWebSocket;

// Find one here: https://github.com/EloiStree/2024_05_10_TamperMonkeyToRsaTunnelingIID/blob/main/ScratchToLocalWebsocket/ScratchVarToLocalWebsocket.js
var useLocalServer=false;
    

function connectLocalWebSocket() {

    if( useLocalServer==false) return;
    //console.log("Check connection local");
    if ( localWebSocket === null || typeof localWebSocket === 'undefined'|| localWebSocket.readyState !== WebSocket.OPEN) {

        console.log("Try to create local web socket");
        try{
            localWebSocket = new WebSocket('ws://localhost:7073');

        } catch (error) {
            console.error('No local server or error.');
        }
        if(localWebSocket!== null && localWebSocket.readyState === WebSocket.OPEN){
                // Event listener for when the connection is open
                localWebSocket.addEventListener('open', function (event) {
                    console.log('Local webwocket connection established.');
                    const message = 'Hello, local websocket server!';
                    localWebSocket.send(message);
                });

                // Event listener for incoming messages from the server
                localWebSocket.addEventListener('message', function (event) {
                    console.log('Message from server:', event.data);
                });

                // Event listener for errors
                localWebSocket.addEventListener('error', function (event) {
                    console.error('Local WebSocket error:', event);
                });

                // Event listener for when the connection is closed
                localWebSocket.addEventListener('close', function (event) {
                    console.log('Local WebSocket connection closed.');
                    // Attempt to reconnect
                    localWebSocket=null;
                });
            }
    }
}

setInterval(connectLocalWebSocket, 3000);

   ////////////END LOCAL WEBSOCKET/////////////


console.log('Code Start ');
var socket = new WebSocket('ws://81.240.94.97:4501');
var isConnectionValide=false;
var previousData = {}; // Store the previous data
var useKeyValue = true;
var useConsoleDebug=false;

   function PushMessageToServerRandomInteger(){
       if(!isConnectionValide)
           return;
       const randomInt = Math.floor(Math.random() * 1000000000) + 1;
       PushMessageToServerInteger(randomInt)

   }
    function PushMessageToServerInteger(integer){
       if(!isConnectionValide)
           return;

       //socket.send("i|"+integer);

         var value =integer;
        // Get the current UTC time in milliseconds
        const currentTimeMillis = Date.now();

        // Convert to an unsigned long (assuming 64-bit)
        const ulongVar = BigInt(currentTimeMillis);

        // Create a byte array of length 12
        const byteArray = new Uint8Array(12);
        // Set the first 4 bytes of the array from the value in little-endian format
        byteArray[0] = value & 0xFF;
        byteArray[1] = (value >> 8) & 0xFF;
        byteArray[2] = (value >> 16) & 0xFF;
        byteArray[3] = (value >> 24) & 0xFF;

        // Set the next 8 bytes of the array from ulongVar in little-endian format
        const view = new DataView(byteArray.buffer);
        view.setBigUint64(4, ulongVar, true);
        socket.send(byteArray);
   }



// Event listener for when the connection is established
socket.addEventListener('open', () => {
    console.log('WebSocket connection established');

    // Send a message to the server
    socket.send('Hello '+publicKey);
});

// Event listener for incoming messages
socket.addEventListener('message', (event) => {
    //console.log('Received message from server:', event.data);

    if (typeof event.data === 'string') {
     //console.log('The variable is a string.');
     if (event.data.startsWith("SIGNIN:")) {
          var toReturn = event.data.substring(7);
          console.log("SIGNIN:"+toReturn);
          var sign = new JSEncrypt();
          sign.setPrivateKey(privateKey);
          var signature = sign.sign(toReturn, CryptoJS.SHA256, "sha256");
          console.log("SIGNED:"+signature);
          socket.send("SIGNED:"+signature);
      }
    if (event.data.startsWith("RSA:Verified")) {
        isConnectionValide=true
        console.log("RSA:Verified => Connection establish.");
    }
} else {
    //console.log('The variable received is not a string.');
    if (event.data instanceof Blob) {
        if (event.data.size === 16) {
           // console.log('The variable is a Blob of 16 bytes.');
            //I don't know how to turn the Blob in value.
            // Should bet int | int | ulong  value.
        }
    }
}
});

// Event listener for when the connection is closed
socket.addEventListener('close', () => {
    console.log('WebSocket connection closed');
    isConnectionValide=false

});

// Event listener for errors
socket.addEventListener('error', (error) => {
    console.error('WebSocket error:', error);
});






    // Send data to WebSocket server
    function sentKeyValueToOpenWebsocket(label, value) {

        if(localWebSocket && localWebSocket.readyState === WebSocket.OPEN){
            localWebSocket.send(label+":"+value);
        }

        if (socket && socket.readyState === WebSocket.OPEN) {
            const lowerStr = label.toLowerCase().trim();

            if (lowerStr.startsWith("wsvar ")) {
                const number = parseInt(value);
                //console.log("The string starts with 'wsvar'");
                if (!isNaN(number)) {

                    PushMessageToServerInteger(number);
                    //console.log("The string is a valid integer:", number);
                } else {
                    //console.log("The string is not a valid integer");
                }
            }

        }
    }

    // Extract data and send it to WebSocket server
    function extractAndSendData() {
        //console.time('extractAndSendData'); // Start the timer
        var dataString = ''; // Initialize empty string to store data

        // Find all elements with class 'react-contextmenu-wrapper'
        var elements = document.getElementsByClassName('react-contextmenu-wrapper');

        // Iterate through each element
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];

            // Find elements with classes 'monitor_label_ci1ok' and 'monitor_value_3Yexa' within current element
            var labelElement = element.querySelector('.monitor_label_ci1ok');
            var valueElement = element.querySelector('.monitor_value_3Yexa');

            // Extract text content from label and value elements
            var label = labelElement ? labelElement.textContent.trim() : '';
            var value = valueElement ? valueElement.textContent.trim() : '';

            if (label && value) {
                dataString += label + ': ' + value + '\n';

                if (useKeyValue) {
                    if (!previousData[label]) {
                        previousData[label] = value;
                        sentKeyValueToOpenWebsocket(label, value);
                    } else {
                        if (previousData[label] !== value) {
                            previousData[label] = value;
                            sentKeyValueToOpenWebsocket(label, value);
                        }
                    }
                }
            }
        }

        //console.timeEnd('extractAndSendData'); // End the timer and display the elapsed time
    }



console.log('Code Websocket end');
    function Test(){



        var message= "Hello World !";

        var sign = new JSEncrypt();
        sign.setPrivateKey(privateKey);
        var signature = sign.sign(message, CryptoJS.SHA256, "sha256");

        var verify = new JSEncrypt();
        verify.setPublicKey(publicKey);
        var verified = verify.verify(message, signature, CryptoJS.SHA256);

        // Now a simple check to see if the round-trip worked.
        if (verified) {
            console.log('ok '+verified+' '+signature);
        }
        else {
            console.log('Wrong '+verified+' '+signature);
        }
    }

    //setInterval(PushMessageToServerRandomInteger, 3000);
    setTimeout(Test, 1000);
                console.log('Code end reach');

    setInterval(extractAndSendData, 15);

})();





