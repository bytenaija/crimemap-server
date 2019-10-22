const mongoose = require("mongoose");

const CommentsSchema = mongoose.Schema(
  {
    incidentId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Crime"
    },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User"
    },
    comment: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Comment", CommentsSchema);
