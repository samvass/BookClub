const request = require("supertest");
const assert = require("assert");
const mongoose = require("mongoose");
const { Given, When, Then, AfterAll } = require("@cucumber/cucumber");

const app = require("../../../app");

let data = {
  username: "",
  email: "",
  password: "",
};

let sessionID = "";

Given("the user with username {string} is logged in", async (string) => {
  data.username = string;
  data.email = "andrew12@gmail.com";
  data.password = "$Pickles1212";

  const res = await request(app)
    .post("/users/login")
    .set("Accept", "application/json")
    .send(data);

  sessionID = res.sessionID;
});

When("the user selects the My Account page", async () => {
  console.log("user selects the my account page");
});

Then(
  "the user will be directed to the My Account page, showing username and email",
  async () => {
    let res = await request(app)
      .post("/users/login")
      .set("Accept", "application/json")
      .send(data);

    sessionID = res.body.sessionID;

    res = await request(app)
      .get("/users/get/" + data.username)
      .set("Accept", "application/json")
      .set("Authorization", sessionID);


    let user = res.body.user;
    assert(user.username, data.username);
    assert(user.email, data.email);
  }
);

Given("the user with username {string} is not logged in", async (string) => {
  console.log("User is not logged in");
});

Then(
  "the user will be prompted to login with the message {string}",
  async (string) => {
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
