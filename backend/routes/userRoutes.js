const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

// base url: /users

// get all users
router.get('/get', userController.getUsers);

// get user by username
// :username -> dynamic route (/users/get/username)
router.get('/get/:username', userController.getByUsername);

// create a user
router.post('/create', userController.createAccount);

module.exports = router;


