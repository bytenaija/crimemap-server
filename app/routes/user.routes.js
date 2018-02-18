const express = require('express');
const crimes = require("../controllers/crime.controllers");
const router = express.Router();

const users = require("../controllers/user.controllers.js");

    router.post("/login", users.login);
    router.post("/register", users.register);
    router.post("/forget/", users.forget);
    router.get("/", users.getUser);
    router.get("/forget/:userId/:codeId", users.verifyForgetCode)
    router.post("/forget/:userId/", users.changePassword)
    //router.get("/logout/:userId", users.logout);
    

module.exports = router;

