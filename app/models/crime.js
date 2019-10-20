const mongoose = require('mongoose');

const CrimeSchema = mongoose.Schema({
    details : String,
    type : String,
    date: Date,
    location: {
        type: { type: String },
        coordinates: []
    },
    address : String,
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },

}, {
    timestamps: true
    });

CrimeSchema.index({ location: "2dsphere" });

module.exports = mongoose.model('Crime', CrimeSchema);