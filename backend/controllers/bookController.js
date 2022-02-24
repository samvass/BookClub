var books = require('google-books-search');
var mongoose = require('mongoose');

const User = require('../models/user');
const Book = require('../models/book');


const googleAPIKey = process.env.GOOGLE_API_KEY;

exports.getBookByName = (req, res, next) => {

    var options = {
        key: googleAPIKey,
        offset: 0,
        field: 'title',
        limit: 1,
        type: 'books',
        order: 'relevance',
        lang: 'en'
    };

    const bookName = req.params.bookName;

    books.search(bookName, options, function (error, results, apiResponse) {

        // adjust size of the thumbnail
        const newURL = results[0].thumbnail.replace("zoom=1", "zoom=1");

        results[0].thumbnail = newURL;

        if (!error) {
            return res.status(200).send({
                data: {
                    book: results
                },
                message: "",
                error: {}
            });
        }

        return res.status(404).send({
            data: {},
            message: "Error",
            error: {
                err: error
            }
        });
    });
}

exports.getBookRecommendation = (req, res, next) => {

    var options = {
        key: googleAPIKey,
        offset: 0,
        field: 'title',
        limit: 10,
        type: 'books',
        order: 'relevance',
        lang: 'en'
    };

    // hardcode for now
    const bookName = "Software";

    books.search(bookName, options, function (error, results, apiResponse) {
        if (!error) {
            return res.status(200).send({
                data: {
                    book: results
                },
                message: "",
                error: {}
            });
        }

        return res.status(404).send({
            data: {},
            message: "Error",
            error: {
                err: error
            }
        });
    });
}

exports.getBookRecommendationByGenre = (req, res, next)=>{

    var options = {
        key: googleAPIKey,
        offset: 0,
        field: 'subject',
        limit: 40,
        type: 'books',
        order: 'relevance',
        lang: 'en'
    };

    // get one of the genres of the user
    const bookGenre = req.params.genre;

    // generate random index between 0 and 39
    const index = Math.floor(Math.random() * 40);
    
    books.search(bookGenre, options, function(error, results, apiResponse) {
        if ( ! error ) {
            return res.status(200).send({
                data: {
                    book: results[index]
                },
                message: "",
                error: {}
            });
        }

        return res.status(404).send({
            data: {},
            message: "Error",
            error: {
                err: error
            }
        });
    });
}

exports.acceptBookRecommendation = async (req, res, next) => {
    // get book information from request body
    const title = req.body.title;
    const description = req.body.description;
    const author = req.body.author;
    const genre = req.body.genre;
    const thumbnail = req.body.thumbnail;
    const username = req.body.username;


    const user = await User.findOne({ username: username });

    if (!user) {
        // return error
        return res.status(200).json({
            message: "no user found"
        })
    }

    // check if the book has been previously accepted
    let book = await Book.findOne({ title: title });

    if (!book) {
        // create the book
        bookModel = new Book({
            title: title,
            author: author,
            description: description,
            thumbnail: thumbnail,
            genre: genre
        });
        book = await bookModel.save();
    }

    // store the bookID in the users library
    const bookID = book._id;

    // get current user library
    const library = user.myLibrary;

    // add the new book to it
    library.push(bookID);

    // update the library in db
    await User.updateOne({ username: username }, { $set: { myLibrary: library } });

    return res.status(200).json({
        book: book,
        message: "book was added to the library"
    })
};

exports.rejectBookRecommendation = async (req, res, next) => {

    // since they do not wish to add the book to their library we will not store it in the db

    // we should implement a way to generate the next book from here ...
};