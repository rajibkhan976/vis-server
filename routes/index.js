const express = require("express");

const router = express.Router();

const userHandlers = require("./userHandlers.js");

router.get("/users", userHandlers.getUsersList);
router.post("/users", userHandlers.signUpUser);
router.patch("/user/:id", userHandlers.updateUserById);
router.delete("/user/:id", userHandlers.removeUserById);
router.post("/user", userHandlers.signInUser);

module.exports = router;
