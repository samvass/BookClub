const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const emailValidator = require("email-validator");
const passwordValidator = require('password-validator');

const User = require('../models/user');
const Book = require('../models/book');
const { update } = require('../models/user');

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
    User.findOne({ username: username }).then(user => {
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
    const preferences = req.body.preferences;

    // // check username or email doesn't already exist
    const userExists = await User.findOne({ username: username }) ? true : false;
    const emailExists = await User.findOne({ email: email }) ? true : false;

    if (userExists || emailExists) {
        error.push("Username or email already exists");
    }

    // validate email
    if (!emailValidator.validate(email)) {
        error.push("Email must be valid");
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

    if (!passwordSchema.validate(password)) {
        let errorList = passwordSchema.validate(password, { list: true })
        if (errorList.includes("spaces")) {
            error.push("Password cannot contain spaces");
        }
        if (errorList.includes("symbols") || errorList.includes("digits") || errorList.includes("symbols") || errorList.includes("uppercase") || errorList.includes("lowercase")) {
            error.push("Password must contain an upper case, lower case, special character, and number");
        }
        if (errorList.includes("min")) {
            error.push("Password must contain more than 8 characters");
        }
    }

    // validate username
    const usernameSchema = new passwordValidator();
    usernameSchema
        .is().min(5)                                    // Minimum length 5
        .is().max(100)                                  // Maximum length 100
        .has().not().symbols()                          // Should not have symbols
        .has().not().spaces()                           // Should not have spaces

    if (!usernameSchema.validate(username)) {
        let errorList = usernameSchema.validate(username, { list: true })
        if (errorList.includes("spaces")) {
            error.push("Username cannot contain spaces");
        }
        if (errorList.includes("symbols")) {
            error.push("Username must not contain special characters");
        }
        if (errorList.includes("min")) {
            error.push("Username must contain more than 5 characters");
        }
    }

    // check if there is any error
    if (error.length > 0) {
        return res.status(404).send({
            data: {},
            message: "error",
            error: error
        });
    }

    // encrypt password
    let hashedPassword = await bcrypt.hash(password, 12);

    // create the new user
    const user = new User({
        username: username,
        email: email,
        password: hashedPassword,
        preferences: preferences
    });

    await user.save();

    return res.json({
        data: user,
        message: "Account successfully created",
        error: error
    });
};

exports.login = async (req, res, next) => {
    // get the credentials
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({ username: username });

    if (!user) {
        return res.json({
            data: {},
            message: {},
            error: "Username does not exist"
        });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    // login the user
    if (passwordMatches) {
        req.session.isLoggedIn = true;
        req.session.user = user;

        req.session.save(async (err) => {
            if (!err) {
                // try searching the session
                const result = await mongoose.connection.collection('sessions').findOne({ 'session.user.username': username });

                return res.json({
                    data: user,
                    message: "Login Successful",
                    sessionID: result._id,
                    error: {}
                });
            }
        });
    }

    // return error
    else {
        return res.json({
            data: {},
            message: {},
            error: "Incorrect Password"
        });
    }
}

exports.logout = async (req, res, next) => {
    const sessionID = req.body.sessionID;

    // search the db for the session
    const result = await mongoose.connection.collection('sessions').deleteOne({ _id: sessionID });

    if (result.acknowledged) {
        return res.status(200).json({
            message: "logout successful"
        })
    }
    else {
        return res.status(404).json({
            message: "logout error"
        })
    }
};

exports.viewAccountDetails = async (req, res, next) => {
    // get the username parameter from the get request
    const username = req.params.username;
    // search the db for the session
    const result = await mongoose.connection.collection('sessions').findOne({ 'session.user.username': username });

    if (result != null) {
        User.findOne({ username: username }).then(user => {
            // return the user
            res.json({ user: user, sessionID: result._id });
        })
            .catch(err => {
                // log any possible errors after connecting to mongo
                console.log(err);
            });
    }
    else {
        return res.status(401).json({
            data: {},
            message: {},
            error: "user is not logged in"
        });
    }
};

exports.viewMyLibrary = async (req, res, next) => {

    const username = req.params.username;

    // find user in db
    const user = await User.findOne({username: username});

    // if there is no user found
    if (!user) {
        return res.status(404).json({
            message: null,
            error: "user does not exist"
        });
    }

    const myLibrary = user.myLibrary;

    // take each Obj ID and find the corresponding book in the Books collection
    const updatedLibraryPromises = myLibrary.map(async bookID => await Book.findById(bookID));
    const updatedLibrary = await Promise.all(updatedLibraryPromises);
    
    setTimeout(() => {
        return res.status(200).json({
            myLibrary: updatedLibrary,
            message: "successfully retrieved library",
            error: null
        });
        
    }, 1000);
    
};

exports.getPreferences = async (req, res, next) => {
    const username = req.params.username;

    const user = await User.findOne({username: username});

    if (!user) {
        return res.status(404).json({
            error: "user does not exist",
            message: null
        });
    }

    console.log(user.preferences);

    return res.status(200).json({
        data: user.preferences,
        message: "successfully retrieved user preferences",
        error: null
    })
};
