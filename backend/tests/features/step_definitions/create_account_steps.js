const request = require("supertest");
const assert = require("assert");
const mongoose = require("mongoose");
const { Given, When, Then, AfterAll } = require("@cucumber/cucumber");

const app = require("../../../app");

let data = {
  username: "",
  email: "",
  password: "",
  preferences: [],
};

Given("a user tries to create an account", () => {
  console.log("a user tries to create an account");
});

When(
  "a user enters a username {string}, email {string}, and password {string}",
  (string, string2, string3) => {
    data.username = string;
    data.email = string2;
    data.password = string3;
  }
);

Then(
  "a new account will be created with username {string}, email {string}, and password {string}",
  async (string, string2, string3) => {
    // create an account
    await request(app)
      .post("/users/create")
      .set("Accept", "application/json")
      .send(data);

    // get the account
    await request(app)
      .get("/users/get/" + string)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        let user = response.body.user;
        assert(user.username, string);
        assert(user.email, string2);
      });
  }
);

Then("an error message {string} is issued", async (string) => {
  // create an account
  let res = await request(app)
    .post("/users/create")
    .set("Accept", "application/json")
    .send(data);

  assert(res.body.error.length > 0);
  assert(res.body.error.includes(string));
});
