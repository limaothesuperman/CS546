const axios = require('axios');
const people = require("./people");


async function getCompany() {
    const {data} = await axios.get('https://gist.githubusercontent.com/graffixnyc/90b56a2abf10cfd88b2310b4a0ae3381/raw/f43962e103672e15f8ec2d5e19106e9d134e33c6/companies.json')
    return data
}

const listEmployees = async (companyName) => {
    const companyData = await getCompany();
    const peopleData = await people.getPeople();

    let result = {};
    let companyResultID = "";
    let employeesResult = [];

    if (!companyName)
        throw "There must be a companyName input!";
    else if (typeof companyName !== "string")
        throw "CompanyName input must be a string!";
    else if (companyName.trim().length === 0)
        throw "CompanyName input cannot be EMPTY spaces!";
    else {
        for (let temp of companyData) {
            if (temp.name.trim().toLowerCase() === companyName.trim().toLowerCase()) {
                result = temp;
                companyResultID = temp.id;
            }
        }
        if (Object.keys(result).length === 0)
            throw `No company name with ${companyName.trim()}`;
        else {
            for (const temp of peopleData) {
                if (temp.company_id.trim() === companyResultID.trim())
                    employeesResult.push(temp.last_name + " " + temp.first_name);
            }
            result.employees = await people.sortByLastName(employeesResult);
        }
        return result;
    }
};

const sameIndustry = async (industry) => {
    const companyData = await getCompany();
    let result = [];

    if (!industry)
        throw "There must be an industry input!";
    else if (typeof industry !== "string")
        throw "Industry input must be a string!";
    else if (industry.trim().length === 0)
        throw "Industry input cannot be EMPTY spaces!"
    else {
        for (const temp of companyData) {
            if (temp.industry.trim().toLowerCase() === industry.trim().toLowerCase())
                result.push(temp);
        }
        if (result.length === 0)
            throw "No companies in that industry!";
    }
    return result;
};

const getCompanyById = async (id) => {
    const companyData = await getCompany();

    if (!id)
        throw "There must be an ID input!";
    else if (typeof id !== "string")
        throw "ID input must be a string!";
    else if (id.trim().length === 0)
        throw "ID input cannot be EMPTY spaces!";
    else {
        for (const temp of companyData) {
            if (temp.id.trim() === id.trim())
                return temp;
        }
        throw "Company NOT found!";
    }
};

module.exports = {
    getCompany,
    listEmployees,
    sameIndustry,
    getCompanyById
};
