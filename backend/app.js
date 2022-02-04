const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();

const route = require('./Routes/route');

const app = express()
app.use(route);

mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(3000); // launches server on port 5000
    })
    .catch(err => {
        console.log(err);
    });
