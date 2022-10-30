//require express and express router as shown in lecture code
const express = require('express');
const router = express.Router();
const data = require('../data');
const reviewData = data.reviews;
const movieData = data.movies;
const helper = require('../helpers');


router
    .route('/:movieId')
    .get(async (req, res) => {
        //code here for GET
    })
    .post(async (req, res) => {
        //code here for POST
    });

router
    .route('/review/:reviewId')
    .get(async (req, res) => {
        //code here for GET
    })
    .delete(async (req, res) => {
        //code here for DELETE
    });

module.exports = router;
