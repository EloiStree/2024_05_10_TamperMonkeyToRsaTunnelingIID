// ==UserScript==
// @name         My Tampermonkey Script
// @namespace    http://your.site.com
// @version      0.1
// @description  Example of RSA encryption and decryption in Tampermonkey
// @author       You
// @match        http://*/*
// @match        https://*/*
// @grant        none
// ==/UserScript==

// Include jsencrypt library directly
// You can download jsencrypt.min.js from https://github.com/travist/jsencrypt
// Then include it in your Tampermonkey script
// @require       https://cdnjs.cloudflare.com/ajax/libs/jsencrypt/3.1.0/jsencrypt.min.js

// Function to encrypt a message using the public key
function encryptMessage(message, publicKey) {
    const encrypt = new JSEncrypt();
    encrypt.setPublicKey(publicKey);
    return encrypt.encrypt(message);
}

// Function to decrypt a message using the private key
function decryptMessage(encryptedMessage, privateKey) {
    const decrypt = new JSEncrypt();
    decrypt.setPrivateKey(privateKey);
    return decrypt.decrypt(encryptedMessage);
}

// Example usage
const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCp1bNnIuA3A6BtfZgGJmGKKqcp
qZpH3SBwBOKug4BBh0UJc4PxSTswWdMZbRnl1nw68z+e3YwNlJ6xX55N3DS+07+K
abw0vWht5F7H37H8JcPDiMTaNLv9hthu0gYugwD9Fb8Q0H/mDkH3PfJj8Kd6TPGV
Cg9nUEJLVr5Gpozj+wIDAQAB
-----END PUBLIC KEY-----`;

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQCp1bNnIuA3A6BtfZgGJmGKKqcpqZpH3SBwBOKug4BBh0UJc4Px
STswWdMZbRnl1nw68z+e3YwNlJ6xX55N3DS+07+Kabw0vWht5F7H37H8JcPDiMT
aNLv9hthu0gYugwD9Fb8Q0H/mDkH3PfJj8Kd6TPGVCg9nUEJLVr5Gpozj+wIDAQAB
AoGAbmmNEIYwEc6Aml9fsPZt/5dloIXYJL3x5qF6AkYlWj/iZOBG06LaLrVGkq4q
PlzLlh+svyPQLAY+oXq97J5BxuX1BwWvzfuInjlZs70ELB5BzWReaEbdv5jT5LS2
yZvaTm+O7j9Ufx2Ytmkzn0eetzzzZTMB1iQDMg3mCyewxSECQQDuJ/1towmtdtUf
9H+EXkIViGgcePkx7r2tWrXwQ7CjILpV8Q2fWtrbtpN6o9LEtXqTQVcVzXrGgrsB
lnU0sDvRAkEAwIYumfbdzrc2NU6JYXzZk7uy+DLl2th+xBXONw2ZZDSg0U9mH4Xa
cT0tg6E+0XUuomDCKFyfgrEAty6e+Y4k3QJBAKXeZ85nXbA5kbiHTh+DU6DXZyXp
bpoLhXru5eswHYQuvBXhlwTWa4C5OoAloueXsBywMS1T6ZIwtUs/n4/12tECQQCy
X2ocvV1qU8NE+D7j2c8eSTGn8CkZEDNkheCD4cQ4Tn8vNtK13MXrKpVYRHzkxl9e
2gZCFrdO5T+MGQ+hOLOVAkAG3T1rIyrYH9yXSNpZj5Oyn76I7/CaJCFm9DzQzBxF
yo7qYn01M7y1sxDvz7mnqDAEZdqT4GnLlc2KXa36hoNU
-----END RSA PRIVATE KEY-----`;

// Example message to encrypt
const messageToEncrypt = "This is a secret message.";

// Encrypt the message using the public key
const encryptedMessage = encryptMessage(messageToEncrypt, publicKey);
console.log("Encrypted Message:", encryptedMessage);

// Decrypt the encrypted message using the private key
const decryptedMessage = decryptMessage(encryptedMessage, privateKey);
console.log("Decrypted Message:", decryptedMessage);
