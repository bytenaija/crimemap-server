const mongoose = require('mongoose');

const ForgetSchema = mongoose.Schema({
    code : String,
    userid : String,
   
    }, {
    timestamps: true
});

module.exports = mongoose.model('Forget', ForgetSchema);