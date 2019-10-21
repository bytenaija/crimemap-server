const mongoose = require("mongoose");

const viewsSchema = mongoose.Schema(
  {
    incidentId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Crime"
    },
    userDetails: {
      browser: String,
      country: String,
      city: String,
      ip: String
    }
  },
  {
    timestamps: true
  }
);
