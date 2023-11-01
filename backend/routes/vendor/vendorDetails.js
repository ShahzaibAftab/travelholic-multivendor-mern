const Express = require('express')
const myRouter = Express.Router()

const vendorDetailsSchema = require('../../schema/vendor/vendorDetails')

// FILE HANDLING
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Uploads/Vendor');
  },
  filename: function (req, file, cb) {

    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });
myRouter.get('/Display', async (req, res) => {
  try {
    const c = await vendorDetailsSchema.find()
    return res.status(200).send(c)
  } catch (error) {
    return res.status(404).send(error)
  }
})
myRouter.post('/login', async (req, res) => {
  const { vendorEmail, vendorPassword } = req.body;

  try {
    const user = await vendorDetailsSchema.findOne({ vendorEmail: vendorEmail });

    if (!user) {
      return res.status(404).json({ error: 'Invalid email or password' });
    }

    // Check the password
    if (user.vendorPassword !== vendorPassword) {
      return res.status(401).json({ error: 'Invalid password' });
    }
    // Successful login
    return res.json({ message: 'Login successful' });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

myRouter.post('/Upload', async (req, res) => {
  let UserPhoto = (req.file) ? req.file.filename : "default.png";
  try {
    const { vendorName, vendorContact, vendorEmail, vendorPassword, vendorCnic, totalTours, totalFlights } = req.body;

    // Check if the email already exists in the database
    const existingVendor = await vendorDetailsSchema.findOne({ vendorEmail });
    if (existingVendor) {
      return res.status(409).send('Email already exists'); // Return a 409 Conflict status code indicating the email already exists
    }

    const postData = new vendorDetailsSchema({
      vendorName, vendorContact, vendorEmail, vendorPassword, vendorCnic, totalTours, totalFlights, UserPhoto
    });
    const savedData = await postData.save();
    if (savedData) {
      return res.status(201).send(savedData);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});
myRouter.get('/Selective-Details', async (req, res) => {
  try {
    const { vendorEmail } = req.query;

    const row = await vendorDetailsSchema.findOne({ vendorEmail });

    if (!row) {
      return res.status(404).json({ error: 'Data not found' });
    }

    return res.send(row);
  } catch (error) {
    return res.status(500).send(error);
  }
});
myRouter.put('/UpdateTotalTours', async (req, res) => {
  try {
    const { vendorEmail } = req.query;

    const vendor = await vendorDetailsSchema.findOne({ vendorEmail });

    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    vendor.totalTours += 1;

    await vendor.save();

    return res.send('Incremented');
  } catch (error) {
    return res.status(500).send(error);
  }
});
myRouter.put('/UpdateTotalTrips', async (req, res) => {
  try {
    const { vendorEmail } = req.query;

    const vendor = await vendorDetailsSchema.findOne({ vendorEmail });

    if (!vendor) {
      return res.status(404).json({ error: 'Vendor not found' });
    }

    vendor.totalFlights += 1;

    await vendor.save();

    return res.send('Incremented');
  } catch (error) {
    return res.status(500).send(error);
  }
});
myRouter.put('/add-changes/:_id', upload.single('UserPhoto'), async (req, res) => {
  
  const _id = req.params._id;
  UserPhoto = req.file ? req.file.filename : "default.png";

  const {
    vendorName,
    vendorContact,
    vendorEmail,
    vendorCnic,
    vendorPassword,
    totalTours,
    totalFlights
  } = req.body;

  try {
    const vendorDetails = await vendorDetailsSchema.findById(_id);

    const updatedVendorDetails = {
      vendorName: vendorName || vendorDetails.vendorName,
      vendorEmail: vendorEmail || vendorDetails.vendorEmail,
      vendorContact: vendorContact || vendorDetails.vendorContact,
      vendorPassword: vendorPassword || vendorDetails.vendorPassword,
      UserPhoto,
      vendorCnic: vendorCnic || vendorDetails.vendorCnic,
      totalTours: totalTours || vendorDetails.totalTours,
      totalFlights: totalFlights || vendorDetails.totalFlights
    };

    const editVendor = await vendorDetailsSchema.findByIdAndUpdate(
      _id,
      updatedVendorDetails,
      { new: true } // Get the updated document instead of the original one
    );

    if (!editVendor) {
      return res.status(404).send('Vendor not found');
    }

    return res.status(200).json(editVendor);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Unable to update');
  }
});




module.exports = myRouter