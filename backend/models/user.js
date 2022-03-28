const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },

    myLibrary: [{
        type: Schema.Types.ObjectId,
        ref: "Book"
    }], 

    preferences : [{
        type: String,
    }],

    readBook : [{
        type: Schema.Types.ObjectId,
        ref: "Book",
        default: []
    }],
});

module.exports = mongoose.model('User', userSchema);