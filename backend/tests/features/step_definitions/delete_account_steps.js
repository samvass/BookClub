const request = require("supertest");
const assert = require("assert");
const mongoose = require("mongoose");
const { Given, When, Then, AfterAll } = require("@cucumber/cucumber");

const app = require("../../../app");

let data = {
  username: "",
  password: "",
};

// Given(
//   "the following user with username {string}, password {string}, and email {string} exists in the system:",
//   async (string, string2, string3) => {
//     data.username = string;
//     data.password = string2;
//     data.email = string3;

//     await request(app)
//       .post("/users/create")
//       .set("Accept", "application/json")
//       .send(data);
//   }
// );

Given(
  "user {string}, password {string} is logged in",
  async (string, string2) => {
    data.username = string;
    data.password = string2;
    await request(app)
      .post("/users/login")
      .set("Accept", "application/json")
      .send(data);
  }
);

When("user requests to delete their account", () => {
  console.log("user deletes their account");
});

Then("account with username {string} shall be deleted", async (string) => {
  data.username = string;
  await request(app)
    .post("/users/delete")
    .set("Accept", "application/json")
    .send(data);

  // get the account
  await request(app)
    .get("/users/get/" + string)
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .then((response) => {
      assert(response.body.user, null);
    });
});
