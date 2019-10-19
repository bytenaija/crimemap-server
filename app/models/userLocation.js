const mongoose = require('mongoose');

const userLocationSchema = mongoose.Schema({
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
  longitude: Number,
  latitude: Number
}, {
  timestamps: true
  })

module.exports = mongoose.model('UserLocation', userLocationSchema);