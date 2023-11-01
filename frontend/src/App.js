import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Homepage from './homepage/Homepage';
import VendorSignUp from './vendor/vendor-signup/VendorSignUp';
import VendorProfile from './vendor/vendor-personalProfile/VendorProfile';
import Vendordashboard from './vendor/vendor-Dashboard/Vendordashboard';
import Vendortour from './vendor/vendor-Tour/Vendortour';
import Vendorflight from './vendor/vendor-Flight/Vendorflight';
import Vendorcomplain from './vendor/vendor-Complain/Vendorcomplain';
import VendorSignIn from './vendor/vendor-signup/VendorSignIn';
import AdminSignin from './admin/admin-Credential/AdminSignIn';
import AdminDashboard from './admin/admin-Dashboard/AdminDashboard';
import Adminflight from './admin/admin-Flight/Adminflight';
import Admintour from './admin/admin-Tour/Admintour';
import Adminprofile from './admin/admin-PersonalProfile/Adminprofile';
import Adminvendorcomplain from './admin/vendor-Complain/Adminvendorcomplain';
import Adminclientcomplain from './admin/client-Complain/Adminclientcomplain';
import Tour from './homepage/TourPage/Tour';
import Trip from './homepage/TripPage/Trip';
import Tourbooking from './vendor/vendor-TourBooking/Tourbooking';
import Tripbooking from './vendor/vendor-TripBooking/Tripbooking';
import TourBookingRecord from './admin/admin-TourBooking/TourBookingRecord';
import TripBookingRecord from './admin/admin-TripBooking/TripBookingRecord';
import Contactus from './homepage/Contactus';
import UserSignup from './user/User-Credential/UserSignup';
import UserSignin from './user/User-Credential/UserSignin';
import Usertour from './user/User-Tours/Usertour';
import Usertrip from './user/User-Trips/Usertrip';
import Userprofile from './user/user-Profile/Userprofile';
import RecentTours from './user/User-Recent-Tours/RecentTours';
import RecentTrips from './user/User-Recent-Trips/RecentTrips';
import UserComplain from './user/User-Complain/UserComplain';
import UserCustomizedTrip from './user/User-Custom-Trip/UserCustomizedTrip';
import UserCustomHistory from './user/User-Custom-History/UserCustomHistory';
import VendorBid from './vendor/vendor-Bid/VendorBid';
import AdminCustomizedTrip from './admin/admin-Customized-Trip/AdminCustomizedTrip';

export const BASE_URL = 'http://localhost:8000'
// export const BASE_URL='https://travelholicbackend.onrender.com'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Tours" element={<Tour />} />
        <Route path="/Trips" element={<Trip />} />
        <Route path="/Contact-Us" element={<Contactus />} />

        <Route path="/vendor-signup" element={<VendorSignUp />} />
        <Route path="/vendor-signin" element={<VendorSignIn />} />
        <Route path="/vendor-Dashboard" element={<Vendordashboard />} />
        <Route path="/vendor-Profile" element={<VendorProfile />} />
        <Route path="/vendor-Issue-Tour" element={<Vendortour />} />
        <Route path="/vendor-Issue-Flight-Ticket" element={<Vendorflight />} />
        <Route path="/vendor-Complain" element={<Vendorcomplain />} />
        <Route path="/vendor-Tour-Bookings" element={<Tourbooking />} />
        <Route path="/vendor-Trip-Bookings" element={<Tripbooking />} />
        <Route path="/vendor-bid-on-trips" element={<VendorBid />} />

        <Route path="/admin-signin" element={<AdminSignin />} />
        <Route path="/admin-Dashboard" element={<AdminDashboard />} />
        <Route path="/admin-Flight-Record" element={<Adminflight />} />
        <Route path="/admin-Tour-Record" element={<Admintour />} />
        <Route path="/client-Feedbacks" element={<Adminclientcomplain />} />
        <Route path="/admin-Personal-Profile" element={<Adminprofile />} />
        <Route path="/vendor-Feedback" element={<Adminvendorcomplain />} />
        <Route path="/Tour-Booking-Record" element={<TourBookingRecord />} />
        <Route path="/Trip-Booking-Record" element={<TripBookingRecord />} />
        <Route path="/admin-customized-Trip-Record" element={<AdminCustomizedTrip />} />

        <Route path="/user-Signup" element={<UserSignup />} />
        <Route path="/user-Signin" element={<UserSignin />} />
        {/* <Route path="/user-Dashboard" element={<UserDashboard />} /> */}
        <Route path="/user-Tour" element={<Usertour />} />
        <Route path="/user-Trip" element={<Usertrip />} />
        <Route path="/user-Profile" element={<Userprofile />} />
        <Route path="/user-Recent-Tours" element={<RecentTours />} />
        <Route path="/user-Recent-Trips" element={<RecentTrips />} />
        <Route path="/user-Complain-form" element={<UserComplain />} />
        <Route path="/user-Custom-Tour" element={<UserCustomizedTrip />} />
        <Route path="/user-bid-history" element={<UserCustomHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
