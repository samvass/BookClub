const request = require("supertest");
const assert = require("assert");
const mongoose = require("mongoose");
const { Given, When, Then, AfterAll } = require("@cucumber/cucumber");

const app = require("../../../app");

let data = {
  username: "",
  password: "",
  email: "",
  preferences: [],
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
  (string, string2) => {
    data.username = string;
    data.password = string2;
  }
);

Then(
  "a user will be logged into an account with username {string} and password {string}",
  async (string, string2) => {
    await request(app)
      .post("/users/login")
      .set("Accept", "application/json")
      .send(data);
    const username = string;
    const result = await mongoose.connection
      .collection("sessions")
      .findOne({ "session.user.username": username });

    assert(result.session.user.username == username);
  }
);

Then("an error message {string} will be issued", async (string) => {
  let res = await request(app)
    .post("/users/login")
    .set("Accept", "application/json")
    .send(data);
  assert(res.body.error.length > 0);
  assert(res.body.error.includes(string));
});
