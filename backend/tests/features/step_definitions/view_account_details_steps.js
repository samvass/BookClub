const request = require("supertest");
const assert = require("assert");
const mongoose = require("mongoose");
const { Given, When, Then, AfterAll } = require("@cucumber/cucumber");

const app = require("../../../app");

let data = {
  username: "",
  email: "",
  password: "",
};

Given("the user the user with username {string} is logged in is logged in", async (string) => {
    data.username = string
    data.email = "andrew12@gmail.com"
    data.password = "$Pickles1212"

    await request(app)
    .post("/users/login")
    .set("Accept", "application/json")
    .send(data);

  const username = string;
  const result = await mongoose.connection
    .collection("sessions")
    .findOne({ "session.user.username": username });
  console.log("user is logged in");
});

When(
  "the user selects the My Account tab", () => {
    await request(app)
    .get("/users/myAccount")
  }
);

Then(
  "the user will be directed to the My Account page", () => {
    assert(app.route == "../myAccount")
}
);

Then(
    "the user will be prompted to login", () => {
        assert(app.route == "../login")
    }
  );

// drop collection
AfterAll(function (done) {
  mongoose.connection.db.dropCollection("users", function (err, result) {
    console.log("Collection droped");
    done();
  });
});
