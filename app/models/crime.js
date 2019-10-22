const mongoose = require('mongoose');

const CrimeSchema = mongoose.Schema(
  {
    details: String,
    type: String,
    date: Date,
    location: {
      type: { type: String },
      coordinates: []
    },
    address: String,
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User"
    },
    views: [
      {
        _id: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "Views"
        }
      }
    ],

    commentLists: [
      {
        _id: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "Comment"
        }
      }
    ],

    voteLists: [
      {
        _id: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "Vote"
        }
      }
    ]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

CrimeSchema.index({ location: "2dsphere" });

CrimeSchema.virtual('viewCount', {
  ref: 'Views',
  localField: 'views._id',
  foreignField: '_id'
})

CrimeSchema.virtual("comments", {
  ref: "Comment",
  localField: "commentLists._id",
  foreignField: "_id"
});

CrimeSchema.virtual("votes", {
  ref: "Vote",
  localField: "voteLists._id",
  foreignField: "_id"
});



module.exports = mongoose.model('Crime', CrimeSchema);