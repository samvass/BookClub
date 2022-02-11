const {Given, When, Then} = require('@cucumber/cucumber');

Given('a user tries to create an account', () => {
    console.log("a user tries to create an account")
});
 
When('a user enters a username {string}, email {string}, and password {string}', (string, string2, string3) => {
    console.log(string, string2, string3)
});
 
Then('a new account will be created with username {string}, email {string}, and password {string}', (string, string2, string3) => {
    console.log(string, string2, string3)
});

Then('an error message {string} is issued', (string) => {
    console.log(string)
})