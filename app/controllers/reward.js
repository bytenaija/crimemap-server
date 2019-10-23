const Payment = require("../models/payment");
const Reward = require("../models/reward");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../../config/jwt.config");

module.exports = {
  findAll: async (req, res) => {
    jwt.verify(req.token, jwtConfig.secret, async (err, authData) => {
      if (err) {
        return res.status(403).json(err);
      }
      const rewards = await Reward.find({}).populate("userId");
      res.json({ success: true, rewards });
    });
  },
  addReward: async (req, res) => {
 
    jwt.verify(req.token, jwtConfig.secret, async (err, authData) => {
      if (err) {
        return res.status(403).json(err);
      }
      try {
        req.body.userId = authData.user.id;
        const reward = await Reward.create(req.body);
        const payment = {
          rewardId: reward._id,
          amount: req.body.amount,
          reference: req.body.id
        };
        await Payment.create(payment);

        res.json({ success: true, reward });
      } catch (err) {
        console.log(err)
        res.status(500).json(err);
      }
    });
  },
  findOne: async (req, res) => {
    jwt.verify(req.token, jwtConfig.secret, async (err, authData) => {
      if (err) {
        return res.status(403).json(err);
      }
      const reward = await Reward.find({ _id: req.params.rewardId }).populate(
        "userId"
      );
      res.json({ success: true, reward });
    });
  }
};
