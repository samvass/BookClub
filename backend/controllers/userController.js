const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const emailValidator = require("email-validator");
const passwordValidator = require('password-validator');
const jwt = require('jsonwebtoken');

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

const validateUserAccountInput = async (username, email, password) => {

    const errors = []

    const usernameSchema = new passwordValidator();
    usernameSchema
        .is().min(5)
        .is().max(25)                            
        .has().not().symbols()                       
        .has().not().spaces()                       

    if (!usernameSchema.validate(username)) {
        let errorList = usernameSchema.validate(username, { list: true })
        if (errorList.includes("spaces")) {
            errors.push("Username cannot contain spaces");
        }
        if (errorList.includes("symbols")) {
            errors.push("Username must not contain special characters");
        }
        if (errorList.includes("min")) {
            errors.push("Username must contain more than 5 characters");
        }
        if (errorList.includes("max")) {
            errors.push("Username must contain less than 25 characters");
        }

        return errors
    }

    if (!emailValidator.validate(email)) {
        errors.push("Email must be valid");
        return errors
    }

    const userExists  = await User.findOne({ username: username }) ? true : false;
    const emailExists = await User.findOne({ email: email }) ? true : false;

    if (userExists || emailExists) {
        errors.push("Username or email already exists");
        return errors
    }

    const passwordSchema = new passwordValidator();
    passwordSchema
        .is().min(8)                                 
        .is().max(100)                                
        .has().uppercase()                          
        .has().lowercase()                          
        .has().digits(1)                             
        .has().symbols(1)
        .has().not().spaces()                          

    if (!passwordSchema.validate(password)) {
        let errorList = passwordSchema.validate(password, { list: true })
        if (errorList.includes("spaces")) {
            errors.push("Password cannot contain spaces");
        }
        if (errorList.includes("symbols") || errorList.includes("digits") || errorList.includes("symbols") || errorList.includes("uppercase") || errorList.includes("lowercase")) {
            errors.push("Password must contain an upper case, lower case, special character, and number");
        }
        if (errorList.includes("min")) {
            errors.push("Password must contain more than 8 characters");
        }
        return errors
    }

}

exports.createAccount = async (req, res, next) => {

    const {username,email,password,preferences} = req.body

    const errors = await validateUserAccountInput(username, email, password)
    // if (errors.length > 0 ) {
    //     return res.status(404).send({
    //         data: {},
    //         message: "create user account validation error",
    //         error: errors
    //     });
    // }

    let hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
        username: username,
        email: email,
        password: hashedPassword,
        preferences: preferences,
        readBook: [],
        unreadBook: []
    });

    await user.save();

    // Create token
    const token = jwt.sign(
        { user_id: user._id },
        process.env.TOKEN_KEY,
        {expiresIn: "2h",});
        // save user token
        user.token = token;

    return res.json({
        data: user,
        message: "Account successfully created",
        error: errors
    });
};

exports.changePassword = async (req, res, next) => {
    var error = [];

    const { oldPassword, newPassword, newPassword2, username } = req.body;

    // check username or email doesn't already exist
    const user = await User.findOne({ username: username });
    if (user == null) {
        error.push("Username does not exist");
        return res.status(404).send({
            data: {},
            error: error
        });
    }

    // check if password match
    const passwordMatches = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatches) {
        error.push("Password does not match");
    }

    // check if new passwords match
    if (newPassword.localeCompare(newPassword2) !== 0) {
        error.push("New passwords do not match");
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

    if (!passwordSchema.validate(newPassword)) {
        let errorList = passwordSchema.validate(newPassword, { list: true })
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

    // check if there is any error
    if (error.length > 0) {
        return res.status(404).send({
            data: {},
            error: error
        });
    }

    // hash password
    let hashedPassword = await bcrypt.hash(newPassword, 12);

    // update the password
    await User.updateOne(
        { username: username },
        { $set: { password: hashedPassword } }
    );

    return res.json({
        data: user,
        error: error
    });
};

exports.login = async (req, res, next) => {
    const {username, password} = req.body;

    const user            = await User.findOne({ username: username });
    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!user || !passwordMatches) {
        return res.json({
            data: {},
            message: {},
            error: "Invalid Credentials"
        });
    }

    const token = jwt.sign(
        { user_id: user._id },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

    // save user token
    user.token = token;

    return res.json({
        data: user,
        message: "Login Successful",
        error: {}
    });
}

exports.logout = async (req, res, next) => {
    // TODO
};

exports.viewMyLibrary = async (req, res, next) => {

    const username = req.params.username;

    // find user in db
    const user = await User.findOne({ username: username });

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

exports.setMyLibrary = async (req, res, next) => {
    const username = req.params.username;
    const removedBook = req.body.removedBook;

    const processedBook = await Book.findById(removedBook._id)

    // find user in db
    const user = await User.findOne({ username: username });

    // if there is no user found
    if (!user) {
        return res.status(404).json({
            message: null,
            error: "user does not exist"
        });
    }

    const myLibrary = user.myLibrary;

    // take each Obj ID and find the corresponding book in the Books collection
    const updatedMyLibrary = myLibrary.filter((book) => {
        return !book.equals(processedBook._id)
    })


    const updatedLibraryPromises = updatedMyLibrary.map(async bookID => await Book.findById(bookID));
    const updatedLibrary = await Promise.all(updatedLibraryPromises);

    await User.updateOne(
        { username: username },
        { $set: { myLibrary: updatedLibrary } }
    );

    setTimeout(() => {
        return res.status(200).json({
            myLibrary: user.myLibrary,
            message: "successfully retrieved library",
            error: null
        });

    }, 100);
};

exports.getPreferences = async (req, res, next) => {
    const username = req.params.username;

    const user = await User.findOne({ username: username });

    if (!user) {
        return res.status(404).json({
            error: "user does not exist",
            message: null
        });
    }

    return res.status(200).json({
        data: user.preferences,
        message: "successfully retrieved user preferences",
        error: null
    })
};

exports.setPreferences = async (req, res, next) => {
    const username = req.params.username;
    const preferences = req.body.preferences

    const user = await User.findOne({ username: username });

    if (!user) {
        return res.status(404).json({
            error: "user does not exist",
            message: null
        });
    }

    user.preferences = preferences;
    await User.updateOne(
        { username: username },
        { $set: { preferences: preferences } }
    );

    return res.status(200).json({
        data: user.preferences,
        message: "successfully set user preferences",
        error: null
    })
};

exports.deleteAccount = async (req, res, next) => {
    const { username, sessionID } = req.body;

    const user = await User.findOne({ username: username });

    if (!user) {
        return res.status(404).json({
            error: "User does not exist",
            data: ""
        });
    }

    // delete the user
    await User.deleteOne(
        { username: username }
    );

    // delete the session
    await mongoose.connection.collection('sessions').deleteOne({ _id: sessionID });

    return res.status(200).json({
        data: "Account deleted successfully",
        error: ""
    })
};

exports.getMyReadBooks = async (req, res, next) => {
    const username = req.params.username;

    // find user in db
    const user = await User.findOne({ username: username });

    // if there is no user found
    if (!user) {
        return res.status(404).json({
            message: null,
            error: "user does not exist"
        });
    }

    const myReadBooks = user.readBook;

    // take each Obj ID and find the corresponding book in the Books collection
    const updatedReadBooksPromises = myReadBooks.map(async bookID => await Book.findById(bookID));
    const updatedReadBooks = await Promise.all(updatedReadBooksPromises);
    // console.log(updatedReadBooks)

    setTimeout(() => {
        return res.status(200).json({
            myList: updatedReadBooks,
            message: "successfully retrieved library",
            error: null
        });

    }, 1000);
};

exports.markBookAsRead = async (req, res, next) => {
    // since they do not wish to add the book to their library we will not store it in the db
    // we should implement a way to generate the next book from here ...

    // get book information from request body
    const username = req.params.username;
    const title = req.body.title;

    const user = await User.findOne({ username: username });

    if (!user) {
        // return error
        return res.status(200).json({
            message: "no user found",
        });
    }

    let book = await Book.findOne({ title: title });
    if (!book) {
        return res.status(200).json({
            message: "no book found",
        });
    }

    if (user.readBook.includes(book._id)){
        return res.status(200).json({
            message: "book was already added as read",
        });
    }

    // store the bookID in the users library
    const bookID = book._id;

    // get current user read book
    const rBook = user.readBook;

    // add the new book to it
    rBook.push(bookID);

    // update the read list in db
    await User.updateOne(
        { username: username },
        { $set: { readBook: rBook } }
    );

    // console.log(book)

    return res.status(200).json({
        book: book,
        message: "book was added to the read list",
    });
};

exports.getMyUnReadBooks = async (req, res, next) => {
    const username = req.params.username;

    // find user in db
    const user = await User.findOne({ username: username });

    // if there is no user found
    if (!user) {
        return res.status(404).json({
            message: null,
            error: "user does not exist"
        });
    }

    const myUnReadBooks = user.unreadBook;

    // take each Obj ID and find the corresponding book in the Books collection
    const updatedUnReadBooksPromises = myUnReadBooks.map(async bookID => await Book.findById(bookID));
    const updatedUnReadBooks = await Promise.all(updatedUnReadBooksPromises);
    // console.log(updatedReadBooks)

    setTimeout(() => {
        return res.status(200).json({
            myList: updatedUnReadBooks,
            message: "successfully retrieved library",
            error: null
        });

    }, 1000);
};

exports.markBookAsUnRead = async (req, res, next) => {
    // since they do not wish to add the book to their library we will not store it in the db
    // we should implement a way to generate the next book from here ...

    // get book information from request body
    const username = req.params.username;
    const title = req.body.title;

    const user = await User.findOne({ username: username });

    if (!user) {
        // return error
        return res.status(200).json({
            message: "no user found",
        });
    }

    let book = await Book.findOne({ title: title });
    if (!book) {
        return res.status(200).json({
            message: "no book found",
        });
    }

    // if (!user.readBook.includes(book._id)){
    //     return res.status(200).json({
    //         message: "book was not added as read",
    //     });
    // }

    // store the bookID in the users library
    const bookID = book._id;

    // get current user read books
    const rBook = user.readBook;

    // remove the book from read book list
    for(var i = 0; i < rBook.length; i++) {
        if(rBook[i].equals(bookID)) {
            rBook.splice(i, 1);
            break;
        }
    }

    // update the read list in db
    await User.updateOne(
        { username: username },
        { $set: { readBook: rBook } }
    );

    console.log(book)

    return res.status(200).json({
        book: book,
        message: "book was added to the read list",
    });
};