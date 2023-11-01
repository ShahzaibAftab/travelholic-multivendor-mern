const mongoose=require('mongoose')
const adminDetails=mongoose.Schema({
    adminName:{
        type:String
    },
    adminId:{
        type:Number
    },
    adminEmail:{
        type:String
    },
    adminPassword:{
        type:String
    },
    UserPhoto:{
        type:String
    }
})
module.exports=mongoose.model('adminDetails',adminDetails)