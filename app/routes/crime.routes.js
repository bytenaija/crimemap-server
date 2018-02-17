    const express = require('express');
    const crimes = require("../controllers/crime.controllers");
    const router = express.Router();
    const user = require("../controllers/user.controllers");
   

    //get all crimes
    router.get("/crimes", crimes.findAll);


     //get all crimes
    // router.get("/addcrimes", crimes.getForm);


// add a crime
router.post("/crimes", user.verifyToken, crimes.addCrime);
 
//return a crime based on ID
router.get("/crime/:crimeId", user.verifyToken, crimes.findOne);


//update a crime
router.put("/crime/:crimeId", user.verifyToken, crimes.editCrime);


//delete a crime
router.delete("/crime/:crimeId", user.verifyToken, crimes.delete);

/*
//return filter of crimes based on params
router.post("/api/crimes/filter", crimes.filter);

//return crimes based on distance
router.post("/api/crimes/bounds/:distance", crimes.radius);
 */
    
module.exports = router;