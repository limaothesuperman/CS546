/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/
let deepEquality = (obj1, obj2) => {
    function checkObjEqual(obj1, obj2) {
        if (Object.keys(obj1).length !== Object.keys(obj2).length) {
            return false;
        }
        for (const key of Object.keys(obj1)) {
            const value1 = obj1[key];
            const value2 = obj2[key];
            const bothObj = (typeof value1 === 'object' && value1 !== null)
                && (typeof value2 === 'object' && value2 !== null);
            if (bothObj && !checkObjEqual(value1, value2))
                return false;
            else if (!bothObj)
                if (value1 !== value2) {
                    return false;
                }
        }
        return true;
    }

    if (typeof obj1 !== 'object' || obj1 === null
        || typeof obj2 !== 'object' || obj2 === null)
        throw "Inputs must be objects and CANNOT be null!"
    else if (Array.isArray(obj1) || Array.isArray(obj2))
        throw "Inputs CANNOT be array!"
    else {
        return checkObjEqual(obj1, obj2);
    }
};

let commonKeysValues = (obj1, obj2) => {

    function checkObjCommonKeysValues(obj1, obj2) {
        let result = {};
        for (let key in obj1) {

            const value1 = obj1[key];
            const value2 = obj2[key];
            const bothObj = (typeof value1 === 'object' && value1 !== null)
                && (typeof value2 === 'object' && value2 !== null);
            if (bothObj) {
                result[key] = checkObjCommonKeysValues(value1, value2);
            } else if (value1 === value2) {
                result[key] = value1;
            }
        }
        return result;

    }

    if (typeof obj1 !== 'object' || obj1 === null
        || typeof obj2 !== 'object' || obj2 === null)
        throw "Inputs must be objects and CANNOT be null!"
    else if (Array.isArray(obj1) || Array.isArray(obj2))
        throw "Inputs CANNOT be array!"
    else {
        let result = checkObjCommonKeysValues(obj1, obj2);
        for (let key in result) {
            const value1 = result[key];
            if (typeof value1 === 'object' && value1 !== null)
                for (let key in value1)
                    result[key] = value1[key];
        }
        return result;
    }
};

let calculateObject = (object, func) => {
    if (typeof object !== 'object' || object === null)
        throw "First input must be an object!"
    else if (Array.isArray(object))
        throw "Inputs CANNOT be array!"
    else if (typeof func !== 'function')
        throw "Second input must be a function"
    else {
        for (let key in object) {
            if (typeof object[key] !== "number")
                throw "The values for the object must be numbers"
            object[key] = Number(Math.sqrt(func(object[key])).toFixed(2));
        }
        return object;
    }
};

module.exports = {
    deepEquality,
    commonKeysValues,
    calculateObject
}
