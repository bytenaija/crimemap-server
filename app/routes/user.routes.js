const express = require('express');
const crimes = require("../controllers/crime.controllers");
const router = express.Router();

const users = require("../controllers/user.controllers.js");

    router.post("/login", users.login);
    router.post("/register", users.register);
    router.get("/forget/:userId", users.forget);
    router.get("/", users.getUser);
    //router.get("/logout/:userId", users.logout);
    

module.exports = router;

