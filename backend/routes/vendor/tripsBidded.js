const Express = require('express')
const myRouter = Express.Router()

const tripsBiddedSchema = require('../../schema/vendor/tripsBidded')

myRouter.get('/Display', async (req, res) => {
    try {
        const c = await tripsBiddedSchema.find()
        return res.status(200).send(c)
    } catch (error) {
        return res.status(404).send('Error:', error)
    }
})
myRouter.get('/Display-selective', async (req, res) => {
    const CustomizedtripId = req.query
    try {
        const c = await tripsBiddedSchema.find({ CustomizedtripId });
        return res.status(200).send(c);
    } catch (error) {
        return res.status(404).send('Error:', error);
    }
});
myRouter.put('/update-Avail/:CustomizedtripId/:vendorEmail', async (req, res) => {
    try {
        const { CustomizedtripId, vendorEmail } = req.params;

        const user = await tripsBiddedSchema.findOne({ CustomizedtripId, vendorEmail });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.avail = true;

        await user.save();

        return res.send('Updated');
    } catch (error) {
        return res.status(500).send(error);
    }
});




myRouter.post('/Upload', async (req, res) => {
    try {
        const { CustomizedtripId, vendorEmail, rate, vdescription, avail } = req.body;

        const addData = new tripsBiddedSchema({
            CustomizedtripId, vendorEmail, rate, vdescription, avail
        })
        await addData.save()
        return res.status(201).send(addData)

    } catch (error) {
        return res.status(500).send(error)
    }
})

module.exports = myRouter