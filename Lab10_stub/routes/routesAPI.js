//require express, express router and bcrypt as shown in lecture code
const express = require('express');
const router = express.Router();
const helpers = require('../helpers');
const data = require('../data');
const userData = data.users;

router
    .route('/')
    .get(async (req, res) => {
        //code here for GET
        if (req.session.user)
            res.redirect('/protected');
        else {
            res.render('userLogin', {title: "Log In"});
        }
    });

router
    .route('/register')
    .get(async (req, res) => {
        //code here for GET
        if (req.session.user)
            res.redirect('/protected');
        else {
            res.render('userRegister', {title: "Register"});
        }
    })
    .post(async (req, res) => {
        //code here for POST
        let username = req.body.usernameInput;
        let password = req.body.passwordInput;
        try {
            username = helpers.checkUsername(username);
            password = helpers.checkPassword(password);
            const goodInsertedUser = await userData.createUser(username, password);
            if (goodInsertedUser.insertedUser) {
                res.redirect('/');
            } else {
                return res.status(500).render('userRegister',
                    {
                        title: "Error",
                        error: "Internal Server Error"
                    });
            }
        } catch (e) {
            return res.status(400).render('userRegister',
                {
                    title: "Error",
                    error: e
                });
        }
    });

router
    .route('/login')
    .post(async (req, res) => {
        //code here for POST
        let username = req.body.usernameInput;
        let password = req.body.passwordInput;
        try {
            username = helpers.checkUsername(username);
            password = helpers.checkPassword(password);
            const goodAuthenticatedUser = await userData.checkUser(username, password);
            if (goodAuthenticatedUser.authenticatedUser) {
                req.session.user = {username: username};
                res.redirect('/protected');
            } else {
                return res.status(400).render('userLogin',
                    {
                        title: "Error",
                        error: "You must provide a valid username and/or password!"
                    });
            }
        } catch (e) {
            return res.status(400).render('userLogin',
                {
                    title: "Error",
                    error: e
                });
        }
    });

router
    .route('/protected')
    .get(async (req, res) => {
        //code here for GET
        res.render('private', {
            title: "Private Page",
            username: req.session.user.username,
            date: new Date()
        });
    });

router
    .route('/logout')
    .get(async (req, res) => {
        //code here for GET
        req.session.destroy();
        res.render('logout', {title: "Logged Out"});
    });

module.exports = router;