const mongoose = require('mongoose')
const userCustomizedTrips = new mongoose.Schema({
    userEmail: {
        type: String
    },
    bidDescription: {
        type: String
    },
    Open: {
        type: Boolean
    }

}, {
    timestamps: true
}
);

module.exports = mongoose.model('userCustomizedTrips', userCustomizedTrips)