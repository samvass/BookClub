const express = require("express");
const bookController = require("../controllers/bookController");

const router = express.Router();

const auth = require("./middleware/auth");

// load book by name
router.get('/get/:bookName', bookController.getBookByName);

// get book recommendation
//router.get('/get', auth.isLoggedIn, bookController.getBookRecommendation);

router.get('/get/by/genre/:genre', bookController.getBookRecommendationByGenre);

router.post('/accept', auth.isLoggedIn, bookController.acceptBookRecommendation);

router.post('/reject', bookController.rejectBookRecommendation);

module.exports = router;