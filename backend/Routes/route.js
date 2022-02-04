const express = require("express")
const controller = require("../Controllers/controller")

const router = express.Router();

router.get('/', controller.helloController);

module.exports = router;


