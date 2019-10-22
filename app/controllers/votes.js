const Crime = require("../models/crime");
const Vote = require("../models/vote");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../../config/jwt.config");

module.exports = {
  vote: async (req, res) => {
    jwt.verify(req.token, jwtConfig.secret, async (err, authData) => {
      if (err) {
        return res.status(403).json(err);
      }
      const { incidentId, vote } = req.params;
      const userId = authData.user.id;
      try {
        let existingVote = await Vote.findOne({ userId, incidentId });
        let crime;
        if (existingVote) {
          existingVote.vote = vote;
          await existingVote.save();
          crime = await Crime.findById(incidentId)
            .populate({ path: "userId", select: "_id username" })
            .populate("viewCount")
            .populate({
              path: "comments",
              populate: {
              path: "userId",
              model: "User",
              select: "username _id"
            }
            })
            .populate("votes");
        } else {
          existingVote = await Vote.create({ userId, incidentId, vote });
          crime = await Crime.findById(incidentId)
            .populate({ path: "userId", select: "_id username" })
            .populate("viewCount")
            .populate({
              path: "comments",
              populate: {
              path: "userId",
              model: "User",
              select: "username _id"
            }
            })
            .populate("votes");
          if (!Array.isArray(crime.voteLists)) {
            crime.voteLists = [];
          }
          crime.voteLists.push({ _id: existingVote._id });
          await crime.save();
        }
        res.json({
          success: true,
          message: "You successfully cast your vote",
          crime
        });
      } catch (err) {
        res.status(500).json(err);
      }
    });
  }
};
