const mongoose = require('mongoose')
const userDetails = new mongoose.Schema(
    {
      ClientName: {
        type: String,
      },
      ContactNo: {
        type: Number,
      },
      userEmail: {
        type: String,
      },
      userPassword: {
        type: String,
      },
      totalTours: {
        type: Number,
      },
      totalFlights: {
        type: Number,
      },
      userCnic: {
        type: Number,
      },
      userDob: {
        type: Date,
      },
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model('userDetails', userDetails);
  