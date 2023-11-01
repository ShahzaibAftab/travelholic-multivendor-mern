const mongoose = require('mongoose')
const customizedtripRecord = new mongoose.Schema({
    CustomizedtripId: {
        type: String
    },
    vendorEmail: {
        type: String,
    },
    rate: {
        type: Number
    },
    vdescription: {
        type: String
    },
    userEmail: {
        type: String
    },
    bidDescription: {
        type: String
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('customizedtripRecord', customizedtripRecord)