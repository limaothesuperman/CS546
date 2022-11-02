const mongoCollections = require('../config/mongoCollections');
const movies = mongoCollections.movies;
const helpers = require('../helpers');
const {ObjectID, ObjectId} = require('mongodb');

const createMovie = async (
    title,
    plot,
    genres,
    rating,
    studio,
    director,
    castMembers,
    dateReleased,
    runtime
) => {
    helpers.checkTitle(title);
    helpers.checkPlot(plot);
    helpers.checkGenres(genres);
    helpers.checkRating(rating);
    helpers.checkStudio(studio);
    helpers.checkDirector(director);
    helpers.checkCastMembers(castMembers);
    helpers.checkDateReleased(dateReleased);
    helpers.checkRuntime(runtime);

    const movieCollection = await movies();


    let newMovie = {
        title: title.trim(),
        plot: plot.trim(),
        genres: genres.map(element => {
            return element.trim();
        }),
        rating: rating.trim(),
        studio: studio.trim(),
        director: director.trim(),
        castMembers: castMembers.map(element => {
            return element.trim();
        }),
        dateReleased: dateReleased.trim(),
        runtime: runtime.trim(),
        reviews: [],
        overallRating: 0
    }

    const insertInfo = await movieCollection.insertOne(newMovie);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
        throw "Could not add movie!";

    const newId = insertInfo.insertedId.toString();

    return await getMovieById(newId);

};

const getAllMovies = async () => {
    const movieCollection = await movies();
    // const movieList = await movieCollection.find().toArray();
    // For meeting the routes requirements
    const movieList = await movieCollection.find({}, {projection: {_id: 1, title: 1}}).toArray();
    if (!movieList)
        throw "Could not get all movies!";

    for (const temp of movieList) {
        temp._id = temp._id.toString();
    }
    return movieList;
};

const getMovieById = async (movieId) => {
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
        movie._id = movie._id.toString();
        return movie;
    }
};

const removeMovie = async (movieId) => {
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

        let movieTitle = (await getMovieById(movieId)).title;

        const movieCollection = await movies();
        const deletionInfo = await movieCollection.deleteOne({_id: ObjectId(movieId)});

        if (deletionInfo.deletedCount === 0)
            throw `Could not delete movie with id of ${movieId}`;

        return `${movieTitle} has been successfully deleted!`;

    }
};

const updateMovie = async (
    movieId,
    title,
    plot,
    genres,
    rating,
    studio,
    director,
    castMembers,
    dateReleased,
    runtime
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

        title = helpers.checkTitle(title);
        plot = helpers.checkPlot(plot);
        genres = helpers.checkGenres(genres);
        rating = helpers.checkRating(rating);
        studio = helpers.checkStudio(studio);
        director = helpers.checkDirector(director);
        castMembers = helpers.checkCastMembers(castMembers);
        dateReleased = helpers.checkDateReleased(dateReleased);
        runtime = helpers.checkRuntime(runtime);


        let updatedMovie = {
            title: title,
            plot: plot,
            genres: genres,
            rating: rating,
            studio: studio,
            director: director,
            castMembers: castMembers,
            dateReleased: dateReleased,
            runtime: runtime
        }

        const updatedInfo = await movieCollection.updateOne(
            {_id: ObjectId(movieId)},
            {$set: updatedMovie}
        );
        if (!updatedInfo.matchedCount && !updatedInfo.modifiedCount)
            throw "Updated failed";

        return await getMovieById(movieId);

    }
};

// const renameMovie = async (id, newName) => {
//     //Not used for this lab
// };

module.exports = {
    createMovie,
    getAllMovies,
    getMovieById,
    removeMovie,
    updateMovie,
    //renameMovie
};
