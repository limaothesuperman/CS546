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
        runtime: runtime.trim()
    }

    const insertInfo = await movieCollection.insertOne(newMovie);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
        throw "Could not add movie!";

    const newId = insertInfo.insertedId.toString();

    return await getMovieById(newId);

};

const getAllMovies = async () => {
    const movieCollection = await movies();
    const movieList = await movieCollection.find().toArray();
    if (!movieList)
        throw "Could not get all movies!";

    for (const temp of movieList) {
        temp._id = temp._id.toString();
    }
    return movieList;
};

const getMovieById = async (id) => {
    if (!id)
        throw "Id input is not provided!";
    else if (typeof id !== "string")
        throw "Id input must be a string!";
    else if (id.trim().length === 0)
        throw "Id cannot be an EMPTY string!";
    else {

        id = id.trim();
        if (!ObjectId.isValid(id))
            throw "Object ID is not valid!";
        const movieCollection = await movies();
        const movie = await movieCollection.findOne({_id: ObjectId(id)});
        if (movie === null)
            throw "No movie with that id!";
        movie._id = movie._id.toString();
        return movie;
    }
};

const removeMovie = async (id) => {
    if (!id)
        throw "Id input is not provided!";
    else if (typeof id !== "string")
        throw "Id input must be a string!";
    else if (id.trim().length === 0)
        throw "Id cannot be an EMPTY string!";
    else {
        id = id.trim();
        if (!ObjectId.isValid(id))
            throw "Object ID is not valid!";

        let movieTitle = (await getMovieById(id)).title;

        const movieCollection = await movies();
        const deletionInfo = await movieCollection.deleteOne({_id: ObjectId(id)});

        if (deletionInfo.deletedCount === 0)
            throw `Could not delete movie with id of ${id}`;

        return `${movieTitle} has been successfully deleted!`;

    }
};

const renameMovie = async (id, newName) => {
    if (!id)
        throw "Id input is not provided!";
    else if (typeof id !== "string")
        throw "Id input must be a string!";
    else if (id.trim().length === 0)
        throw "Id cannot be an EMPTY string!";
    else {
        id = id.trim();
        if (!ObjectId.isValid(id))
            throw "Object ID is not valid!";
        helpers.checkTitle(newName);

        newName = newName.trim();
        let curMovie = await getMovieById(id);
        // if(curMovie.title.trim() === newName)
        //     throw "NewName input is SAME as current value!";

        const movieCollection = await movies();
        const updatedMovie = {
            title: newName.trim(),
            plot: curMovie.plot,
            genres: curMovie.genres,
            rating: curMovie.rating,
            studio: curMovie.studio,
            director: curMovie.director,
            castMembers: curMovie.castMembers,
            dateReleased: curMovie.dateReleased,
            runtime: curMovie.runtime
        };

        const updatedInfo = await movieCollection.updateOne(
            {_id: ObjectId(id)},
            {$set: updatedMovie}
        );
        if (updatedInfo.modifiedCount === 0)
            throw "Could not update movie successfully!";

        return await getMovieById(id);
    }

};

module.exports = {
    createMovie,
    getAllMovies,
    getMovieById,
    renameMovie,
    removeMovie
};
