const Express = require('express')
const myRouter = Express.Router()

const tripRecordSchema = require('../../schema/bookingRecord/tripRecord')

myRouter.get('/Display', async (req, res) => {
    try {
        const c = await tripRecordSchema.find()
        return res.status(200).send(c)
    } catch (error) {
        return res.status(404).send('Error:', error)
    }
})
myRouter.get('/Display-Record', async (req, res) => {
    const { vendorEmail } = req.query;

    try {
        const records = await tripRecordSchema.find({ vendorEmail });
        return res.status(200).send(records);
    } catch (error) {
        return res.status(404).send(error);
    }
});
myRouter.get('/Display-recent-trip-record', async (req, res) => {
    const { userEmail } = req.query;

    try {
        const records = await tripRecordSchema.find({ userEmail });
        return res.status(200).send(records);
    } catch (error) {
        return res.status(404).send(error);
    }
});

myRouter.post('/Upload', async (req, res) => {
    const { tripId, vendorEmail, tripFrom, tripTo, userId, tripDate, tripTiming, tripSeats, tripPrice, ClientName, userEmail, ContactNo, NumberOfSeats, TotalAmount } = req.body;
    try {
        const postData = new tripRecordSchema({
            tripId, vendorEmail, tripFrom, tripTo, userId, tripDate, tripTiming, tripSeats, tripPrice, ClientName, userEmail, ContactNo, NumberOfSeats, TotalAmount
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