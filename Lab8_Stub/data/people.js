//Axios call to get all data
const axios = require('axios');

const getAllPeople = async () => {
    const {data} = await axios.get('https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json');
    return data;
};

//Function to list of up to 20 people matching the searchPersonName (sorted by id)
const searchPeopleByName = async (searchPersonName) => {
    let result = [];
    const peopleData = await getAllPeople();
    searchPersonName = searchPersonName.toLowerCase().trim();

    for (let people of peopleData) {
        if (people.firstName.toLowerCase().includes(searchPersonName) ||
            people.lastName.toLowerCase().includes(searchPersonName))
            result.push(people);
        if (result.length === 20)
            break;
    }
    return result;
};

//Function to list person matching the id
const searchPeopleByID = async (id) => {
    id = id.trim();
    const peopleData = await getAllPeople();
    for (const people of peopleData) {
        if (people.id === Number(id))
            return people;

    }
};

module.exports = {searchPeopleByName, searchPeopleByID};
