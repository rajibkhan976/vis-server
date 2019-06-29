const express = require("express");

const router = express.Router();

const userHandlers = require("./userHandlers.js");

router.get("/users", userHandlers.getUsersList);
router.post("/users", userHandlers.addUser);

module.exports = router;
