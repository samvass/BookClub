const request = require("supertest");
const assert = require("assert");
const mongoose = require("mongoose");
const User = require("../../../models/user");
const Book = require("../../../models/book");
const { Given, When, Then, AfterAll } = require("@cucumber/cucumber");

const app = require("../../../app");

let book = "";

When(
  "user {string} rejects the book with title {string} recommendation",
  async (string, string2) => {
    // find sessionID
    let res = await mongoose.connection
      .collection("sessions")
      .findOne({ "session.user.username": string });

    // let user = await User.find();
    // console.log("----------user",user)

    // reject book
    res = await request(app)
      .post("/books/reject")
      .set("Accept", "application/json")
      .send({
        title: string2,
        author: "author",
        description: "description",
        thumbnail: "thumbnail",
        genre: ["adventure"],
      });

    book = string2;

    // console.log(user.myLibrary)
  }
);

Then(
  "the book {string} will not be added to user {string} library",
  async (string, string2) => {
    let user = await User.findOne({ username: string2 });
    let book = await Book.findOne({ title: string });
    // console.log("assert---", user.myLibrary)
    assert(book == null || user.myLibrary.includes(book._id) == false);
  }
);
