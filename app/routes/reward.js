const router = require("express").Router();
const users = require("../controllers/users");
const rewards = require("../controllers/reward");

router.get("/", users.verifyToken, rewards.findAll);

router.post("/", users.verifyToken, rewards.addReward);

router.get("/:rewardId", users.verifyToken, rewards.findOne);

module.exports = router;
