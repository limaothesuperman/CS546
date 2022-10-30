//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.

const validNameFormat = (name) => {
    return /^([a-zA-Z]{3,100}\s[a-zA-Z]{3,100})$/.test(name.trim());
};

const checkTitle = (title) => { // done
    if (!title)
        throw "All fields need to have valid values";
    else if (typeof title !== "string")
        throw "Title input must be a string!";
    else if (title.trim().length === 0)
        throw "Title input cannot be a EMPTY string!";
    else {
        title = title.trim();

        if (title.length < 2)
            throw "Title must be at least two characters!";
        else if (!/^[a-zA-Z0-9\s]+$/.test(title))
            throw "Title can only contains letters and numbers!";
    }

};

const checkPlot = (plot) => { // done
    if (!plot)
        throw "All fields need to have valid values";
    else if (typeof plot !== "string")
        throw "Plot input must be a string!";
    else if (plot.trim().length === 0)
        throw "Plot input cannot be a EMPTY string!";

    plot = plot.trim();

};

const checkGenres = (genres) => { // done
    if (!genres)
        throw "All fields need to have valid values";
    else if (genres.length < 1)
        throw "Genres array must contain AT LEAST one string element!";
    else {
        for (let temp of genres) {
            if (typeof temp !== "string") {
                throw "Genre input must be a string!";
            } else if (temp.trim().length === 0)
                throw "Genre cannot be a EMPTY string!";
            else if (!/^[a-zA-Z\s]+$/.test(temp.trim()) || temp.trim().length < 5)
                throw "Genre format is NOT valid!";
            else
                temp = temp.trim();
        }
    }
};

const checkRating = (rating) => { // done
    let validRating = ["G", "PG", "PG-13", "R", "NC-17"];

    if (!rating)
        throw "All fields need to have valid values";
    else if (typeof rating !== "string")
        throw "Rating input must be a string!";
    else if (rating.trim().length === 0)
        throw "Rating input cannot be a EMPTY string!";
    else {
        rating = rating.trim();

        if (!validRating.includes(rating))
            throw "The rating is not valid (Case sensitive)!";
    }
};

const checkStudio = (studio) => { // done
    if (!studio)
        throw "All fields need to have valid values";
    else if (typeof studio !== "string")
        throw "Studio input must be a string!";
    else if (studio.trim().length === 0)
        throw "Studio input cannot be a EMPTY string!";
    else {
        studio = studio.trim();

        if (studio.length < 5)
            throw "Studio must be at least five characters!";
        else if (!/^[a-zA-Z\s]+$/.test(studio))
            throw "Studio can only contains letters!";
    }
};

const checkDirector = (director) => { // done
    if (!director)
        throw "All fields need to have valid values";
    else if (typeof director !== "string")
        throw "Director input must be a string!";
    else if (director.trim().length === 0)
        throw "Director input cannot be a EMPTY string!";
    else {
        director = director.trim();

        if (!validNameFormat(director))
            throw "The name format is NOT valid!";
    }
};

const checkCastMembers = (castMembers) => { // done
    if (!castMembers)
        throw "All fields need to have valid values";
    else if (castMembers.length < 1)
        throw "CastMembers array must contain AT LEAST one string element!";
    else {
        for (let temp of castMembers) {

            if (typeof temp !== "string")
                throw "Cast member name must be a string!";
            else if (temp.trim().length === 0)
                throw "Cast member name cannot be a EMPTY string!";
            else if (!validNameFormat(temp.trim()))
                throw "The name format is NOT valid!";
            else
                temp = temp.trim();
        }
    }
};

const checkDateReleased = (date) => { // done
    if (!date)
        throw "All fields need to have valid values";
    else if (typeof date !== "string")
        throw "Date input must be a string!";
    else if (date.trim().length === 0)
        throw "Date input cannot be a EMPTY string!";
    else {
        date = date.trim();

        if (!/^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/.test(date))
            throw "Date input format is NOT valid!";

        let month = parseInt(date.split("/")[0], 10);
        let days = parseInt(date.split("/")[1], 10);
        let years = parseInt(date.split("/")[2], 10);
        const monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        const currentYear = 2022;

        if (years < 1900 || years > currentYear + 2)
            throw "Years input is NOT valid!";
        else if (month > 12 || month === 0)
            throw "Month input is NOT valid!";
        else if (days > monthDays[month - 1] || days === 0)
            throw "Days input is NOT valid!";
    }
};

const checkRuntime = (runtime) => { // done
    if (!runtime)
        throw "All fields need to have valid values";
    else if (typeof runtime !== "string")
        throw "Runtime input must be a string!";
    else if (runtime.trim().length === 0)
        throw "Runtime input cannot be a EMPTY string!";
    else {
        runtime = runtime.trim();

        if (!/^[0-9]{1,2}[g-i]\s[0-5]{0,1}[0-9]{0,1}[l-n][h-j][m-o]$/.test(runtime) || runtime.length === 6)
            throw "The runtime input format is NOT valid!";
        else if (Number((runtime.substring(0, runtime.indexOf('h')))) > 9 && runtime.length === 7)
            throw "The runtime input format is NOT valid!";
        else if (Number((runtime.substring(0, runtime.indexOf('h')))) < 1)
            throw "The runtime must be longer than one hour!";
    }
};

module.exports = {
    checkTitle,
    checkPlot,
    checkGenres,
    checkRating,
    checkStudio,
    checkDirector,
    checkCastMembers,
    checkDateReleased,
    checkRuntime
};
