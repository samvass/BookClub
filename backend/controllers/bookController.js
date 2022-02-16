var books = require('google-books-search');

const googleAPIKey = process.env.GOOGLE_API_KEY;

exports.getBookByName = (req,res,next)=>{

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
    
    books.search(bookName, options, function(error, results, apiResponse) {
        if ( ! error ) {
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

exports.getBooksByGenre = (req,res,next) => {

    var options = {
        key: googleAPIKey,
        offset: 0,
        field: 'subject',
        limit: 40,
        type: 'books',
        order: 'relevance',
        lang: 'en'
    };

    const genre = req.params.genre;
    
    books.search(genre, options, function(error, results, apiResponse) {
        if ( ! error ) {
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