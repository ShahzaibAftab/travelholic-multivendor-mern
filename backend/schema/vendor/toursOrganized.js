const mongoose=require('mongoose');
const toursOrganized= new mongoose.Schema({
    vendorEmail: {
        type: String
    },
    tourId: {
        type: String
    },
    tourFrom: {
        type: String
    },
    tourDuration: {
        type: Number
    },
    tourTo: {
        type: String
    },
    tourDate: {
        type: Date
    },
    tourTiming: {
        type: String
    },
    tourStatus: {
        type: Boolean
    },
    tourPhoto: {
        type: String
    },
    tourSeats: {
        type: Number
    },
    tourPrice: {
        type: Number
    },
    tourDescription: {
        type: String
    }

})
module.exports=mongoose.model('toursOrganized',toursOrganized)