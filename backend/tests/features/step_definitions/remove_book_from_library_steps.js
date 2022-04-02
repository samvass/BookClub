const request = require("supertest");
const assert = require("assert");
const mongoose = require("mongoose");
const User = require("../../../models/user");
const Book = require("../../../models/book");
const { Given, When, Then, AfterAll } = require("@cucumber/cucumber");

const app = require("../../../app");
const session = require("express-session");

// let data = {
//   //username: "",
//   removedbook: "",
// };

When("user {string} removes the {string} book", (string, string2) => {
  console.log("users removes book");
});

Then(
  "user {string} will no longer see {string} in their library",
  async (string, string2) => {
    let book = await Book.findOne({ title: string2 });

    // data.removedbook = book;

    await request(app)
      .post("/users/set/myLibrary/" + string)
      .set("Accept", "application/json")
      .send({
        removedBook: book
      });

    let user = await User.findOne({ username: string });

    assert(user.myLibrary.includes(book._id) == false);
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
