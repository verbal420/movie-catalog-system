const express = require("express");
const { register, login } = require("../controllers/user");

const router = express.Router();

// User routes
router.post("/register", register);
router.post("/login", login);

module.exports = router;