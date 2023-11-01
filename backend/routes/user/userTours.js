const Express=require('express')
const myRouter=Express.Router()

const userToursSchema=require('../../schema/user/userTours')

myRouter.get('/Display',async(req,res)=>{
 try {
    const c= await userToursSchema.find();
    res.status(201)
    res.send(c)
 } catch (error) {
    res.status(404)
    res.send(error)
 }
})

myRouter.post('/Upload',async (req,res)=>{
    try {
        const {userId,tourId,tourDate,tourTiming,tourRate,vendorId,tourFrom,tourTo}=req.body;
        const c= new userToursSchema({
            userId,tourId,tourDate,tourTiming,tourRate,vendorId,tourFrom,tourTo
        })
       const check = await c.save();
       if(check)
       {
        res.status(201)
        res.send(check)
       }
    } catch (error) {
        res.status(500)
        res.send(error)
    }
})

module.exports=myRouter