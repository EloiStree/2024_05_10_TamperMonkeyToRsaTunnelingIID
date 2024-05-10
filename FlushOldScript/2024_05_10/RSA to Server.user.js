// ==UserScript==
// @name         RSA to Server
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://integergames.be
// @icon         https://www.google.com/s2/favicons?sz=64&domain=integergames.be
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var private_rsa_key="<RSAKeyValue><Modulus>28hcojmUPKGJAp5+TeocYBZ6YYSiG85+BaRcrQ0c8Lnraa2czWZfZDmguC4VoeJ44JmO7RMGmOUWie+QAJwLRLwlN19J3+sy/LzgYQL9VtrEM7Eyx1KnGWN08ZablH/Vrg7+/K/97+Q9neeimpufTtOCoym7sTcHHvlsa98IytE=</Modulus><Exponent>AQAB</Exponent><P>9I2dGJ9OYjUELlcqBmY/ieI1uv//1F3BdoeeplgPU0e7nZY/0IZrPJuMlZZDEitMFgcA0Fq/zwLalSLRytsqmw==</P><Q>5hHuw8SxLjWllvvAyf+J6TPVLDpKb6TfhjFWXIh/jGyrtDlxHkjXxzJ8257O2RuLldFjvyHhnD0H9HzXDpkRAw==</Q><DP>camQJm2EhOiXNOKWSbskNPXKe0uYoB+jV2/ZMP8kwFRKwweeSVDwbo7tXGkmaz9scaB3pF9JXvG4njA8ycfrmQ==</DP><DQ>YNhdnFS4jI4ShSq2LZF+uQaTjkl/Od26JZ+xDcR7hF3eLUAcyLW69uPewQfpZGR+7nK0vSkC8iSSq6y9TizKhw==</DQ><InverseQ>mF7mxJyiKT+oMfxZzTrYr1NWrp2l1pxoaXwOmFEBSegP2Lka9l38M1y2ij4+/790uzKD7EIv8m9ARfxdxAu0dw==</InverseQ><D>M5/ysmBYA43mAul7vY16MM/W20UuVt3AGE8tPbDQ1XK2a1JOfKjJS1+F8v1QM4Bg6FDpk6JecFePXcMZzirZMlKK9Wh/2p04ZNSlM9haZOqvrAEVDzr7QxTOn1uMGJwudNFHZMHx1sW5L+RJgkv527NDeAT/PxScrgOM01piNOk=</D></RSAKeyValue>";
    var public_rsa_key= "<RSAKeyValue><Modulus>28hcojmUPKGJAp5+TeocYBZ6YYSiG85+BaRcrQ0c8Lnraa2czWZfZDmguC4VoeJ44JmO7RMGmOUWie+QAJwLRLwlN19J3+sy/LzgYQL9VtrEM7Eyx1KnGWN08ZablH/Vrg7+/K/97+Q9neeimpufTtOCoym7sTcHHvlsa98IytE=</Modulus><Exponent>AQAB</Exponent></RSAKeyValue>";
    console.log("Hello");


 // Connect to the WebSocket server
    const socket = new WebSocket('ws://81.240.94.97:3615');
    //Localhost can work with WS bu don't for remote. Apparently
    //const socket = new WebSocket('ws://localhost:3615');

    // Event handler for when the connection is established
    socket.onopen = function(event) {
        console.log('WebSocket connection established');
        // You can send messages to the server using socket.send()
    };

    // Event handler for when a message is received from the server
    socket.onmessage = function(event) {
        console.log('Received message:', event.data);
    };

    // Event handler for when the connection is closed
    socket.onclose = function(event) {
        console.log('WebSocket connection closed');
    };

    // Event handler for errors
    socket.onerror = function(error) {
        console.error('WebSocket error:', error);
    };


    console.log("Stop");
    // Your code here...
})();