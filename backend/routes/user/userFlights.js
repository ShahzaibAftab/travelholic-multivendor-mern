const Express=require('express');
const myRouter=Express.Router();

const userFlightsSchema=require('../../schema/user/userFlights')

myRouter.get('/Display',async(req,res)=>{
//  res.status(201).send('test');
try {
    const c=await userFlightsSchema.find();
    res.status(201)
    res.send(c)
} catch (error) {
    res.status(404).send('Error:',error)
}
})

myRouter.post('/Upload',async(req,res)=>{
    const{userId,flightId,flightDate,flightTiming,flightRate,vendorId,flightFrom,flightTo}=req.body;

    try {
        const postData=new userFlightsSchema({
            userId,flightId,flightDate,flightTiming,flightRate,vendorId,flightFrom,flightTo
        })
       await postData.save();
       res.status(201)
       res.send(postData)
    } catch (error) {
        
    }
})
module.exports=myRouter;