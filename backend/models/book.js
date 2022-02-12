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
        unique: true
    }
});

module.exports = mongoose.model('Book', bookSchema);