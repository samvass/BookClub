const express = require("express");
const bookController = require("../controllers/bookController");

const router = express.Router();

// load book by name
router.get('/get/:bookName', bookController.getBookByName);

router.get('/get/db/:bookName', bookController.getBookByNameInDatabase);

// get book recommendation
router.get('/get', bookController.getBookRecommendation);

router.get('/get/by/genre/:genre', bookController.getBookRecommendationByGenre);

router.post('/accept', bookController.acceptBookRecommendation);

router.post('/reject', bookController.rejectBookRecommendation);

router.post('/set/rating/:bookName', bookController.setBookRating);

module.exports = router;