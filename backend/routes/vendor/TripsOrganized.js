const Express = require('express')
const myRouter = Express.Router()

const tripsOrganizedSchema = require('../../schema/vendor/TripsOrganized')

myRouter.post('/Upload',  async (req, res) => {
    try {
        const { vendorEmail, tripId, tripFrom,tripDuration, tripTo, tripDate,tripTiming, tripStatus,tripSeats,tripPrice,tripDescription } = req.body;
        const postData = new tripsOrganizedSchema({
            vendorEmail, tripId, tripFrom,tripDuration, tripTo, tripDate,tripTiming, tripStatus,tripSeats,tripPrice,tripDescription
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

myRouter.get('/Display', async (req, res) => {
    try {
        const c = await tripsOrganizedSchema.find()
        return res.status(200).send(c)
    } catch (error) {
        return res.status(404).send(error)
    }
})

myRouter.get('/DisplayTable', async (req, res) => {
    try {
      const { vendorEmail } = req.query;
  
      const rows = await tripsOrganizedSchema.find({ vendorEmail });
  
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Data not found' });
      }
  
      return res.send(rows);
    } catch (error) {
      return res.status(500).send(error);
    }
  });
  myRouter.put('/Update-slots/:_id', async (req, res) => {
    const _id = req.params._id;
    const { NumberOfSeats } = req.body;
  
    try {
      const trip = await tripsOrganizedSchema.findOne({ _id });
  
      if (!trip) {
        return res.status(404).json({ error: 'Trip Not Found' });
      }
  
      trip.tripSeats -= parseInt(NumberOfSeats);
      await trip.save();
  
      return res.status(200).json({ message: 'Seats updated' });
    } catch (error) {
      console.error('Error updating seats:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  myRouter.delete('/Delete-Organized-Trip/:id', async (req, res) => {
    const _id = req.params.id;
  
    try {
  
      const result = await tripsOrganizedSchema.deleteOne({ _id });
  
      if (result.deletedCount === 0) {
        res.status(404).send('Record not found');
      } else {
        res.send('Record deleted successfully').status(200);
      }
    } catch (err) {
      console.error('Error deleting record:', err);
      res.status(500).send('Internal Server Error');
    }
  });
  

module.exports = myRouter