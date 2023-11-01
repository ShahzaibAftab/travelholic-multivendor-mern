const Express = require('express')
const myRouter = Express.Router()
const toursOrganizedSchema = require('../../schema/vendor/toursOrganized')

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Uploads/Tours');
  },
  filename: function (req, file, cb) {

    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

myRouter.post('/Upload', upload.single("tourPhoto"), async (req, res) => {
  try {
    let tourPhoto = (req.file) ? req.file.filename : null;
    const { vendorEmail, tourId, tourFrom, tourDuration, tourTo, tourDate, tourTiming, tourStatus, tourSeats, tourPrice, tourDescription } = req.body;
    const postData = new toursOrganizedSchema({
      vendorEmail, tourId, tourFrom, tourDuration, tourTo, tourDate, tourTiming, tourStatus, tourSeats, tourPrice, tourDescription, tourPhoto
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
    const c = await toursOrganizedSchema.find()
    return res.status(200).send(c)
  } catch (error) {
    return res.status(404).send(error)
  }
})
myRouter.get('/DisplayTable', async (req, res) => {
  try {
    const { vendorEmail } = req.query;

    const rows = await toursOrganizedSchema.find({ vendorEmail });

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Data not found' });
    }

    return res.send(rows);
  } catch (error) {
    return res.status(500).send(error);
  }
});

myRouter.get('/DisplaytourId', async (req, res) => {
  try {
    const { tourId } = req.query;
    const row = await toursOrganizedSchema.findOne({ tourId });
    if (!row) {
      return res.status(404).json({ error: 'Data not found' });
    }
    return res.send(row);
  } catch (error) {
    return res.status(500).send(error);
  }
});
myRouter.put('/Update-slots/:_id', async (req, res) => {

  const _id = req.params._id;
  const { NumberOfSeats } = req.body;

  const tour = await toursOrganizedSchema.findOne({ _id });

  if (!tour) {
    return res.status(404).json({ error: 'Tour Not Found' });
  }

  tour.tourSeats -= parseInt(NumberOfSeats);

  await tour.save();

  return res.send('Seats updated').status(200);

});
myRouter.delete('/Delete-Organized-Tour/:id', async (req, res) => {
  const _id = req.params.id;

  try {

    const result = await toursOrganizedSchema.deleteOne({ _id });

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