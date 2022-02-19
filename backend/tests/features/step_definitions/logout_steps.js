const request = require("supertest");
const assert = require("assert");
const mongoose = require("mongoose");
const { Given, When, Then, AfterAll } = require("@cucumber/cucumber");

const app = require("../../../app");

let data = {
    username: "",
    password: "",
};

let logoutData = {
    sessionID: "",
};

Given(
    "the user with username {string}, password {string}, and email {string} exists in the system:",
    async (string, string2, string3) => {
        data.username = string;
        data.password = string2;
        data.email = string3;

        await request(app)
            .post("/users/create")
            .set("Accept", "application/json")
            .send(data);
    }
);

Given(
    "the user {string} with password {string} is logged in",
    async (string, string2) => {
        data.username = string;
        data.password = string2;
        await request(app)
            .post("/users/login")
            .set("Accept", "application/json")
            .send(data);
    }
);

When("the user {string} tries to log out", async (string) => {
    const username = string;
    console.log("user tries to log out");
    const result = await mongoose.connection
        .collection("sessions")
        .findOne({ "session.user.username": string });
    logoutData.sessionID = result._id;
    await request(app)
        .post("/users/logout")
        .set("Accept", "application/json")
        .send(logoutData);
});

Then("the user {string} shall be logged out", async (string) => {
    const username = string;
    const result = await mongoose.connection
        .collection("sessions")
        .findOne({ "session.user.username": username });
    assert(result == null);
});

// drop collection
AfterAll(function (done) {
    mongoose.connection.db.dropCollection("sessions", function (err, result) {
        console.log("Sessions droped");
        done();
    });
    mongoose.connection.db.dropCollection("users", function (err, result) {
        console.log("Users droped");
        done();
    });
});
