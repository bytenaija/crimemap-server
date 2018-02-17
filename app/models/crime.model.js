const mongoose = require('mongoose');

const CrimeSchema = mongoose.Schema({
    title : String,
    details : String,
    type : String,
    date : String,
    address : String,
    longitude : Number,
    latitude : Number,
    state : String,
    country : String,
    posted_by : String,
    town: String

}, {
    timestamps: true
});

module.exports = mongoose.model('Crime', CrimeSchema);