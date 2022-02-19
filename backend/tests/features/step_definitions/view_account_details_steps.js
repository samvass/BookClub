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


Given('the user with username {string} is logged in', async (string) => {
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



When('the user selects the My Account page', async () => {
    await request(app)
    .get("/users/myAccount")
  });


Then('the user will be directed to the My Account page, showing username and email', async () => {
    await request(app)
      .get("/users/get/" + data.username)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        let user = response.body.user;
        assert(user.username, data.username);
        assert(user.email, data.email);
      });
    });

Given('the user with username {string} is not logged in', (string) => {
    mongoose.connection.db.dropCollection("users", function (err, result) {
        console.log("Collection droped");
      });
    
});

Then("the user will be prompted to login", async () => {
    console.log("User is not logged in");
    });

// drop collection
AfterAll(function (done) {
  mongoose.connection.db.dropCollection("users", function (err, result) {
    console.log("Collection droped");
    done();
  });
});
