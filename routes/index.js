const express = require("express");

const router = express.Router();

const userHandlers = require("./userHandlers.js");

const formalMembersHandlers = require("./registeredMembersHandlers.js");
//routes and methods for managing system users
router.get("/users", userHandlers.getUsersList);
router.post("/users", userHandlers.signUpUser);
router.patch("/user/:id", userHandlers.updateUserById);
router.delete("/user/:id", userHandlers.removeUserById);
router.post("/signin", userHandlers.signInUser);
router.get("/signout", userHandlers.signOutUser);
//routes and methods for handling VIS members registration
router.get("/unapproved_members", formalMembersHandlers.getUnapprovedMembers);
router.post("/register_member", formalMembersHandlers.registerMembers);
module.exports = router;
