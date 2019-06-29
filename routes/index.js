const express = require("express");

const router = express.Router();

const userHandlers = require("./userHandlers.js");

router.get("/users", userHandlers.getUsersList);
router.post("/users", userHandlers.signUpUser);
router.patch("/user/:id", userHandlers.updateUserById);
router.delete("/user/:id", userHandlers.removeUserById);
router.post("/signin", userHandlers.signInUser);
router.get("/signout", userHandlers.signOutUser);

module.exports = router;
