const Express = require('express')
const myRouter = Express.Router()
 
const vendorComplainsSchema = require('../../schema/vendor/vendorComplains')

myRouter.get('/Display', async (req, res) => {
    try {
        const c = await vendorComplainsSchema.find()
        return res.status(200).send(c)
    } catch (error) {
        return res.status(404).send('Error:', error)
    }
})

myRouter.post('/Upload', async (req, res) => {
    try {
        const { vendorEmail, vendorName, complainType, complainDetails, solved } = req.body;
        const postData = new vendorComplainsSchema({
            vendorEmail, vendorName, complainType, complainDetails, solved
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
myRouter.put('/Update-Complain/:_id', async (req, res) => {
    try {
        const { _id } = req.params;

        const vendor = await vendorComplainsSchema.findOne({ _id });

        if (!vendor) {
            return res.status(404).json({ error: 'Vendor not found' });
        }

        vendor.solved = true;

        await vendor.save();

        return res.status(200).send('Updated');
    } catch (error) {
        return res.status(500).send(error);
    }
});

module.exports = myRouter