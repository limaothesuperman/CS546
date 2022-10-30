/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/

const arrayTest = require('./arrayUtils');
const stringTest = require('./stringUtils');
const objectTest = require('./objectUtils');


console.log("Two arrayStats test cases:");
try {
    console.log(arrayTest.arrayStats([11, 54, 79, 5, -25, 54, 19, 11, 56, 100]));
    console.log('arrayStats1 passed successfully');
} catch (e) {
    console.log(e);
    console.log('arrayStats1 failed successfully');
}
console.log(" ");
try {
    console.log(arrayTest.arrayStats());
    console.log('arrayStats2 passed successfully');
} catch (e) {
    console.log(e);
    console.log('arrayStats2 failed successfully');
}

console.log(" ");
console.log(" ");
console.log("Two makeObjects test cases:");
try {
    console.log(arrayTest.makeObjects([undefined, true], ["date", "9/11/2022"]));
    console.log('makeObjects1 passed successfully');
} catch (e) {
    console.log(e);
    console.log('makeObjects1 failed successfully');
}
console.log(" ");
try {
    console.log(arrayTest.makeObjects([undefined, true], 'b'));
    console.log('makeObjects2 passed successfully');
} catch (e) {
    console.log(e);
    console.log('makeObjects2 failed successfully');
}

console.log(" ");
console.log(" ");
console.log("Two commonElements test cases:");
const arr5 = [67.7, 'Patrick', true];
const arr6 = [true, 5, 'Patrick'];
try {
    console.log(arrayTest.commonElements(arr5, arr6));
    console.log('commonElements1 passed successfully');
} catch (e) {
    console.log(e);
    console.log('commonElements1 failed successfully');
}
console.log(" ");
try {
    console.log(arrayTest.commonElements([1, 2, 4], []));
    console.log('commonElements2 passed successfully');
} catch (e) {
    console.log(e);
    console.log('commonElements2 failed successfully');
}


console.log(" ");
console.log(" ");
console.log("Two palindromes test cases:");
try {
    console.log(stringTest.palindromes("Hi mom, At n--oon, I'm !!!!going!!__!$#  ##$% to take my kayak to the lake 121"));
    console.log('palindromes1 passed successfully');
} catch (e) {
    console.log(e);
    console.log('palindromes1 failed successfully');
}
console.log(" ");
try {
    console.log(stringTest.palindromes(''));
    console.log('palindromes2 passed successfully');
} catch (e) {
    console.log(e);
    console.log('palindromes2 failed successfully');
}

console.log(" ");
console.log(" ");
console.log("Two replaceChar test cases:");
try {
    console.log(stringTest.replaceChar("Hello, How are you? I hope you are well"));
    console.log('replaceChar1 passed successfully');
} catch (e) {
    console.log(e);
    console.log('replaceChar1 failed successfully');
}
console.log(" ");
try {
    console.log(stringTest.replaceChar('         '));
    console.log('replaceChar2 passed successfully');
} catch (e) {
    console.log(e);
    console.log('replaceChar2 failed successfully');
}


console.log(" ");
console.log(" ");
console.log("Two charSwap test cases:");
try {
    console.log(stringTest.charSwap("hello", "world"));
    console.log('charSwap1 passed successfully');
} catch (e) {
    console.log(e);
    console.log('charSwap1 failed successfully');
}
console.log(" ");
try {
    console.log(stringTest.charSwap("john  "));
    console.log('charSwap2 passed successfully');
} catch (e) {
    console.log(e);
    console.log('charSwap2 failed successfully');
}

console.log(" ");
console.log(" ");
console.log("Two deepEquality test cases:");
const testObj1 = {a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}
const testObj2 = {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}}
try {
    console.log(objectTest.deepEquality(testObj1, testObj2));
    console.log('deepEquality1 passed successfully');
} catch (e) {
    console.log(e);
    console.log('deepEquality1 failed successfully');
}
console.log(" ");
try {
    console.log(objectTest.deepEquality([], {c: true, b: 7, d: "Test", a: {}}));
    console.log('deepEquality2 passed successfully');
} catch (e) {
    console.log(e);
    console.log('deepEquality2 failed successfully');
}

console.log(" ");
console.log(" ");
console.log("Two commonKeysValues test cases:");
const first = {name: {first: "Patrick", last: "Hill"}, age: 46};
const second = {school: "Stevens", name: {first: "Patrick", last: "Hill"}};
const third = {a: 2, b: {c: true, d: false}};
const forth = {b: {c: true, d: false}, foo: "bar"};
try {
    console.log(objectTest.commonKeysValues(first, second));
    console.log('commonKeysValues1 passed successfully');
} catch (e) {
    console.log(e);
    console.log('commonKeysValues1 failed successfully');
}
console.log(" ");
try {
    console.log(objectTest.commonKeysValues({}, 123));
    console.log('commonKeysValues2 passed successfully');
} catch (e) {
    console.log(e);
    console.log('commonKeysValues2 failed successfully');
}


console.log(" ");
console.log(" ");
console.log("Two calculateObject test cases:");
try {
    console.log(objectTest.calculateObject({a: 3, b: 5, c: 10}, n => n * 3));
    console.log('calculateObject1 passed successfully');
} catch (e) {
    console.log(e);
    console.log('calculateObject1 failed successfully');
}
console.log(" ");
try {
    console.log(objectTest.calculateObject({a: 3, b: 5, c: '-10'}, n => n * 2));
    console.log('calculateObject2 passed successfully');
} catch (e) {
    console.log(e);
    console.log('calculateObject2 failed successfully');
}

