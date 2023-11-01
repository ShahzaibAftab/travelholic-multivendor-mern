require('./connection');
require('./schema');

const Express = require('express');
const app = Express();
const PORT = 8000;
const path = require('path')
let cors = require('cors');
app.use(Express.json());
app.use(cors());
app.use('/Uploads', Express.static('Uploads'));

// app.use(Express.static(path.join(__dirname,'./build')))
// app.get('*',function(req,res){
//     res.sendFile(path.join(__dirname,"./build/index.html"))
// })

// *=======================ADMIN==================
const adminDetails = require('./routes/admin/adminDetails');
app.use('/Admin-Details', adminDetails)
// *=======================ADMIN==================

// *===============USER DETAILS==================
const userDetails = require('./routes/user/userDetails');
app.use('/User-Details', userDetails);
// *===============USER DETAILS==================

//*================USER COMPLAINS================
const userComplain = require('./routes/user/userComplain');
app.use('/User-Complains', userComplain);
//*================USER COMPLAINS================

// *=================USER CUSTOMIZED TRIPS============
const userCustomizedTrips = require('./routes/user/userCustomizedTrips');
app.use('/User-Customized-Trip', userCustomizedTrips);
// *=================USER CUSTOMIZED TRIPS============

//*==================USER FLIGHT=======================
const userFlights = require('./routes/user/userFlights');
app.use('/User-Flights', userFlights);
//*==================USER FLIGHT=======================

//*==================USER TOUR=========================
const userTours = require('./routes/user/userTours');
app.use('/User-Tours', userTours);
//*==================USER TOUR=========================



// *======================VENDOR=======================

// *======================TOUR ORGANIZED=======================
const toursOrganized = require('./routes/vendor/toursOrganized');
app.use('/Vendor/Tours-Organized', toursOrganized);
// *======================TOUR ORGANIZED=======================

// *======================TRIPS BIDDED=======================
const tripsBidded = require('./routes/vendor/tripsBidded');
app.use('/Vendor/Trip-Bids', tripsBidded);
// *======================TRIPS BIDDED=======================

// *=========================TRIPS ORGANIZED====================
const tripssOrganized = require('./routes/vendor/TripsOrganized')
app.use('/Vendor/Trips-Organized', tripssOrganized)
// *=========================TRIPS ORGANIZED====================

// *=========================VENDOR COMPLAINS==================
const vendorComplains = require('./routes/vendor/vendorComplains')
app.use('/Vendor-Complains', vendorComplains)
// *=========================VENDOR COMPLAINS==================

// *===========================VENDOR DETAILS==================
const vendorDetails = require('./routes/vendor/vendorDetails')
app.use('/Vendor-Details', vendorDetails)
// *===========================VENDOR DETAILS==================
// *======================VENDOR=======================



// *========================BOOKING RECORD=====================
// *========================CUSTOMIZED TRIP RECORD=====================
const customizedtripRecord = require('./routes/bookingRecord/customizedtripRecord')
app.use('/Cusomized-Trip-Records', customizedtripRecord)
// *========================CUSTOMIZED TRIP RECORD=====================

// *========================TOUR RECORD=====================
const tourRecord = require('./routes/bookingRecord/tourRecord')
app.use('/Tour-Records', tourRecord)
// *========================TOUR RECORD=====================

// *========================TRIP RECORD=====================
const tripRecord = require('./routes/bookingRecord/tripRecord')
app.use('/Trip-Records', tripRecord)
// *========================TRIP RECORD=====================
// *========================BOOKING RECORD=====================




// ======================SERVER===============
app.listen(PORT, () => console.log('Connection Start at Port:', PORT))
