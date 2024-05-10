// ==UserScript==
// @name         Password Generator
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Generates passwords based on given parameters
// @author       Your Name
// @match        https://scratch.mit.edu/*   // Replace with the URL of the website where you want to use this script
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let dateTimeKey = "20200101010101";
    let dateTimeNow = "20240101010101";
    let changeFrequenceDivision = 5;
    let m_sortingKeys = [
        1, 3,
        2, 3,
        3, 1,
        0, 2,
        1, 2,
        3, 1
    ];

    let currentPassword;
    let nextPassword;

    function generatePassword(startdateTime, now, frequenceDivider, sortingkey){
        if (frequenceDivider === 0) {
            frequenceDivider = 1;
        }

         startdateTime = new Date(startdateTime.getTime() + startdateTime.getTimezoneOffset() * 60000);
         now = new Date(now.getTime() + now.getTimezoneOffset() * 60000);

        console.log("Test: " + (now - startdateTime));
        let secondTotaleUnder999999999 = Math.floor((now - startdateTime) / 1000);
        while (secondTotaleUnder999999999 > 999999999) {
            secondTotaleUnder999999999 -= 999999999;
        }

        let secondTotaleInt999999999 = Math.floor(secondTotaleUnder999999999) / frequenceDivider;
        currentPassword = randomizeIntegerBytes(sortingkey, secondTotaleInt999999999);
        nextPassword = randomizeIntegerBytes(sortingkey, secondTotaleInt999999999 + 1);


        console.log("secondTotaleUnder999999999: " + secondTotaleUnder999999999);
        console.log("secondTotaleint999999999: " + secondTotaleInt999999999);
        console.log("dateTimeKeyDate: " + dateTimeKeyDate);
        console.log("dateTimeNowDate: " + dateTimeNowDate);

    }

    function randomizeIntegerBytes(sortingkey, integerToRandomized) {
        if (sortingkey === null || sortingkey.length === 0) {
            return integerToRandomized;
        }


        let intAsBytes = new Uint8Array(new Int32Array([integerToRandomized]).buffer);
        let previousIndex;
        let currentIndex;
        let tempValue;
        for (let i = 1; i < sortingkey.length; i += 2) {
            previousIndex = sortingkey[i - 1] % 4;
            currentIndex = sortingkey[i] % 4;

            tempValue = intAsBytes[previousIndex];
            intAsBytes[previousIndex] = intAsBytes[currentIndex];
            intAsBytes[currentIndex] = tempValue;
        }
        return new Int32Array(intAsBytes.buffer)[0];
    }

    function generateUtcDateFromString(dateString) {
        try {
            let stringLength = dateString.length;
            let year = stringLength < 4 ? 1970 : parseInt(dateString.substring(0, 4));
            let month = stringLength < 6 ? 1 : parseInt(dateString.substring(4, 6));
            let day = stringLength < 8 ? 1 : parseInt(dateString.substring(6, 8));
            let hour = stringLength < 10 ? 0 : parseInt(dateString.substring(8, 10));
            let minute = stringLength < 12 ? 0 : parseInt(dateString.substring(10, 12));
            let second = stringLength < 14 ? 0 : parseInt(dateString.substring(12, 14));

            return new Date(Date.UTC(year, month - 1, day, hour, minute, second));
        } catch (error) {
            return new Date(0); // Return 0 if the conversion fails
        }
    }

    function consoleGeneretedPassword(){
        let dateTimeKeyDate = generateUtcDateFromString(dateTimeKey);
        let dateTimeNowDate = generateUtcDateFromString(dateTimeNow);
        generatePassword(dateTimeKeyDate, dateTimeNowDate, changeFrequenceDivision, m_sortingKeys);

        console.log("Current Password: " + currentPassword + "\nNext Password: " + nextPassword);
    }

    setInterval(consoleGeneretedPassword, 1000);

})();