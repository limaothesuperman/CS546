//require express and express router as shown in lecture code
const express = require('express');
const router = express.Router();
const data = require('../data');
const reviewData = data.reviews;
const movieData = data.movies;
const helpers = require("../helpers");


router
    .route('/:movieId')
    .get(async (req, res) => {
        try {
            req.params.movieId = helpers.checkID(req.params.movieId);
        } catch (e) {
            return res.status(400).json({error: e});
        }
        try {
            await movieData.getMovieById(req.params.movieId);
        } catch (e) {
            return res.status(404).json({error: "Movie not found!"});
        }
        try {
            let movie = await movieData.getMovieById(req.params.movieId);
            if (movie.reviews.length === 0)
                return res.status(404).json({error: "No reviews for that movie!"});
            else
                res.json(movie.reviews);
        } catch (e) {
            return res.status(500).json({error: e});
        }
    })

    .post(async (req, res) => {
        try {
            req.params.movieId = helpers.checkID(req.params.movieId);
        } catch (e) {
            return res.status(400).json({error: e});
        }
        try {
            await movieData.getMovieById(req.params.movieId);
        } catch (e) {
            return res.status(404).json({error: "Movie not found!"});
        }
        let reviewBody = req.body;
        try {
            reviewBody.reviewTitle = helpers.checkReviewTitle(reviewBody.reviewTitle);
            reviewBody.reviewerName = helpers.checkReviewerName(reviewBody.reviewerName);
            reviewBody.review = helpers.checkReview(reviewBody.review);
            reviewBody.rating = helpers.checkReviewRating(reviewBody.rating);
        } catch (e) {
            return res.status(400).json({error: e});
        }
        try {
            await reviewData.createReview(
                req.params.movieId,
                reviewBody.reviewTitle,
                reviewBody.reviewerName,
                reviewBody.review,
                reviewBody.rating);
            res.json(await movieData.getMovieById(req.params.movieId));
        } catch (e) {
            res.sendStatus(500);
        }
    });

router
    .route('/review/:reviewId')
    .get(async (req, res) => {
        try {
            req.params.reviewId = helpers.checkID(req.params.reviewId);
        } catch (e) {
            return res.status(400).json({error: e});
        }
        try {
            const review = await reviewData.getReview(req.params.reviewId);
            res.json(review);
        } catch (e) {
            return res.status(404).json({error: "Review not found!"});
        }
    })
    .delete(async (req, res) => {
        try {
            req.params.reviewId = helpers.checkID(req.params.reviewId);
        } catch (e) {
            return res.status(400).json({error: e});
        }
        try {
            await reviewData.getReview(req.params.reviewId);
        } catch (e) {
            return res.status(404).json({error: "Review not found!"});
        }
        try {
            const movie = await reviewData.removeReview(req.params.reviewId);
            res.json(movie);
        } catch (e) {
            res.sendStatus(500);
        }
    });

module.exports = router;
