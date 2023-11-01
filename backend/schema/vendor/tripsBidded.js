const mongoose = require('mongoose')
const tripBidded = new mongoose.Schema({
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
    avail: {
        type: Boolean
    }
}
);
module.exports = mongoose.model('tripBidded', tripBidded)