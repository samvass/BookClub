const request = require("supertest");
const assert = require("assert");
const mongoose = require("mongoose");
const User = require("../../../models/user");
const { Given, When, Then, AfterAll } = require("@cucumber/cucumber");

const app = require("../../../app");
const session = require("express-session");

let data = {
    username: "",
    password: "",
};

let logoutData = {
    sessionID: "",
};

Given(
    "user with username {string}, password {string}, and email {string} exists in the system:",
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
    "user {string} with password {string} is logged in",
    async (string, string2) => {
        data.username = string;
        data.password = string2;
        await request(app)
            .post("/users/login")
            .set("Accept", "application/json")
            .send(data);
    }
);

Given(
    "the user {string} has books, including book {string} in their library",
    async (string, string2) => {
        let res = await mongoose.connection
            .collection("sessions")
            .findOne({ "session.user.username": string });

        let sessionID = res._id;

        // accept book
        res = await request(app)
            .post("/books/accept")
            .set("Accept", "application/json")
            .set("Authorization", sessionID)
            .send({
                title: string2,
                author: "author",
                description: "idk",
                thumbnail: "thumbnail",
                genre: ["adventure"],
            });
    }
);

When("the user {string} views their library", (string) => {
    console.log("user views library");
});

Then("the user {string} will see their liked books", async (string) => {
    let user = await User.findOne({ username: string });
    assert(user.myLibrary[0] != null);
});

Given("a user is not logged in", () => {
    console.log("user not logged in");
});

When("the user selects the My Library tab", () => {
    console.log("user presses My Library");
});

Then(
    "the user will be prompted to login and a message {string} will appear",
    (string) => {
        
    }
);

// drop collection
AfterAll(function (done) {
    mongoose.connection.db.dropCollection("sessions", function (err, result) {
        done();
    });
    mongoose.connection.db.dropCollection("users", function (err, result) {
        done();
    });
    mongoose.connection.db.dropCollection("books", function (err, result) {
        done();
    });
});