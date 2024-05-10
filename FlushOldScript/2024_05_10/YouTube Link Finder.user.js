// ==UserScript==
// @name         YouTube Link Finder
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Finds all YouTube links on a webpage after 10 seconds
// @author       Your Name
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    setTimeout(function() {
        var links = document.querySelectorAll('a[href*="youtube.com/watch?v="]');
        for (var i = 0; i < links.length; i++) {
            console.log(links[i].href);
        }
    }, 3);
})();