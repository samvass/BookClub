const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        unique: true
    },
    author: {
        type: String
    },
    description: {
        type: String,
    },
    thumbnail: {
        type: String
    },
    genre: [
        {
            type: String
        }
    ],
    rating: {
        type: Number,
        default: 0
    },
    ratingCount: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Book', bookSchema);