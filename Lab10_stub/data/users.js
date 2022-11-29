const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.user_collection;
const helpers = require('../helpers');
const bcrypt = require('bcrypt');
const saltRounds = 16;


const createUser = async (
    username, password
) => {
    if (!username || !password)
        throw "You must enter both Username and Password!";
    username = helpers.checkUsername(username);
    password = helpers.checkPassword(password);
    const hashedPw = await bcrypt.hash(password, saltRounds);
    const userCollection = await users();
    let newUser = {
        username: username,
        password: hashedPw
    };
    const dupUser = await userCollection.findOne({'username': username});
    if (dupUser === null) {
        const insertInfo = await userCollection.insertOne(newUser);
        if (!insertInfo.acknowledged || !insertInfo.insertedId)
            throw "Could not add user!";
        return {insertedUser: true};
    } else {
        throw "There is already a user with that username you are providing!";
    }
};

const checkUser = async (username, password) => {
    if (!username || !password)
        throw "You must enter both Username and Password!";
    username = helpers.checkUsername(username);
    password = helpers.checkPassword(password);
    const userCollection = await users();
    const validUser = await userCollection.findOne({'username': username});
    if (validUser === null)
        throw "Either the username or password is invalid!";
    else {
        let compareResult = await bcrypt.compare(password, validUser.password);
        if (compareResult)
            return {authenticatedUser: true};
        else
            throw "Either the username or password is invalid!";
    }
};

module.exports = {createUser, checkUser};
