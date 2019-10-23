const mongoose = require("mongoose");

const PaymentSchema = mongoose.Schema(
  {
    rewardId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Reward"
    },
    reference: {
    type: String
    },
    amount: Number,
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Payment", PaymentSchema);
