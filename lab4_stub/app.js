/*

1. Create a Movie of your choice.
2. Log the newly created Movie. (Just that movie, not all movies)
3. Create another movie of your choice.
4. Query all movies, and log them all
5. Create the 3rd movie of your choice.
6. Log the newly created 3rd movie. (Just that movie, not all movies)
7. Rename the first movie
8. Log the first movie with the updated name. 
9. Remove the second movie you created.
10. Query all movies, and log them all
11. Try to create a movie with bad input parameters to make sure it throws errors.
12. Try to remove a movie that does not exist to make sure it throws errors.
13. Try to rename a movie that does not exist to make sure it throws errors.
14. Try to rename a movie passing in invalid data for the newName parameter to make sure it throws errors.
15. Try getting a movie by ID that does not exist to make sure it throws errors.

*/

const movies = require('./data/movies');
const connection = require('./config/mongoConnection');
const helper = require('./helpers');

const main = async () => {
    const db = await connection.dbConnection();
    await db.dropDatabase();


    console.log("Let's add some movies!");

    try {
        // 1
        const hackers = await movies.createMovie(
            "Hackers",
            "Hackers are blamed for making a virus that will capsize five oil tankers.",
            ["Crime", "Drama", "Romance"],
            "PG-13",
            "United Artists",
            "Iain Softley",
            ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"],
            "09/15/1995",
            "1h 45min"
        );
        // 2
        console.log(hackers);
        // 3
        const breakfastClub = await movies.createMovie(
            "The Breakfast Club",
            "Five high school students meet in Saturday detention and discover how they have a lot more in common than they thought.",
            ["Comedy", "Drama"],
            "R",
            "Universal Pictures",
            "John Hughes",
            ["Judd Nelson", "Molly Ringwald", "Ally Sheedy", "Anthony Hall", "Emilio Estevez"],
            "02/07/1985",
            "1h 37min"
        );
        // 4
        console.log(await movies.getAllMovies());
        // 5
        const fortyTwo = await movies.createMovie(
            " 42 ",
            "  In 1947, Jackie Robinson becomes the first African-American to play in Major League Baseball in the modern era when he" +
            " was signed by the Brooklyn Dodgers and faces considerable racism in the process.",
            [" Biography", "  Drama", "Sport"],
            "PG-13 ",
            " Warner Brothers",
            " Brian Helgeland",
            [" Chadwick Boseman", " Harrison Ford", "Nicole Beharie", "Christopher Meloni"],
            " 04/09/2013",
            " 2h 8min "
        );
        // 6
        console.log(fortyTwo);
        // 7
        const updatedFirst = await movies.renameMovie(hackers._id.toString(), "Hackers Plus");
        // 8
        console.log(updatedFirst);
        // 9
        console.log(await movies.removeMovie(breakfastClub._id.toString()));
        // 10
        console.log(await movies.getAllMovies());
        // 11
        try {
            const badInput = await movies.createMovie(
                "42",
                "In 1947, Jackie Robinson becomes the first African-American to play in Major League Baseball in the modern era when he" +
                " was signed by the Brooklyn Dodgers and faces considerable racism in the process.",
                ["Biography", "Drama", "Sport"],
                "Pg-13",
                "Warner Brothers",
                "Brian Helgeland",
                ["Chadwick Boseman", "Harrison Ford", "Nicole Beharie", "Christopher Meloni"],
                "04/09/2013",
                "2H 8min"
            );
        } catch (e) {
            console.log(e);
        }
        // 12
        try {
            await movies.removeMovie("       63432e620de49d3a3807decf");
        } catch (e) {
            console.log(e);
        }
        // 13
        try {
            await movies.renameMovie("63432e610de49d3a3807decf", "Nope");
        } catch (e) {
            console.log(e);
        }
        // 14
        try {
            await movies.renameMovie(fortyTwo._id.toString(), " ");
        } catch (e) {
            console.log(e);
        }
        // 15
        try {
            await movies.getMovieById("63432e610de1233a3807abcd");
        } catch (e) {
            console.log(e);
        }


    } catch (e) {
        console.log(e);
    }

    await connection.closeConnection();
    // console.log('Done!');
};

main();