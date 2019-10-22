const mongoose = require("mongoose");

const VotesSchema = mongoose.Schema(
  {
    incidentId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Crime"
    },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User"
    },
    vote: Number
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Vote", VotesSchema);
