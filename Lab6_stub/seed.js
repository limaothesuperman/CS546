const data = require('./data')
const movies = data.movies;
const reviews = data.reviews;
const connection = require('./config/mongoConnection');
const helper = require('./helpers');

const main = async () => {
    const db = await connection.dbConnection();
    await db.dropDatabase();

    console.log("Let's add some movies!");
    console.log("**********************");


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
    const reviewHacker = await reviews.createReview(hackers._id.toString(),
        `Good Review for ${hackers.title}`, "Derrick Rose", "It's a good movie", 5);
    const reviewHacker2 = await reviews.createReview(hackers._id.toString(),
        `Fair Review for ${hackers.title}`, "LeBron James", "It's a fair movie", 3.3);
    const reviewHacker3 = await reviews.createReview(hackers._id.toString(),
        `Bad Review for ${hackers.title}`, "James Harden", "It's a bad movie", 1.2);

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
    const reviewbreakfastClub = await reviews.createReview(breakfastClub._id.toString(),
        `Good Review for ${breakfastClub.title}`, "Derrick Rose", "It's a good movie", 4.9);
    const reviewbreakfastClub2 = await reviews.createReview(breakfastClub._id.toString(),
        `Fair Review for ${breakfastClub.title}`, "LeBron James", "It's a fair movie", 3.5);
    const reviewbreakfastClub3 = await reviews.createReview(breakfastClub._id.toString(),
        `Bad Review for ${breakfastClub.title}`, "James Harden", "It's a bad movie", 2);


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
    const reviewfortyTwo = await reviews.createReview(fortyTwo._id.toString(),
        `Good Review for ${fortyTwo.title}`, "Derrick Rose", "It's a good movie", 5);
    const reviewfortyTwo2 = await reviews.createReview(fortyTwo._id.toString(),
        `Fair Review for ${fortyTwo.title}`, "LeBron James", "It's a fair movie", 3);
    const reviewfortyTwo3 = await reviews.createReview(fortyTwo._id.toString(),
        `Bad Review for ${fortyTwo.title}`, "James Harden", "It's a bad movie", 2.7);


    const blackAdam = await movies.createMovie(
        " Black Adam ",
        "  Nearly 5,000 years after he was bestowed with the almighty powers of the ancient gods--and " +
        "imprisoned just as quickly--Black Adam (Dwayne Johnson) is freed from his earthly tomb, " +
        "ready to unleash his unique form of justice on the modern world.",
        ["Action", "Adventure", "Fantasy"],
        "PG-13 ",
        " Warner Bros Pictures",
        " Jaume ColletSerra",
        [" Dwayne Johnson", " Aldis Hodge", "Noah Centineo", "Sarah Shahi", "Marwan Kenzari"],
        " 10/21/2022",
        " 2h 5min "
    );
    const reviewblackAdam = await reviews.createReview(blackAdam._id.toString(),
        `Good Review for ${blackAdam.title}`, "Derrick Rose", "It's a good movie", 5);
    const reviewblackAdam2 = await reviews.createReview(blackAdam._id.toString(),
        `Fair Review for ${blackAdam.title}`, "LeBron James", "It's a fair movie", 3.3);
    const reviewblackAdam3 = await reviews.createReview(blackAdam._id.toString(),
        `Bad Review for ${blackAdam.title}`, "James Harden", "It's a bad movie", 1.2);


    const EnolaHolmes2 = await movies.createMovie(
        "Enola Holmes 2 ",
        "  The game, it seems, has found its feet again!",
        ["Mystery", " Thriller", "Action", "Adventure", "Crime"],
        "PG-13 ",
        " Netflix",
        "Harry Bradbeer",
        ["Millie Brown", " Henry Cavill", "Helena Carter", "David Thewlis"],
        " 11/04/2022",
        " 2h 8min "
    );
    const reviewEnolaHolmes2 = await reviews.createReview(EnolaHolmes2._id.toString(),
        `Good Review for ${EnolaHolmes2.title}`, "Derrick Rose", "It's a good movie", 5);
    const reviewEnolaHolmes22 = await reviews.createReview(EnolaHolmes2._id.toString(),
        `Fair Review for ${EnolaHolmes2.title}`, "LeBron James", "It's a fair movie", 4.3);
    const reviewEnolaHolmes23 = await reviews.createReview(EnolaHolmes2._id.toString(),
        `Bad Review for ${EnolaHolmes2.title}`, "James Harden", "It's a bad movie", 1.);


    const shawshank = await movies.createMovie(
        "The Shawshank Redemption",
        "  Andy Dufresne (Tim Robbins) is sentenced to two consecutive life terms in prison " +
        "for the murders of his wife and her lover and is sentenced to a tough prison",
        ["Drama"],
        "R",
        " Columbia Pictures",
        "Frank Darabont",
        ["Tim Robbins", " Morgan Freeman", "Bob Gunton", "William Sadler"],
        " 12/21/1999",
        " 2h 22min "
    );
    const reviewshawshank = await reviews.createReview(shawshank._id.toString(),
        `Good Review for ${shawshank.title}`, "Derrick Rose", "It's a good movie", 5);
    const reviewshawshank2 = await reviews.createReview(shawshank._id.toString(),
        `Fair Review for ${shawshank.title}`, "LeBron James", "It's a fair movie", 3.4);
    const reviewshawshank3 = await reviews.createReview(shawshank._id.toString(),
        `Bad Review for ${shawshank.title}`, "James Harden", "It's a bad movie", 3.0);


    const greenMile = await movies.createMovie(
        "The Green Mile",
        "   Beyond his simple, naive nature and a deathly fear of the dark, Coffey seemed to possess " +
        "a prodigious, supernatural gift. Paul began to " +
        "question whether Coffey was truly guilty of murdering the two girls.",
        ["Drama", "Fantasy"],
        "R",
        "Warner Bros Pictures",
        "Frank Darabont",
        ["Tom Hanks", "David Morse", "Michael Duncan", "Bonnie Hunt"],
        " 06/13/2000",
        "3h 9min "
    );
    const reviewgreenMile = await reviews.createReview(greenMile._id.toString(),
        `Good Review for ${greenMile.title}`, "Derrick Rose", "It's a good movie", 5);
    const reviewgreenMile2 = await reviews.createReview(greenMile._id.toString(),
        `Fair Review for ${greenMile.title}`, "LeBron James", "It's a fair movie", 4.2);
    const reviewgreenMile3 = await reviews.createReview(greenMile._id.toString(),
        `Bad Review for ${greenMile.title}`, "James Harden", "It's a bad movie", 3.0);


    const hero = await movies.createMovie(
        "Hero",
        "In this visually arresting martial arts epic set in ancient China, an unnamed fighter (Jet Li) " +
        "is being honored for defeating three of the king's most dangerous enemies.",
        ["Romantic", "History", "Drama", "Sports"],
        "PG-13",
        "Miramax Films",
        "Yimou Zhang",
        ["Jet Lii", "Tony Leung", "Maggie Cheung", "Donnie Yen"],
        " 08/27/2004",
        "1h 33min "
    );
    const reviewhero = await reviews.createReview(hero._id.toString(),
        `Good Review for ${hero.title}`, "Derrick Rose", "It's a good movie", 5);
    const reviewhero2 = await reviews.createReview(hero._id.toString(),
        `Fair Review for ${hero.title}`, "LeBron James", "It's a fair movie", 3.0);
    const reviewhero3 = await reviews.createReview(hero._id.toString(),
        `Bad Review for ${hero.title}`, "James Harden", "It's a bad movie", 2.3);


    const friday = await movies.createMovie(
        "Friday",
        "It's Friday and Craig Jones (Ice Cube) has just gotten fired for stealing cardboard boxes.",
        ["History", "Drama"],
        "R",
        "New Line Cinema",
        "FGary Gray",
        ["Ice Cube", "Chris Tucker", "Nia Long", "Tommy Lister"],
        " 03/2/1999",
        "1h 31min "
    );
    const reviewfriday = await reviews.createReview(friday._id.toString(),
        `Good Review for ${friday.title}`, "Derrick Rose", "It's a good movie", 5);
    const reviewfriday2 = await reviews.createReview(friday._id.toString(),
        `Fair Review for ${friday.title}`, "LeBron James", "It's a fair movie", 3.9);
    const reviewfriday3 = await reviews.createReview(friday._id.toString(),
        `Bad Review for ${friday.title}`, "James Harden", "It's a bad movie", 3.6);


    const rocky2 = await movies.createMovie(
        "Rocky II",
        "Rocky II is a movie that dares you to root again for the ultimate underdog" +
        " -- and succeeds due to an infectiously powerful climax.",
        ["Drama"],
        "PG",
        "United Artists",
        "Sylvester Stallone",
        ["Sylvester Stallone", "Talia Shire", "Burgess Meredith", "Burt Young"],
        " 2/8/2005",
        "1h 59min "
    );
    const reviewrocky2 = await reviews.createReview(rocky2._id.toString(),
        `Good Review for ${rocky2.title}`, "Derrick Rose", "It's a good movie", 5);
    const reviewrocky22 = await reviews.createReview(rocky2._id.toString(),
        `Fair Review for ${rocky2.title}`, "LeBron James", "It's a fair movie", 3.8);
    const reviewrocky23 = await reviews.createReview(rocky2._id.toString(),
        `Bad Review for ${rocky2.title}`, "James Harden", "It's a bad movie", 1.7);


    // console.log(await movies.getMovieById(fortyTwo._id.toString()));
    //
    // console.log(await reviews.getAllReviews(fortyTwo._id.toString()));
    //
    // console.log(await reviews.getReview(review._id.toString()));
    //
    //console.log(await reviews.removeReview(reviewrocky23._id.toString()));

    await connection.closeConnection();
    console.log('Done seeding database!');
};

main().catch(console.log);