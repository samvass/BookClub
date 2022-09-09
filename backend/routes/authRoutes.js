const express = require("express");

const router = express.Router();
const jwt = require("jsonwebtoken");
const config = process.env;


router.post('/verifyToken', (req, res, next) => {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
  
    if (!token) {
      return res.status(401).send({
          message: "",
          error: "A token is required for authentication"
        })
    }
    try {
      const decoded = jwt.verify(token, config.TOKEN_KEY);
      req.user = decoded;
    } catch (err) {
      return res.status(404).send({
          message: "",
          error: "Invalid Token"
        });
    }
    return res.status(200).send({
      message: "Authentication Successful",
      error: {}
    })
  });

module.exports = router;