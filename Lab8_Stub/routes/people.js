//Require express and express router as shown in lecture code and worked in previous labs
const express = require('express');
const router = express.Router();
const data = require('../data');
const path = require("path");
const peopleData = data.people;


router.route("/").get(async (req, res) => {
    res.sendFile(path.resolve('static/homepage.html'));

});

router.route("/searchpeople").post(async (req, res) => {
    //code here for POST
    let searchPersonName = req.body.searchPersonName.trim();
    if (searchPersonName.length === 0 || !/^[a-zA-Z]+$/.test(searchPersonName)) {
        return res.status(400).render('error',
            {
                title: 'Error',
            });
    }


    const result = await peopleData.searchPeopleByName(searchPersonName);
    if (result.length === 0)
        res.render('personNotFound',
            {
                title: 'People Not Found',
                isNoMatches: true,
                searchPersonName: searchPersonName

            });
    else {
        res.render('peopleFound',
            {
                title: 'People Found',
                result: result,
                searchPersonName: searchPersonName

            });
    }

});

router.route("/persondetails/:id").get(async (req, res) => {
    //code here for GET
    const personData = await peopleData.searchPeopleByID(req.params.id)

    res.render('personFoundByID',
        {
            title: 'People Found',
            personData: personData
        });
});
module.exports = router;