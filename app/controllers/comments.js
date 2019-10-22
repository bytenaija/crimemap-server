const Comment = require("../models/comment");
const Crime = require("../models/crime");
const jwt = require("jsonwebtoken");
const jwtConfig = require("../../config/jwt.config");

module.exports = {
  addComment: async (req, res) => {
    jwt.verify(req.token, jwtConfig.secret, async (err, authData) => {
      if (err) {
        return res.status(403).json(err);
      }
      const { incidentId } = req.params;
      const { comment } = req.body;
      try {
        const data = {
          userId: authData.user.id,
          comment,
          incidentId
        };
        const { _id } = await Comment.create(data);
        let crime = await Crime.findById(incidentId);
        if (!Array.isArray(crime.commentLists)) {
          crime.commentLists = [];
        }
        crime.commentLists.push(_id);
        await crime.save();

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

        res.json({
          success: true,
          message: "You have successfully added a comment to this incident",
          crime
        });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    });
  }
};
