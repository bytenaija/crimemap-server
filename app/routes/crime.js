const router = require("express").Router();
const crimes = require("../controllers/crimes");
const users = require("../controllers/users");

//get all crimes
router.get("/crimes", crimes.findAll);

// add a crime
router.post("/crimes", users.verifyToken, crimes.addCrime);

//return a crime based on ID
router.get("/crimes/:crimeId", users.verifyToken, crimes.findOne);

//update a crime
router.put("/crimes/:crimeId", users.verifyToken, crimes.editCrime);

//delete a crime
router.delete("/crimes/:crimeId", users.verifyToken, crimes.delete);


module.exports = router;
