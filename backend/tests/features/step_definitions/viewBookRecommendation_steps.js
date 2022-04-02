const request = require("supertest");
const assert = require("assert");
const mongoose = require("mongoose");
const { Given, When, Then, AfterAll } = require("@cucumber/cucumber");

const app = require("../../../app");

let data = {
  username: "",
  password: "",
};

let sessionID = "";

Given(
  "a user with username {string} and password {string} is logged in",
  async (string, string2) => {
    // Write code here that turns the phrase above into concrete actions
    data.username = string;
    data.password = string2;

    const res = await request(app)
      .post("/users/login")
      .set("Accept", "application/json")
      .send(data);

    sessionID = res.sessionID;
  }
);

When(
  "username {string} requests to view book recommendations",
  function (string) {
    console.log("Get book recommendation");
  }
);

Then("a list of recommended books is generated", async () => {
  // login
  let res = await request(app)
    .post("/users/login")
    .set("Accept", "application/json")
    .send(data);

  sessionID = res.body.sessionID;

  res = await request(app)
    .get("/books/get/by/genre/adventure")
    .set("Accept", "application/json")
    .set("Authorization", sessionID);
  assert(res.body.data.book != null);
});

Given("a user with username {string} is not logged in", function (string) {
  console.log("user is not logged in");
});

Then("an error message {string} is generated", async (string) => {
  const res = await request(app)
    .get("/books/get")
    .set("Accept", "application/json")
    .set("Authorization", "");
  assert(res.body.error == string);
});
