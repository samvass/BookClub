const express = require("express");
const bookController = require("../controllers/bookController");

const router = express.Router();

// load random book
router.get('/get/:bookName', bookController.getBookByName);

module.exports = router;