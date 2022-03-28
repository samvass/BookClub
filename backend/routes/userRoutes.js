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
router.post('/logout', auth.isLoggedIn, userController.logout);

// change password
router.put('/update', auth.isLoggedIn, userController.changePassword);

// delete account
router.delete('/delete', auth.isLoggedIn, userController.deleteAccount);

// get user library
router.get('/get/myLibrary/:username', userController.viewMyLibrary);

// set user library
router.post('/set/myLibrary/:username', userController.setMyLibrary);

// get user preferences
router.get('/get/preferences/:username', userController.getPreferences);

// set user preferences
router.post("/set/preferences/:username", userController.setPreferences)

// get user read books
router.get('/get/myReadBook/:username', userController.getMyReadBooks);

// set user read books
router.post('/set/myReadBook/:username', userController.markBookAsRead);

// get user unread books
router.get('/get/myUnReadBook/:username', userController.getMyUnReadBooks);

// set user unread books
router.post('/set/myUnReadBook/:username', userController.markBookAsUnRead);

module.exports = router;


