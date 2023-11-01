const Express = require('express')
const myRouter = Express.Router();

const userCustomizedTripsschema = require('../../schema/user/userCustomizedTrips')

myRouter.get('/Display', async (req, res) => {
    try {
        const userData = await userCustomizedTripsschema.find();
        return res.status(200).send(userData)
    } catch (error) {
        return res.status(404).send('Error:', error)
    }
})
myRouter.put('/update-Open/:userEmail', async (req, res) => {
    try {
        const { userEmail } = req.params;

        const user = await userCustomizedTripsschema.findOne({ userEmail });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.Open = false;

        await user.save();

        return res.send('Updated');
    } catch (error) {
        return res.status(500).send(error);
    }
});

myRouter.get('/Display-Selective', async (req, res) => {
    try {
        const userEmail = req.query;
        const userData = await userCustomizedTripsschema.find(userEmail);
        return res.status(200).send(userData)
    } catch (error) {
        return res.status(404).send('Error:', error)
    }
})

myRouter.get('/Existing-Bid-verification/:userEmail', async (req, res) => {
    const { userEmail } = req.params;

    try {
        const userData = await userCustomizedTripsschema.findOne({ userEmail });

        if (userData) {
            if (userData.Open === true) {
                return res.status(400).json({ message: 'Cannot place more than one bid at a time' });
            } else {
                return res.status(200).json({ message: 'Proceed' });
            }
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error', error });
    }
});




myRouter.post('/Upload', async (req, res) => {
    const { userEmail, bidDescription, Open } = req.body;
    try {
        const postData = new userCustomizedTripsschema({
            userEmail, bidDescription, Open
        })
        const dataCheck = await postData.save();
        if (dataCheck) {
            return res.status(201).send('Record Saved')
        }
    } catch (error) {
        return res.status(500).send('error', error)
    }
})

module.exports = myRouter;