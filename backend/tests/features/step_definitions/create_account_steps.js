const request = require('supertest');
const assert = require('assert');
const mongoose = require('mongoose');
const { Given, When, Then, AfterAll } = require('@cucumber/cucumber');

const app = require("../../../app");

let req;

Given('a user tries to create an account', () => {
    console.log("a user tries to create an account")
});

When('a user enters a username {string}, email {string}, and password {string}', (string, string2, string3) => {
    // create an account
    req = request(app)
        .post('/users/create')
        .set('Accept', 'application/json')
        .send({ username: string, email: string2, password: string3 })
});

Then('a new account will be created with username {string}, email {string}, and password {string}', async (string, string2, string3) => {
    // wait for creating account to finish
    await req;

    // get the account
    request(app)
        .get('/users/get/' + string)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
            let user = response.body.user[0]
            assert(user.username, string);
            assert(user.email, string2);
        })
});

Then('an error message {string} is issued', (string) => {
    // TODO
})

// drop collection
AfterAll(function (done) {
    mongoose.connection.db.dropCollection("users", function(
        err,
        result
    ) {
        console.log("Collection droped");
        done();
    });
});