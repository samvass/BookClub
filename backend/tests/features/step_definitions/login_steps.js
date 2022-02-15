const request = require("supertest");
const assert = require("assert");
const mongoose = require("mongoose");
const { Given, When, Then, AfterAll } = require("@cucumber/cucumber");

const app = require("../../../app");

let data = {
  username: "",
  password: "",
};

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

    assert(req.session.user, string);
    console.log("tara");
    console.log(req.session.user);
  }
);
