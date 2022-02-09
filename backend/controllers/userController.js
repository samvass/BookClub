const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

exports.getUsers = (req, res, next) => {

    // take the user schema and find all instances
    User.find().then(users => {
        res.json({allUsers: users});
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
    User.find({username: username}).then(user => {
        // return the user
        res.json({user: user});
    })
    .catch(err => {
        // log any possible errors after connecting to mongo
        console.log(err);
    });
};

exports.createAccount = (req, res, next) => {

    // this should be using req.body but its not working...
    const username = req.query.username;
    const email = req.query.email;
    const password = req.query.password;

    // encrypt password
    return bcrypt.hash(password, 12).then(hashedPassword => {
        // create the new user
        const user = new User({
            username: username,
            email: email,
            password: hashedPassword
        });
    
        return user.save();
    })
    .then(result => {
        console.log(result);
    })
    .catch(err => {
        console.log(err);
    });

};