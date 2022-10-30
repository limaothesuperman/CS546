/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let arrayStats = (array) => {
    function checkIsNumber(num) {
        return typeof num === 'number';
    }

    function mean(array) {
        let total = 0;
        for (let i = 0; i < array.length; i++) {
            total += array[i];
        }
        return total / array.length;
    }

    function median(array) {
        return array.length % 2 === 1 ?
            array[array.length / 2 - 0.5] :
            (array[array.length / 2] + array[array.length / 2 - 1]) / 2;
    }

    function mode(array) {
        let countsObj = {};
        let maxCount = 0;
        let result = [];
        array.forEach((num) => {
            if (!countsObj[num])
                countsObj[num] = 0;
            countsObj[num]++;
        });
        for (let keys in countsObj) {
            if (countsObj[keys] > maxCount) {
                maxCount = countsObj[keys];
                result = [keys];
            } else if (countsObj[keys] === maxCount) {
                result.push(keys);
            }
        }
        if (Object.keys(countsObj).length === result.length)
            return 0;
        for (let i = 0; i < result.length; i++) {
            result[i] = Number(result[i]);
        }
        if (result.length === 1)
            return result[0];
        return result;
    }

    if (!Array.isArray(array))
        throw "Input must be an array!";
    else if (array.length === 0)
        throw "The size of array cannot be zero!";
    else if (!array.every(checkIsNumber))
        throw "Each array element must be a number!";

    else {
        array = array.sort(function (a, b) {
            return a - b
        }); // sort array before calculations
        return {
            mean: mean(array),
            median: median(array),
            mode: mode(array),
            range: array[array.length - 1] - array[0],
            minimum: array[0],
            maximum: array[array.length - 1],
            count: array.length,
            sum: mean(array) * array.length
        };
    }


};

let makeObjects = (...arrays) => {
    //this function takes in a variable number of arrays that's what the ...arrays signifies
    let resultObj = {};

    if (arrays.length !== 0) {
        for (let i = 0; i < arrays.length; i++) {
            if (!Array.isArray(arrays[i]))
                throw "Input must be an array or arrays!";
            else if (arrays[i].length !== 2)
                throw "Each array must only have two elements!"
            else {
                resultObj[arrays[i][0]] = arrays[i][1];
            }
        }
    } else
        throw "There must be a input!"
    return resultObj;
};

let commonElements = (...arrays) => {
    //this function takes in a variable number of arrays that's what the ...arrays signifies
    let result = [];
    let j = arrays.length - 1;
    if (arrays.length < 2) {
        throw "There should be AT LEAST two arrays passed in as input parameters!"
    } else {
        for (let i = 0; i < arrays.length; i++) {
            if (!Array.isArray(arrays[i]) || arrays[i].length === 0)
                throw "Input must be arrays and NOT empty!";
        }
        const obj = {};
        for (let i = 0; i < arrays.length; i++) {
            for (let j = 0; j < arrays[i].length; j++) {
                if (obj[arrays[i][j]]) {
                    obj[arrays[i][j]]++;
                } else {
                    obj[arrays[i][j]] = 1;
                }
                if (obj[arrays[i][j]] === arrays.length) {
                    result.push(arrays[i][j]);
                }
            }
        }
    }
    return result;
};

module.exports = {
    arrayStats,
    makeObjects,
    commonElements
};