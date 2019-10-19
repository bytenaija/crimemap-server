const express = require('express');
const crimes = require("../controllers/crimes");
const path = require('path');
const router = express.Router();
const multer = require('multer')
const storage = multer.diskStorage({
    destination : (req, file, callback)=>{
        
        callback(null, './uploads/avatar/');
    },
    filename: (req, file, callback)=>{
        callback(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

const users = require("../controllers/users.js/index.js");



    router.post("/login", users.login);
    router.post("/register", users.register);
    router.post("/forget/", users.forget);
    router.get("/", users.getUser);
    router.get("/forget/:userId/:codeId", users.verifyForgetCode)
    router.post("/forget/:userId/", users.changePassword)
    router.post("/avatar/upload", upload.single('avatar'), users.uploadAvatar);
    
    //router.get("/logout/:userId", users.logout);
    
    router.get('/avatar/:userId', users.getImage);

module.exports = router;

