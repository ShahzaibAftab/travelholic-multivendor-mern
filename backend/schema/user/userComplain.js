const mongoose=require('mongoose')
const userComplain=new mongoose.Schema({

    userEmail:{ 
        type:String
    },
    userName:{
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

});
module.exports=mongoose.model('userComplains',userComplain)
