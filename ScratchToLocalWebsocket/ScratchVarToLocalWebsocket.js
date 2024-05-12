
// ==UserScript==
// @name         Push Scratch wscar to Local WS IID
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Source: https://github.com/EloiStree/2024_05_10_TamperMonkeyToRsaTunnelingIID/blob/main/ScratchToLocalWebsocket/ScratchVarToLocalWebsocket.js
// @author       Eloi stree
// @match        https://scratch.mit.edu/projects/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @require      http://code.jquery.com/jquery-1.8.3.min.js

// @grant        none

// ==/UserScript==
//TO LOOK LATER
//https://github.com/travist/jsencrypt
(function() {
    'use strict';

console.log("Hello :) ")

console.log('Code Start ');
var socket = new WebSocket('ws://localhost:7073');
var isConnectionValide=false;
var previousData = {}; // Store the previous data
var useKeyValue = true;
var useConsoleDebug=false;


   function PushMessageToServerRandomInteger(){
       if(!isConnectionValide){
           return;
       }
       const randomInt = Math.floor(Math.random() * 1000000000) + 1;
       PushMessageToServerIntegerNotDate(randomInt)

   }
   function PushMessageToServerIntegerDate(integer){
    if(!isConnectionValide){return;}

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
     console.log("Random date with date:", value)
}


function PushMessageToServerInteger(integer){
    if(!isConnectionValide){return;}

      var value =integer;
     const byteArray = new Uint8Array(4);
     byteArray[0] = value & 0xFF;
     byteArray[1] = (value >> 8) & 0xFF;
     byteArray[2] = (value >> 16) & 0xFF;
     byteArray[3] = (value >> 24) & 0xFF;
     socket.send(byteArray);
     console.log("Random int:", value)
}




var server_is_offline=false;
function ReconnectIfOffline(){

    if (socket && socket.readyState === WebSocket.OPEN) {
    }
    else{
        isConnectionValide=false
        try{
            socket = new WebSocket('ws://localhost:7073');
            // Event listener for when the connection is established
            socket.addEventListener('open', () => {
                console.log('WebSocket connection established');
                isConnectionValide=true
            });

            // Event listener for incoming messages
            socket.addEventListener('message', (event) => {
                console.log('Received message from server:', event.data);

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
            server_is_offline=false;
            console.log("Server Online");
        }catch(Exception){
            server_is_offline=true;
        }
    }
}



    // Send data to WebSocket server
    function sentKeyValueToOpenWebsocket(label, value) {

        if (socket && socket.readyState === WebSocket.OPEN) {
            const lowerStr = label.toLowerCase().trim();

            if (lowerStr.startsWith("wsvar ")) {
                const number = parseInt(value);
                //console.log("The string starts with 'wsvar'");
                if (!isNaN(number)) {

                    console.log("Change detectected wsvar int: "+value)
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
                if(label.startsWith("wsvar ") ){
                   dataString += label + ': ' + value + '\n';

                   if (useKeyValue) {
                    if (!previousData[label]) {
                        previousData[label] = value;
                        sentKeyValueToOpenWebsocket(label, value);
                    } else {
                        if (previousData[label] !== value) {
                            previousData[label] = value;

                            console.log("Change detectected: "+value)
                            sentKeyValueToOpenWebsocket(label, value);
                        }
                    }
                }
                }
            }
        }
    }


    console.log("Interval :) Start ")

    setInterval(ReconnectIfOffline, 1000);
    setInterval(extractAndSendData,15)
    console.log('Code end reach');

})();
