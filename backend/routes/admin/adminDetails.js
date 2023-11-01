const Express = require('express')
const myRouter = Express.Router()
const adminDetailsSchema = require('../../schema/admin/adminDetails')

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

myRouter.post('/Upload', upload.single('UserPhoto'), async (req, res) => {

    let UserPhoto = (req.file) ? req.file.filename : null;
    const { adminName, adminId, adminEmail, adminPassword } = req.body;
    const postData = new adminDetailsSchema({
        adminName, adminId, adminEmail, adminPassword, UserPhoto
    })
    let c = await postData.save()
    {
        if (c) {
            return res.status(201).send(c)
        }
    }

})
myRouter.put('/add-changes/:_id', upload.single('UserPhoto'), async (req, res) => {
    const _id = req.params._id;
    let UserPhoto = (req.file) ? req.file.filename : adminDetailsSchema.UserPhoto;

    let { adminName, adminEmail, adminPassword, adminId } = req.body;

    if (!adminName) {
        const adminDetails = await adminDetailsSchema.findById(_id);
        adminName = adminDetails.adminName;
    }

    if (!adminId) {
        const adminDetails = await adminDetailsSchema.findById(_id);
        adminId = adminDetails.adminId;
    }

    if (!adminEmail) {
        const adminDetails = await adminDetailsSchema.findById(_id);
        adminEmail = adminDetails.adminEmail;
    }

    if (!adminPassword) {
        const adminDetails = await adminDetailsSchema.findById(_id);
        adminPassword = adminDetails.adminPassword;
    }

    try {
        const editAdmin = await adminDetailsSchema.findByIdAndUpdate(
            _id,
            {
                adminName,
                adminEmail,
                adminPassword,
                adminId,
                UserPhoto
            },
            { new: true } // Get the updated document instead of the original one
        );

        if (!editAdmin) {
            return res.status(404).send('Admin not found');
        }

        return res.status(200).json(editAdmin);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Unable to update');
    }
});
myRouter.get('/Display', async (req, res) => {
    try {
        const c = await adminDetailsSchema.find()
        res.status(200).send(c)
    } catch (error) {
        res.status(404).send('Error:', error)
    }
})

myRouter.get('/Admin-Profile', async (req, res) => {
    const { adminEmail } = req.params
    try {
        const c = await adminDetailsSchema.find(adminEmail)
        if (c)
            res.status(200).send(c)
        else {
            res.status(404)
        }
    } catch (error) {
        res.status(404).send('Error:', error)
    }
})
myRouter.get('/login', async (req, res) => {
    const { adminEmail, adminPassword } = req.query
    try {
        const admin = await adminDetailsSchema.findOne({ adminEmail })
        if (admin) {
            if (admin.adminPassword === adminPassword) {
                return res.status(200).send('Successfull')
            }
            return res.status(400).json({ message: 'Incorrect Password' })
        }
        return res.status(404).json({ message: 'Email not Found' })

    } catch (error) {
        return res.send("Error", error)
    }
})

myRouter.get('/signmeup-DEYGJJGDSETYHVCDF', async (req, res) => {
    let UserPhoto = (req.file) ? req.file.filename : "default.png";
    const { adminName, adminId, adminEmail, adminPassword } = req.query;

    try {
        // Check if admin already exists with the provided adminEmail
        const adminExists = await adminDetailsSchema.findOne({ adminEmail });

        if (adminExists) {
            return res.status(400).json({ message: 'Admin already exists with the provided email' });
        }

        // Create a new admin
        const newAdmin = new adminDetailsSchema({
            adminName,
            adminId,
            adminEmail,
            adminPassword,
            UserPhoto
        });

        // Save the new admin to the database
        await newAdmin.save();

        return res.status(201).json({ message: 'Admin signed up successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error occurred while signing up admin', error });
    }
});

module.exports = myRouter