// ==UserScript==
// @name         Encrypt and decrypt time
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://scratch.mit.edu/projects/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';











function encryptAndDecrypt() {
  // Generate two random integers
  const int1 = Math.floor(Math.random() * 1000);
  const int2 = Math.floor(Math.random() * 1000);

  alert('Original Integers: ' + int1 + ', ' + int2);

  // Encryption
  const startTimeEncrypt = new Date().getTime();

  const bytesArray = new Uint8Array(8); // Assuming 4 bytes for each integer
  new DataView(bytesArray.buffer).setInt32(0, int1, true);
  new DataView(bytesArray.buffer).setInt32(4, int2, true);

  const endTimeEncrypt = new Date().getTime();
  const encryptionTime = endTimeEncrypt - startTimeEncrypt;

  alert('Encrypted Bytes: ' + bytesArray);

  // Decryption
  const startTimeDecrypt = new Date().getTime();

  const decryptedInt1 = new DataView(bytesArray.buffer).getInt32(0, true);
  const decryptedInt2 = new DataView(bytesArray.buffer).getInt32(4, true);

  const endTimeDecrypt = new Date().getTime();
  const decryptionTime = endTimeDecrypt - startTimeDecrypt;

  alert('Decrypted Integers: ' + decryptedInt1 + ', ' + decryptedInt2);

  // Display time
  alert('Encryption Time: ' + encryptionTime + ' ms');
  alert('Decryption Time: ' + decryptionTime + ' ms');
}

// Run the function
encryptAndDecrypt();











})();