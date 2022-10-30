function questionOne(arr) {
    // TODO: Implement question 1 here
    return arr.map(checkPrime);

    function checkPrime(num) {
        if (num === 1 || num === 0)
            return false;
        else if (num > 1) {
            for (let i = 2; i < num; i++) {
                if (num % i === 0)
                    return false;
            }
        }
        return true;
    }
}


function questionTwo(startingNumber, commonRatio, numberOfTerms) {
    // TODO: Implement question 2 here
    if (startingNumber === 0 || commonRatio === 0)
        return 0;
    else if (numberOfTerms <= 0 || numberOfTerms % 1 !== 0)
        return NaN;
    else {
        let denominator = 1 - commonRatio;
        let numerator = 1 - Math.pow(commonRatio, numberOfTerms);
        return startingNumber * (numerator / denominator);
    }
}

function questionThree(str) {
    // TODO: Implement question 3 here
    let testStr = str.toLowerCase();
    let count = 0;
    for (let i = 0; i < testStr.length; i++) {
        if (testStr.charAt(i) === 'b' ||
            testStr.charAt(i) === 'c' ||
            testStr.charAt(i) === 'd' ||
            testStr.charAt(i) === 'f' ||
            testStr.charAt(i) === 'g' ||
            testStr.charAt(i) === 'h' ||
            testStr.charAt(i) === 'j' ||
            testStr.charAt(i) === 'k' ||
            testStr.charAt(i) === 'l' ||
            testStr.charAt(i) === 'm' ||
            testStr.charAt(i) === 'n' ||
            testStr.charAt(i) === 'p' ||
            testStr.charAt(i) === 'q' ||
            testStr.charAt(i) === 'r' ||
            testStr.charAt(i) === 's' ||
            testStr.charAt(i) === 't' ||
            testStr.charAt(i) === 'v' ||
            testStr.charAt(i) === 'w' ||
            testStr.charAt(i) === 'x' ||
            testStr.charAt(i) === 'y' ||
            testStr.charAt(i) === 'z')
            count++;
    }
    return count;
}

function questionFour(fullString, substring) {
    // TODO: Implement question 4 here
    let count = 0;
    while (fullString.includes(substring)) {
        let index = fullString.indexOf(substring);
        fullString = fullString.substring(index + substring.length, fullString.length);
        count++;
    }
    return count;

}

//TODO:  Change the values for firstName, lastName and studentId
module.exports = {
    firstName: 'Mao',
    lastName: 'Li',
    studentId: '10473334',
    questionOne,
    questionTwo,
    questionThree,
    questionFour,
};
