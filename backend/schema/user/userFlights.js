const mongoose=require('mongoose')
const userFlights=new mongoose.Schema({
    userId:{
        type:String
    },
    flightId:{
        type:Number
    },
    flightDate:{
        type:Date
    },
    flightTiming:{
        type:String
    },
    flightRate:{
        type:Number
    },
    vendorId:{
        type:Number
    },
    flightFrom:{
        type:String
    },
    flightTo:{
        type:String
    }
})

module.exports=mongoose.model('userFlights',userFlights)
