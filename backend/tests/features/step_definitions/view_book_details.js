const request = require("supertest");
const assert = require("assert");
const mongoose = require("mongoose");
const { Given, When, Then, AfterAll } = require("@cucumber/cucumber");

const app = require("../../../app");

Given("the book {string} is available", async (string) => {
  console.log("book is available to request");
});

When("a user requests the details of the book", () => {
  console.log("user views details of book");
});

Then("the book {string} information is generated", async (string) => {
  let res = await request(app)
    .get("/books/get/" + string)
    .set("Accept", "application/json");
  assert(res.body.data.book.length > 0);
});

Given("the book {string} is not available", async (string) => {
  console.log("book not available");
});

Then(
  "the error message {string} is generated for book {string}",
  async (string, string2) => {
    let res = await request(app)
      .get("/books/get/" + string2)
      .set("Accept", "application/json");
    assert(res.body.data.book == "");
  }
);
