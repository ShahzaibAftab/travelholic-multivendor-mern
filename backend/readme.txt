-------------------------------------------APIS & OBJECTS----------------------------------------------------

=========================ADMIN====================
http://localhost:8000/Admin-Details/Display
http://localhost:8000/Admin-Details/Upload    
{
    "adminName": "Admin1",
    "adminId": "A123",
    "adminEmail": "admin1@example.com",
    "adminPassword": "password1",
     "UserPhoto": "1685128553384_Copy of Copy of FRAGHEAD.png"
  }
=========================ADMIN====================

=========================VENDOR====================
http://localhost:8000/Vendor/Tours-Organized/Display
http://localhost:8000/Vendor/Tours-Organized/Upload

 {
        "vendorId": "vendor1",
        "tourID": 1,
        "tourFrom": "New York",
        "tourTo": "Los Angeles",
        "tourDate": "2022-05-01T00:00:00.000Z",
        "tourTiming": "Morning",
        "tourStatus": true,
    }

http://localhost:8000/Vendor/Trip-Bids/Upload
http://localhost:8000/Vendor/Trip-Bids/Display
{
    "customizedTripId": 3,
    "userId": 789,
    "bidRate": 600,
    "bidDetails": "I have extensive experience in organizing similar trips."
  }

  http://localhost:8000/Vendor/Trips-Organized/Upload
  http://localhost:8000/Vendor/Trips-Organized/Display
   {
    "vendorId": "V123",
    "tripId": 1,
    "tripFrom": "New York",
    "tripTo": "Los Angeles",
    "tripDate": "2023-06-10",
    "tripTiming": "09:00 AM",
    "tripStatus": true
  }

http://localhost:8000/Vendor-Complains/Upload
http://localhost:8000/Vendor-Complains/Display
{
        "vendorId": "V123",
        "vendorName": "John Doe",
        "complainType": "Late Payment",
        "complainDetails": "I have not received payment for the last 2 months",
    }

    http://localhost:8000/Vendor-Details/Upload
    http://localhost:8000/Vendor-Details/Display
   {
  "vendorName": "John Doe",
  "vendorContact": 1234567890,
  "vendorEmail": "johndoe@example.com",
  "vendorPassword": "password123",
  "vendorCnic": "1234567890123",
  "totalTours": 10,
  "totalFlights": 5
}

=========================VENDOR====================

=========================USER====================

http://localhost:8000/User-Details/Display/
http://localhost:8000/User-Details/Upload/
    {
    "userId": "U123",
    "userName": "John Doe",
    "userContact": "1234567890",
    "userEmail": "johndoe@example.com",
    "userPassword": "password1",
    "accountDate": "2022-01-15",
    "totalTours": 5,
    "totalFlights": 10
  }

http://localhost:8000/User-Complains/Display
http://localhost:8000/User-Complains/Upload
 {
    "userId": "67890",
    "userName": "Jane Smith",
    "complainType": "Product",
    "complainDetails": "The product I received was damaged."
  }

  http://localhost:8000/User-Flights/Display
  http://localhost:8000/User-Flights/Upload
  {
    "userId": "U123",
    "flightId": 1,
    "flightDate": "2023-05-25",
    "flightTiming": "09:00 AM",
    "flightRate": 500,
    "vendorId": 1,
    "flightFrom": "New York",
    "flightTo": "Los Angeles"
  }

  http://localhost:8000/User-Tours/Display
  http://localhost:8000/User-Tours/Upload
  {
    "userId": "U123",
    "tourId": 1,
    "tourDate": "2023-06-05",
    "tourTiming": "10:00 AM",
    "tourRate": 1000,
    "vendorId": 1,
    "tourFrom": "New York",
    "tourTo": "Niagara Falls"
  }
=========================USER====================

=========================BOOKING-RECORD====================
http://localhost:8000/Cusomized-Trip-Records/Display
http://localhost:8000/Cusomized-Trip-Records/Upload
{
    "customizedtripId": 12,
    "vendorId": "V123",
    "tripFrom": "New York",
    "tripTo": "Los Angeles",
    "userId": "U123",
    "tripDate": "2023-06-10",
    "tripTime": "09:00 AM",
    "usertripDetails": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "selectedBidRate": 500,
    "offeredRate": 450
  }

  http://localhost:8000/Tour-Records/Display
  http://localhost:8000/Tour-Records/Upload
   {
    "tourId": 1,
    "vendorId": "V123",
    "tourFrom": "New York",
    "tourTo": "Niagara Falls",
    "userId": "U123",
    "tourDate": "2023-06-10",
    "tourTime": "09:00 AM",
    "tourSlots": 10,
    "tourRate": 50
  }

  http://localhost:8000/Trip-Records/Display
  http://localhost:8000/Trip-Records/Upload
  {
    "tripId": 112,
    "vendorId": "V123",
    "tripFrom": "New York",
    "tripTo": "Los Angeles",
    "userId": "U123",
    "tripDate": "2023-06-10",
    "tripTime": "09:00 AM",
    "tripSlots": 10,
    "tripRate": 100
  }
=========================BOOKING-RECORD====================

