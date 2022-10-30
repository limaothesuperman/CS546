//require express and express router as shown in lecture code
const express = require('express');
const router = express.Router();
const data = require('../data');
const reviewData = data.reviews;
const movieData = data.movies;
const helper = require('../helpers');

router
    .route('/')
    .get(async (req, res) => {
        //code here for GET
    })
    .post(async (req, res) => {
        //code here for POST
    });

router
    .route('/:movieId')
    .get(async (req, res) => {
        //code here for GET
    })
    .delete(async (req, res) => {
        //code here for DELETE
    })
    .put(async (req, res) => {
        //code here for PUT
    });

module.exports = router;

