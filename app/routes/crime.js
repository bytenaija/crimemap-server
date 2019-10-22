const router = require("express").Router();
const crimes = require("../controllers/crimes");
const users = require("../controllers/users");
const votes = require('../controllers/votes')
const comments = require('../controllers/comments');

//get all crimes
router.get("/crimes", crimes.findAll);

// add a crime
router.post("/crimes", users.verifyToken, crimes.addCrime);

//return a crime based on ID
router.get("/crimes/:crimeId", users.verifyToken, crimes.findOne);
router.get("/crimes/:crimeId/views", users.verifyToken, crimes.getViews);

//update a crime
router.put("/crimes/:crimeId", users.verifyToken, crimes.editCrime);

//delete a crime
router.delete("/crimes/:crimeId", users.verifyToken, crimes.delete);


router.get("/crimes/:incidentId/:vote", users.verifyToken, votes.vote);
router.post("/crimes/:incidentId/comment", users.verifyToken, comments.addComment);


module.exports = router;
