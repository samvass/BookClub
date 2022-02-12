const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const emailValidator = require("email-validator");
const passwordValidator = require('password-validator');



const User = require('../models/user');
const { response } = require('express');

exports.getUsers = (req, res, next) => {

    // take the user schema and find all instances
    User.find().then(users => {
        res.json({ allUsers: users });
    })
        .catch(err => {
            // log any possible errors after connecting to mongo
            console.log(err);
        });
};

exports.getByUsername = (req, res, next) => {

    // get the username parameter from the get request
    const username = req.params.username;

    // take the user schema and find all instances
    User.find({ username: username }).then(user => {
        // return the user
        res.json({ user: user });
    })
        .catch(err => {
            // log any possible errors after connecting to mongo
            console.log(err);
        });
};

exports.createAccount = async (req, res, next) => {

    var error = [];

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    // TODO: validate username, email, password

    // // check username or email doesn't already exist
    const userExists = await User.findOne({ username: username}) ? true : false;
    const emailExists = await User.findOne({email: email}) ? true : false;

    if (userExists || emailExists){
        error.push("username or email already exists");
    }

    // validate email
    if(!emailValidator.validate(email)){
        error.push("invalid email");

    }

    // validate password
    const passwordSchema = new passwordValidator();
    passwordSchema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(1)                                // Must have at least 1 digits
    .has().symbols(1)                               // Must have at least 1 symbol
    .has().not().spaces()                           // Should not have spaces

    if (!passwordSchema.validate(password)){
        error.push("invalid password");

    }

    if (error.length > 0) {
        return res.status(404).send({
            data: {},
            error: error
        });
    }
        
    // encrypt password
    let hashedPassword = await bcrypt.hash(password, 12);
    

    // create the new user
    const user = new User({
        username: username,
        email: email,
        password: hashedPassword
    });

    
    await user.save();

    return res.json({
        data: user,
        error: error
    });
};

exports.login = async (req, res, next) => {

    // get the credentials
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({ username: username });

    if (!user){
        return res.status(401).send('user does not exist');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    console.log("login successful: " + passwordMatches);

    // login the user
    if (passwordMatches) {
        req.session.isLoggedIn = true;
        req.session.user = user;
        await req.session.save();
    }

    // return error
    else {
        return res.status(404).send('incorrect password');
    }
}

exports.logout = async (req, res, next) => {
    console.log("logging out...");
    const err = await req.session.destroy();
    console.log(err);
};