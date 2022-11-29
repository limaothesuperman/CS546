// Setup server, session and middleware here.

// const data = require('./data')
// const users = data.users;
// const connection = require('./config/mongoConnection');
//
// const main = async () => {
//     const db = await connection.dbConnection();
//     await db.dropDatabase();
//
//     console.log("Let's add some users!");
//     console.log("**********************");
//
//     await users.createUser("maoli123123", "asdasdAD12!");
//     await users.createUser("   mAoLIa123123   ", "asdD12@");
//     console.log(
//         await users.checkUser("   m   Aoa1   ", "asdD1   2@"));
//
//
//     await connection.closeConnection();
//     console.log('Done seeding database!');
// };
//
// main().catch(console.log);

const express = require('express');
const app = express();
const session = require('express-session');
const configRoutes = require('./routes');
const static = express.static(__dirname + '/public');
const exphbs = require('express-handlebars');

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(session({
    name: 'AuthCookie',
    secret: 'some secret string!',
    resave: false,
    saveUninitialized: true
}));

app.use('/protected', async (req, res, next) => {
    if (!req.session.user) {
        return res.status(403).render('forbiddenAccess', {title: "403 Forbidden Access"});
    } else {
        next();
    }
});
app.use(async (req, res, next) => {
    const time = new Date().toUTCString();
    const method = req.method;
    const url = req.originalUrl;
    let usertype = "";
    if (!req.session.user) {
        usertype = "(Non-Authenticated User)";
    } else {
        usertype = "(Authenticated User)";
    }
    console.log(`${time}: ${method} ${url} ${usertype}`);
    next();
});

configRoutes(app);
app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
});