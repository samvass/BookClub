const express = require("express");
const bookController = require("../controllers/bookController");

const router = express.Router();

// load book by name
router.get('/get/:bookName', bookController.getBookByName);

router.get('/get/genre/:bookGenre', bookController.getBooksByGenre);

module.exports = router;