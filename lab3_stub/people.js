const axios = require('axios');

async function getPeople() {
    const {data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json')
    return data
}

const getPersonById = async (id) => {
    const peopleData = await getPeople();

    if (!id)
        throw "There must be an ID input!";
    else if (typeof id !== "string")
        throw "ID input must be a string!";
    else if (id.trim().length === 0)
        throw "ID input cannot be EMPTY spaces!";
    else {
        for (const temp of peopleData) {
            if (temp.id.trim() === id.trim())
                return temp;
        }
        throw "Person NOT found!";
    }

};

const sameJobTitle = async (jobTitle) => {
    const peopleData = await getPeople();
    let result = [];

    if (!jobTitle)
        throw "There must be an jobTitle input!";
    else if (typeof jobTitle !== "string")
        throw "JobTitle input must be a string!";
    else if (jobTitle.trim().length === 0)
        throw "JobTitle input cannot be EMPTY spaces!";
    else {
        for (let temp of peopleData) {
            if (temp.job_title.trim().toLowerCase() === jobTitle.trim().toLowerCase())
                result.push(temp);
        }
        if (result.length < 2)
            throw "There must be AT LEAST 2 people having the same job title!";
        else
            return result;
    }

};

const getPostalCodes = async (city, state) => {
    const peopleData = await getPeople();
    let result = [];

    if (!city || !state)
        throw "There must be both city and state input!";
    else if (typeof city !== "string" || typeof state !== "string")
        throw "Both city and state input must be string!";
    else if (city.trim().length === 0 || state.trim().length === 0)
        throw "Both city and state input cannot be EMPTY spaces!";
    else {
        for (let temp of peopleData) {
            if (temp.city.trim().toLowerCase() === city.trim().toLowerCase() &&
                temp.state.trim().toLowerCase() === state.trim().toLowerCase()) {
                if (!result.includes(temp.postal_code))
                    result.push(temp.postal_code);
            }
        }
        if (result.length === 0)
            throw "There are NO postal_codes for the given city and state combination!";
        else {
            for (let i = 0; i < result.length; i++) {
                result[i] = Number(result[i]);
            }
            return result.sort(function (a, b) {
                return a - b;
            });
        }

    }
};

const sameCityAndState = async (city, state) => {
    const peopleData = await getPeople();
    let result = [];

    if (!city || !state)
        throw "There must be both city and state input!";
    else if (typeof city !== "string" || typeof state !== "string")
        throw "Both city and state input must be string!";
    else if (city.trim().length === 0 || state.trim().length === 0)
        throw "Both city and state input cannot be EMPTY spaces!";
    else {
        for (let temp of peopleData) {
            if (temp.city.trim().toLowerCase() === city.trim().toLowerCase() &&
                temp.state.trim().toLowerCase() === state.trim().toLowerCase()) {
                result.push(temp.last_name + " " + temp.first_name);
            }
        }
        if (result.length < 2)
            throw "There must be AT LEAST two people living in the same city and state!";
        else {
            return await sortByLastName(result);
        }
    }
};

const sortByLastName = async (nameArray) => {
    nameArray.sort((a, b) => a.localeCompare(b));
    // swap last_name and first_name
    for (let i = 0; i < nameArray.length; i++) {
        let name = nameArray[i];
        let nameSwapped;
        for (let j = 0; j < name.trim().length; j++) {
            if (name[j] === " ") {
                nameSwapped = name.substring(j + 1) + " " + name.substring(0, j);
            }
        }
        nameArray[i] = nameSwapped;
    }
    return nameArray;
};

module.exports = {
    getPeople,
    getPersonById,
    sameJobTitle,
    getPostalCodes,
    sameCityAndState,
    sortByLastName
};
