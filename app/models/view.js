const mongoose = require("mongoose");

const viewsSchema = mongoose.Schema(
  {
    incidentId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Crime"
    },
    userDetails: {
      browser: String,
      geo: {},
      ip: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Views", viewsSchema)
