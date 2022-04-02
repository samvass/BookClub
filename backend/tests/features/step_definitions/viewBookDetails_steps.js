const mongoose = require("mongoose");
const request = require("supertest");
const assert = require("assert");
const { Given, When, Then, AfterAll } = require("@cucumber/cucumber");

const app = require("../../../app");

let book_title = "";

Given(
  "the following book information is available in the BookClub system",
  function (dataTable) {}
);

When(
  "a user requests the details of the book with title {string}",
  function (string) {
    book_title = string;
  }
);

Then("the following book information is generated", async function (dataTable) {
  const res = await request(app)
    .get("/books/get/" + book_title)
    .set("Accept", "application/json");

  let [title, author, publisher, publishedDate] = dataTable.rawTable[1];
  const book = res.body.data.book;

  assert(book.length != 0);
  assert(book[0].title == title);
  assert(book[0].authors[0] == author);
  assert(book[0].publishedDate == publishedDate);
});

Given(
  "the book with title {string} is unavailable in the BookClub system",
  function (string) {}
);

Then("the error message {string} is generated", async (string) => {
  res = await request(app)
    .get("/books/get/" + book_title)
    .set("Accept", "application/json");
  //assert(res.body.data.book.length == 0);
  assert(res.body.message == string);
});

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
