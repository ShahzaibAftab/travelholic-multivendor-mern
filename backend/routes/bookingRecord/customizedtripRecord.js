const Express = require('express')
const myRouter = Express.Router()

const customizedtripSchema = require('../../schema/bookingRecord/customizedtripRecord')

myRouter.get('/Display', async (req, res) => {
    try {
        const c = await customizedtripSchema.find()
        return res.status(200).send(c)
    } catch (error) {
        return res.status(404).send('Error:', error)
    }
})
myRouter.get('/Display-selective-User', async (req, res) => {
    const { userEmail } = req.query;
    try {
        const records = await customizedtripSchema.find({ userEmail });
        return res.status(200).send(records);
    } catch (error) {
        return res.status(404).send(error);
    }
}
)
myRouter.get('/Display-selective-vendor', async (req, res) => {
    const { vendorEmail } = req.query;
    try {
        const records = await customizedtripSchema.find({ vendorEmail });
        return res.status(200).send(records);
    } catch (error) {
        return res.status(404).send(error);
    }
}
)

myRouter.post('/Upload', async (req, res) => {
    try {
        const { CustomizedtripId, vendorEmail, rate, vdescription, userId, userEmail, bidDescription } = req.body;
        const postData = new customizedtripSchema({
            CustomizedtripId, vendorEmail, rate, vdescription, userId, userEmail, bidDescription
        })
        let c = await postData.save()
        {
            if (c) {
                return res.status(201).send(c)
            }
        }
    } catch (error) {
        return res.status(500).send(error)
    }
})

module.exports = myRouter