const express = require("express");

const router = express.Router();

const userHandlers = require("./userHandlers.js");

router.get("/users", userHandlers.getUsersList);
router.post("/users", userHandlers.signUpUser);
router.patch("/user/:id", userHandlers.updateUserById);

module.exports = router;
