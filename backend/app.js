const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// allow cors
app.use(cors());

// support parsing of application/json type post data
app.use(express.json());
app.use(bodyParser.json());

// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// user related routes
app.use('/users', userRoutes);

// google books api related routes
app.use('/books', bookRoutes);

app.use('/auth', authRoutes);

mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(3001); // launches server on port 3001
    })
    .catch(err => {
        console.log(err);
    });

module.exports = app;