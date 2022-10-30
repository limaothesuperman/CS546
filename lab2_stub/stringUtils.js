/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let palindromes = (string) => {
    let result = [];

    function checkPalindromes(str) {
        return str.toLowerCase() === str.split('').reverse().join('').toLowerCase();
    }

    if (typeof string !== 'string') {
        throw "Input must be a string!";
    } else if (string.trim().length === 0) {
        throw "Input cannot be a empty string!"
    } else {
        const strTrimmed = string.replace(/[^\w\s]|_/g, "");
        const stringArr = strTrimmed.replace(/\s+/g, " ").split(' ');
        for (let i = 0; i < stringArr.length; i++) {
            if (checkPalindromes(stringArr[i]))
                result.push(stringArr[i]);
        }
        return result;
    }

};

let replaceChar = (string) => {
    if (typeof string !== 'string') {
        throw "Input must be a string!";
    } else if (string.trim().length === 0) {
        throw "Input cannot be a empty string!"
    } else {
        let strArray = string.split("");
        for (let i = 1; i < strArray.length; i = i + 4) {
            strArray[i] = '*';
        }
        for (let i = 3; i < strArray.length; i = i + 4) {
            strArray[i] = '$';
        }
        return strArray.join("");
    }
};

let charSwap = (string1, string2) => {
    if (typeof string1 !== 'string' || typeof string2 !== 'string') {
        throw "Inputs must be TWO strings!";
    } else if (string1.trim().length === 0 || string2.trim().length === 0) {
        throw "Inputs cannot be empty string!"
    } else if (string1.length < 4 || string2.length < 4)
        throw "The length of each string is at least 4 characters"
    else {
        return string2.substring(0, 4) + string1.substring(4)
            + " "
            + string1.substring(0, 4) + string2.substring(4);
    }

};

module.exports = {
    palindromes,
    replaceChar,
    charSwap
};