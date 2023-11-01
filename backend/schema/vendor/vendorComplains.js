const mongoose=require('mongoose')
const vendorComplains=new mongoose.Schema({
    vendorEmail:{
        type:String,
    },
    vendorName:{
        type:String
    },
    complainType:{
        type:String
    },
    complainDetails:{
        type:String
    },
    solved:{
        type:Boolean
    }

})
module.exports=mongoose.model('vendorComplain',vendorComplains)