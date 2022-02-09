const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');

const app = express();

// allow cors
app.use(cors())

// support parsing of application/json type post data
app.use(express.json());
app.use(bodyParser.json());

// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// all of the user related routes
app.use('/users', userRoutes);

mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(3001); // launches server on port 3001
    })
    .catch(err => {
        console.log(err);
    });
