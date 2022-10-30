/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: 
1. You will need an async function in your app.js file that awaits the calls to your function like the example below. You put all of your function calls within main each in its own try/catch block. and then you just call main().
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.

const people = require("./people");

async function main(){
    try{
        const peopledata = await people.getPeople();
        console.log (peopledata);
    }catch(e){
        console.log (e);
    }
}

call main
main();
*/

const people = require("./people");
const company = require("./companies");


async function main() {
    // try{
    //     const peopledata = await people.getPeople();
    //     console.log (peopledata);
    // }catch(e){
    //     console.log (e);
    // }
    try {
        // console.log(await people.getPersonById("         fa36544d-bf92-4ed6-aa84-7085c6cb0440" ));
        // console.log(await people.sameJobTitle("heLP desk operator  "));
        // console.log(await people.getPostalCodes("  los angeles ","     california"));
        console.log(await people.sameCityAndState("Moreno Valley", "California"));
        // console.log(await people.sameCityAndState("  salt lake city ","     utah"));
        // //console.log(await people.sameCityAndState( "bayside","new york"));
        // console.log(await company.listEmployees("Kemmer-Mohr "));
        // console.log(await company.sameIndustry(" auTo parts:o.E.M.   "));
        // console.log(await company.getCompanyById("     b0d53628-9e28-4aed-8559-b105296baf04     "));


    } catch (e) {
        console.log(e);
    }
}

main();


