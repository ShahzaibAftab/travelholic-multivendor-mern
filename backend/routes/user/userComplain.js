const Express=require('express')
const myRouter=Express.Router();

const userComplainSchema=require('../../schema/user/userComplain')

myRouter.get('/Display', async (req,res)=>{
    try {
        const c=await userComplainSchema.find()
        return res.status(200).send(c)
    } catch (error) {
        return res.status(500).send('Error:',error)
    }
})

myRouter.post('/Upload', async(req,res)=>{
    try {
        const {userEmail,userName,complainType,complainDetails,solved }=req.body;
        const postData=new userComplainSchema({
            userEmail,userName,complainType,complainDetails,solved
        })
       const c = await postData.save()
       if(c)
       {
    return res.status(201).send(c)
       }
    } catch (error) {
        return res.send(error).status(400)
    }
})
myRouter.put('/Update-Complain/:_id', async (req, res) => {
    try {
        const { _id } = req.params;

        const user = await userComplainSchema.findOne({ _id });

        if (!user) {
            return res.status(404).json({ error: 'user not found' });
        }

        user.solved = true;

        await user.save();

        return res.status(200).send('Updated');
    } catch (error) {
        return res.status(500).send(error);
    }
});

module.exports=myRouter;