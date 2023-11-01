const mongoose = require('mongoose')
const vendorDetails = new mongoose.Schema({

    vendorName: {
        type: String
    },
    vendorContact: {
        type: Number
    },
    vendorEmail: {
        type: String,
        unique: true
    },
    vendorPassword: {
        type: String
    },
    vendorCnic: {
        type: Number
    },
    totalTours: {
        type: Number
    },
    totalFlights: {
        type: Number
    },
    UserPhoto:{
        type:String
    }
}, {
    timestamps: true
});
module.exports = mongoose.model('vendorDetails', vendorDetails)