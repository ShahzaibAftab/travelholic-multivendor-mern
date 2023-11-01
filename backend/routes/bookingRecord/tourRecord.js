const Express = require('express')
const myRouter = Express.Router()

const tourRecordSchema = require('../../schema/bookingRecord/tourRecord')

myRouter.get('/Display', async (req, res) => {
    try {
        const c = await tourRecordSchema.find()
        return res.status(200).send(c)
    } catch (error) {
        return res.status(404).send(error)
    }
})
myRouter.get('/Display-Record', async (req, res) => {
    const { vendorEmail } = req.query;

    try {
        const records = await tourRecordSchema.find({ vendorEmail });
        return res.status(200).send(records);
    } catch (error) {
        return res.status(404).send(error);
    }
});
myRouter.get('/Display-recent-tour-record', async (req, res) => {
    const { userEmail } = req.query;

    try {
        const records = await tourRecordSchema.find({ userEmail });
        return res.status(200).send(records);
    } catch (error) {
        return res.status(404).send(error);
    }
});

myRouter.post('/Upload', async (req, res) => {

    try {
        const { ClientName, userEmail, ContactNo, NumberOfSeats, TotalAmount, tourDate, tourDuration, tourFrom, tourId, tourPrice, tourSeats, tourTiming, tourTo, vendorEmail } = req.body;
        const postData = new tourRecordSchema({
            ClientName, userEmail, ContactNo, NumberOfSeats, TotalAmount, tourDate, tourDuration, tourFrom, tourId, tourPrice, tourSeats, tourTiming, tourTo, vendorEmail
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