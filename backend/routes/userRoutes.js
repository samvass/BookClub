const express = require("express");
const userController = require("../controllers/userController");

const auth = require("./middleware/auth");
const router = express.Router();

// base url: /users

// get all users
router.get('/get', userController.getUsers);

// get user by username
// :username -> dynamic route (/users/get/username)
router.get('/get/:username', userController.getByUsername);

// create a user
router.post('/create', userController.createAccount);

// login user
router.post('/login', userController.login);

// logout user
router.post('/logout', userController.logout);

// view user
router.get('/view/:username', userController.viewAccountDetails);

module.exports = router;


