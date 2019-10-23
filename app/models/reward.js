const mongoose = require("mongoose");

const RewardSchema = mongoose.Schema(
  {
    name: String,
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User"
    },
    location: {
      type: { type: String },
      coordinates: []
    },
    address: String,
    startDate: Date,
    endDate: Date,
    criteria: Number,
    reward: Number,
    payout: Number,
    awardees: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }]
  },
  {
    timestamps: true
  }
);

RewardSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Reward", RewardSchema);
