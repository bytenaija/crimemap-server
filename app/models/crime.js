const mongoose = require('mongoose');

const CrimeSchema = mongoose.Schema({
    title : String,
    details : String,
    type : String,
    date: String,
    location: {
        type: { type: String },
        coordinates: []
    },
    address : String,
    longitude : Number,
    latitude : Number,
    state : String,
    country : String,
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    town: String

}, {
    timestamps: true
    });

CrimeSchema.index({ location: "2dsphere" });

module.exports = mongoose.model('Crime', CrimeSchema);