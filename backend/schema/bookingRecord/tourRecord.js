const mongoose = require('mongoose')
const tourRecord = new mongoose.Schema({
    ClientName: {
        type: String
    },
    userEmail: {
        type: String
    },
    ContactNo: {
        type: Number
    },
    NumberOfSeats: {
        type: Number
    },
    TotalAmount: {
        type: Number
    },
    tourDate: {
        type: Date
    },
    tourDuration: {
        type: Number
    },
    tourFrom:
    {
        type: String
    },
    tourId: {
        type: String
    },
    tourPrice: {
        type: Number
    },
    tourSeats: {
        type: Number
    },
    tourTiming: {
        type: String
    },
    tourTo: {
        type: String
    },
    vendorEmail: {
        type: String
    },

});
module.exports = mongoose.model('tourRecord', tourRecord)