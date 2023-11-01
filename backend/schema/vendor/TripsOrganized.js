const mongoose = require('mongoose')
const TripsOrganized = new mongoose.Schema({

    vendorEmail: {
        type: String
    },
    tripId: {
        type: String
    },
    tripFrom: {
        type: String
    },
    tripDuration: {
        type: Number
    },
    tripTo: {
        type: String
    },
    tripDate: {
        type: Date
    },
    tripTiming: {
        type: String
    },
    tripStatus: {
        type: Boolean
    },
    tripSeats: {
        type: Number
    },
    tripPrice: {
        type: Number
    },
    tripDescription: {
        type: String
    }
})
module.exports = mongoose.model('tripOrganized', TripsOrganized)