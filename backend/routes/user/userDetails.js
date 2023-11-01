const Express = require('express');
const myRouter = Express.Router();

const userDetails = require('../../schema/user/userDetails');

myRouter.get('/Display', async (req, res) => {
    const c = await userDetails.find();
    try {
        return res.status(200).send(c)
    } catch (error) {
        return res.status(404).send('unable to retrive: ', error)
    }
});
myRouter.post('/SignIn', async (req, res) => {
    const { userEmail, userPassword } = req.body;
    try {
        const check = await userDetails.findOne({ userEmail });
        if (!check) {
            return res.status(404).send({ message: "Email not Found" });
        }
        if (check.userPassword !== userPassword) {
            return res.status(403).send({ message: 'Invalid Password' });
        }
        return res.status(200).send({ message: "Login Successful" });
    } catch (error) {
        return res.status(500).send({ message: "Error occurred during login", error });
    }
});
myRouter.get('/Selective-Details', async (req, res) => {
    try {
        const { userEmail } = req.query;

        const row = await userDetails.findOne({ userEmail });

        if (!row) {
            return res.status(404).json({ error: 'Data not found' });
        }

        // return res.json({ ClientName: row.ClientName, ContactNo: row.ContactNo });
        return res.send(row);
    } catch (error) {
        return res.status(500).send(error.message);
    }

});
myRouter.put('/UpdateTotalTours', async (req, res) => {
    try {
        const { userEmail } = req.query;

        const user = await userDetails.findOne({ userEmail });

        if (!user) {
            return res.status(404).json({ error: 'user not found' });
        }

        user.totalTours += 1;

        await user.save();

        return res.send('Incremented').status(200);
    } catch (error) {
        return res.status(500).send(error);
    }
});
myRouter.put('/UpdateTotalTrips', async (req, res) => {
    try {
        const { userEmail } = req.query;

        const user = await userDetails.findOne({ userEmail });

        if (!user) {
            return res.status(404).json({ error: 'user not found' });
        }

        user.totalFlights += 1;

        await user.save();

        return res.send('Incremented');
    } catch (error) {
        return res.status(500).send(error);
    }
});
myRouter.put('/add-changes/:_id', async (req, res) => {

    const _id = req.params._id;

    const { ClientName, ContactNo, userEmail, userPassword, totalTours, totalFlights, userCnic, userDob } = req.body;

    try {
        const Details = await userDetails.findById(_id);

        const updatedDetails = {
            ClientName: ClientName || Details.ClientName,
            userEmail: userEmail || Details.userEmail,
            ContactNo: ContactNo || Details.ContactNo,
            userPassword: userPassword || Details.userPassword,
            userCnic: userCnic || Details.userCnic,
            userDob: userDob || Details.userDob,
            totalTours: totalTours || Details.totalTours,
            totalFlights: totalFlights || Details.totalFlights
        };

        const editUser = await userDetails.findByIdAndUpdate(
            _id,
            updatedDetails,
            { new: true } // Get the updated document instead of the original one
        );

        if (!editUser) {
            return res.status(404).send('User not found');
        }

        return res.status(200).json(editUser);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Unable to update');
    }
});
myRouter.post('/Upload', async (req, res) => {
    const { ClientName, ContactNo, userEmail, userPassword, totalTours, totalFlights, userCnic, userDob } = req.body;

    const existingEmail = await userDetails.findOne({ userEmail }); // Add "await" to wait for the result
    if (existingEmail) {
        return res.status(409).send({ message: 'Email already exists' });
    } else {
        const addData = new userDetails({
            ClientName,
            ContactNo,
            userEmail,
            userPassword,
            totalTours,
            totalFlights,
            userCnic,
            userDob
        });

        const dataSaved = await addData.save();
        if (dataSaved) {
            return res.status(201).send(dataSaved);
        }
    }
});


module.exports = myRouter;


