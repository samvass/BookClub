const request = require("supertest");
const assert = require("assert");
const mongoose = require("mongoose");
const User = require("../../../models/user");
const Book = require("../../../models/book");
const { When, Then, AfterAll } = require("@cucumber/cucumber");

const app = require("../../../app");

When(
  "user {string} accepts the book with title {string} recommendation",
  async (string, string2) => {
    // find sessionID
    let res = await mongoose.connection
      .collection("sessions")
      .findOne({ "session.user.username": string });

    let sessionID = res._id;

    // accept book
    res = await request(app)
      .post("/books/accept")
      .set("Accept", "application/json")
      .set("Authorization", sessionID)
      .send({
        title: string2,
        author: "author",
        description: "description",
        thumbnail: "thumbnail",
        genre: ["adventure"],
      });
  }
);

Then(
  "the book {string} will be added to user {string} library",
  async (string, string2) => {
    let user = await User.findOne({ username: string2 });
    let book = await Book.findOne({ title: string });

    assert(user.myLibrary[0].equals(book._id));
  }
);

When(
  "the user accepts the book with title {string} recommendation",
  async (string) => {
    // accept book
    let res = await request(app)
      .post("/books/accept")
      .set("Accept", "application/json")
      .set("sessionID", "")
      .send({
        title: string,
        author: "author",
        description: "description",
        thumbnail: "thumbnail",
        genre: ["adventure"],
      });

    assert(res.status == 401);
  }
);
