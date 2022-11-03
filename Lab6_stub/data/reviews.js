const mongoCollections = require('../config/mongoCollections');
const movies = mongoCollections.movies;
const helpers = require('../helpers');
const {ObjectID, ObjectId} = require('mongodb');
const movieData = require('./movies');

const createReview = async (
        movieId,
        reviewTitle,
        reviewerName,
        review,
        rating
    ) => {
        if (!movieId)
            throw "Id input is not provided!";
        else if (typeof movieId !== "string")
            throw "Id input must be a string!";
        else if (movieId.trim().length === 0)
            throw "Id cannot be an EMPTY string!";
        else {
            movieId = movieId.trim();
            if (!ObjectId.isValid(movieId))
                throw "Object ID is not valid!";
            const movieCollection = await movies();
            const movie = await movieCollection.findOne({_id: ObjectId(movieId)});
            if (movie === null)
                throw "No movie with that id!";

            reviewTitle = helpers.checkReviewTitle(reviewTitle);
            reviewerName = helpers.checkReviewerName(reviewerName);
            review = helpers.checkReview(review);
            rating = helpers.checkReviewRating(rating);

            const date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            // console.log(`${month}/${day}/${year}`);

            const newReview = {
                _id: new ObjectId().toString(),
                reviewTitle: reviewTitle,
                reviewDate: `${month}/${day}/${year}`,
                reviewerName: reviewerName,
                review: review,
                rating: rating
            }

            const insertInfo = await movieCollection.updateOne(
                {_id: ObjectId(movieId)},
                {$push: {reviews: newReview}}
            );
            if (!insertInfo.matchedCount && !insertInfo.modifiedCount)
                throw "Could not add review!";

            const selectedMovie = await movieData.getMovieById(movieId);
            let allRating = 0;
            for (let temp of selectedMovie.reviews) {
                allRating += temp.rating;
            }
            await movieCollection.updateOne(
                {_id: ObjectId(movieId)},
                {$set: {overallRating: allRating / selectedMovie.reviews.length}}
            );
            return newReview;
        }
    }
;

const getAllReviews = async (movieId) => {
    if (!movieId)
        throw "Id input is not provided!";
    else if (typeof movieId !== "string")
        throw "Id input must be a string!";
    else if (movieId.trim().length === 0)
        throw "Id cannot be an EMPTY string!";
    else {
        movieId = movieId.trim();
        if (!ObjectId.isValid(movieId))
            throw "Object ID is not valid!";
        const movieCollection = await movies();
        const movie = await movieCollection.findOne({_id: ObjectId(movieId)});
        if (movie === null)
            throw "No movie with that id!";
        const selectedMovie = await movieData.getMovieById(movieId);
        return selectedMovie.reviews;

    }

};

const getReview = async (reviewId) => {
    if (!reviewId)
        throw "Id input is not provided!";
    else if (typeof reviewId !== "string")
        throw "Id input must be a string!";
    else if (reviewId.trim().length === 0)
        throw "Id cannot be an EMPTY string!";
    else {
        reviewId = reviewId.trim();
        if (!ObjectId.isValid(reviewId))
            throw "Object ID is not valid!";
        const movieCollection = await movies();
        const movie = await movieCollection.findOne(
            {'reviews._id': reviewId}
        );
        if (movie === null)
            throw "No review with that id!"
        for (let temp of movie.reviews) {
            if (temp._id === reviewId)
                return temp;
        }
    }
};

const removeReview = async (reviewId) => {
    if (!reviewId)
        throw "Id input is not provided!";
    else if (typeof reviewId !== "string")
        throw "Id input must be a string!";
    else if (reviewId.trim().length === 0)
        throw "Id cannot be an EMPTY string!";
    else {
        reviewId = reviewId.trim();
        if (!ObjectId.isValid(reviewId))
            throw "Object ID is not valid!";
        const movieCollection = await movies();
        const movie = await movieCollection.findOne(
            {'reviews._id': reviewId}
        );
        if (movie === null)
            throw "No review with that id!"
        for (let i = 0; i < movie.reviews.length; i++) {
            if (movie.reviews[i]._id === reviewId) {
                movie.reviews.splice(i, 1);
            }
        }
        let allRating = 0;
        for (let temp of movie.reviews) {
            allRating += temp.rating;
        }
        movie.overallRating = allRating / movie.reviews.length;
        if (isNaN(movie.overallRating))
            movie.overallRating = 0;

        await movieCollection.updateOne(
            {_id: ObjectId(movie._id.toString())},
            {$set: movie}
        );
        return await movieData.getMovieById(movie._id.toString());
    }
};

module.exports = {
    createReview,
    getAllReviews,
    getReview,
    removeReview
};
