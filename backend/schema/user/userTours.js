const mongoose=require('mongoose')

const userTours=mongoose.Schema({
    userId:{
        type:String
    },
    tourId:{
        type:Number
    },
    tourDate:{
        type:Date
    },
    tourTiming:{
        type:String
    },
    tourRate:{
        type:Number
    },
    vendorId:{
        type:Number
    },
    tourFrom:{
        type:String
    },
    tourTo:{
        type:String
    }
})
module.exports=mongoose.model('userTours',userTours)