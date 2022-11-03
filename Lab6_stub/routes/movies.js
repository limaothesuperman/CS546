//require express and express router as shown in lecture code
const express = require('express');
const router = express.Router();
const data = require('../data');
//const reviewData = data.reviews;
const movieData = data.movies;
const helpers = require("../helpers");


router
    .route('/')
    .get(async (req, res) => {
        try {
            let movieList = await movieData.getAllMovies();
            res.json(movieList);
        } catch (e) {
            res.sendStatus(500);
        }
    })
    .post(async (req, res) => {
        let movieInfo = req.body;
        try {
            movieInfo.title = helpers.checkTitle(movieInfo.title);
            movieInfo.plot = helpers.checkPlot(movieInfo.plot);
            movieInfo.genres = helpers.checkGenres(movieInfo.genres);
            movieInfo.rating = helpers.checkRating(movieInfo.rating);
            movieInfo.studio = helpers.checkStudio(movieInfo.studio);
            movieInfo.director = helpers.checkDirector(movieInfo.director);
            movieInfo.castMembers = helpers.checkCastMembers(movieInfo.castMembers);
            movieInfo.dateReleased = helpers.checkDateReleased(movieInfo.dateReleased);
            movieInfo.runtime = helpers.checkRuntime(movieInfo.runtime);

        } catch (e) {
            return res.status(400).json({error: e});
        }
        try {
            const newMovie = await movieData.createMovie(
                movieInfo.title,
                movieInfo.plot,
                movieInfo.genres,
                movieInfo.rating,
                movieInfo.studio,
                movieInfo.director,
                movieInfo.castMembers,
                movieInfo.dateReleased,
                movieInfo.runtime
            );
            res.json(newMovie);
        } catch (e) {
            res.sendStatus(500);
        }
    });

router
    .route('/:movieId')
    .get(async (req, res) => {
        try {
            req.params.movieId = helpers.checkID(req.params.movieId);
        } catch (e) {
            return res.status(400).json({error: e});
        }
        try {
            let movie = await movieData.getMovieById(req.params.movieId);
            res.json(movie);
        } catch (e) {
            return res.status(404).json({error: "Movie not found!"});
        }

    })
    .delete(async (req, res) => {
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
            await movieData.removeMovie(req.params.movieId);
            res.json({movieId: req.params.movieId, deleted: true});
        } catch (e) {
            return res.status(500).json({error: e});
        }
    })
    .put(async (req, res) => {
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

        let updatedMovieInfo = req.body;
        try {
            updatedMovieInfo.title = helpers.checkTitle(updatedMovieInfo.title);
            updatedMovieInfo.plot = helpers.checkPlot(updatedMovieInfo.plot);
            updatedMovieInfo.genres = helpers.checkGenres(updatedMovieInfo.genres);
            updatedMovieInfo.rating = helpers.checkRating(updatedMovieInfo.rating);
            updatedMovieInfo.studio = helpers.checkStudio(updatedMovieInfo.studio);
            updatedMovieInfo.director = helpers.checkDirector(updatedMovieInfo.director);
            updatedMovieInfo.castMembers = helpers.checkCastMembers(updatedMovieInfo.castMembers);
            updatedMovieInfo.dateReleased = helpers.checkDateReleased(updatedMovieInfo.dateReleased);
            updatedMovieInfo.runtime = helpers.checkRuntime(updatedMovieInfo.runtime);

        } catch (e) {
            return res.status(400).json({error: e});
        }
        try {
            const updateMovie = await movieData.updateMovie(
                req.params.movieId,
                updatedMovieInfo.title,
                updatedMovieInfo.plot,
                updatedMovieInfo.genres,
                updatedMovieInfo.rating,
                updatedMovieInfo.studio,
                updatedMovieInfo.director,
                updatedMovieInfo.castMembers,
                updatedMovieInfo.dateReleased,
                updatedMovieInfo.runtime,
            );
            res.json(updateMovie);
        } catch (e) {
            res.sendStatus(500);
        }
    });

module.exports = router;

