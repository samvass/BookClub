const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

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

    // this should be using req.body but its not working...
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    // TODO: validate username, email, password
    if (email.indexOf('@') > -1){
        return res.status(404).send('Invalid email');
    }

    // encrypt password
    let hashedPassword = await bcrypt.hash(password, 12);

    // create the new user
    const user = new User({
        username: username,
        email: email,
        password: hashedPassword
    });

    try {
        await user.save();
    }

    // check that username and email are unique
    catch(error){
        res.status(401).json('Username or email already exists');
    }

    return res.json(user);
};

exports.login = async (req, res, next) => {

    // get the credentials
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({username: username});

    const passwordMatches = await bcrypt.compare(password, user.password);
    
    console.log("login successful: " + passwordMatches);

    // login the user
    if (passwordMatches){
        req.session.isLoggedIn = true;
        req.session.user = user;
        await req.session.save();
    }

    // return error
    else {
        return res.status(404).send('incorrect password');   
    }
}

exports.logout = (req, res, next) => {
    console.log("logging out...");
    req.session.destroy(err => {
        console.log("logout done");
    })
};