const request = require("supertest");
const assert = require("assert");
const mongoose = require("mongoose");
const { Given, When, Then, AfterAll } = require("@cucumber/cucumber");

const app = require("../../../app");
const { db } = require("../../../models/user");

let data = {
  username: "",
  password: "",
  email: "",
};

Given(
  "the following user with username {string}, password {string}, and email {string} exists in the system:",
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

Given("a user tries to login to an account", () => {
  console.log("a user tries to login to an account");
});

When(
  "a user enters a username {string} and password {string}",
  async (string, string2) => {
    data.username = string;
    data.password = string2;
    await request(app)
      .post("/users/login")
      .set("Accept", "application/json")
      .send(data);
  }
);

Then(
  "a user will be logged into an account with username {string} and password {string}",
  async (string, string2) => {
    await request(app)
      .post("/users/login")
      .set("Accept", "application/json")
      .send(data)
    const username = string;
    const result = await mongoose.connection.collection('sessions').findOne({'session.user.username': username});
    console.log(result);
    assert(result != null);
    
  }
);

// drop collection
AfterAll(function (done) {
  mongoose.connection.db.dropCollection("users", function (err, result) {
    console.log("Collection droped");
    done();
  });
});
