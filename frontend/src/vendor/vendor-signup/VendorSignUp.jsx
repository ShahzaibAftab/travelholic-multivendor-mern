import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

import { BASE_URL } from '../../App';

const VendorSignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vendorName: '',
    vendorEmail: '',
    vendorContact: '',
    vendorPassword: '',
    confirmVendorPassword: '',
    vendorCnic: '',
    totalTours: 0,
    totalFlights: 0
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    // Check if vendorName contains only alphabetic characters and doesn't start with a digit
    const vendorNameRegex = /^[a-zA-Z\s]+$/;
    if (!vendorNameRegex.test(formData.vendorName)) {
      return toast.error("Vendor name must contain only alphabetic characters or spaces", { autoClose: 3000 });
    }
    // Check if email is empty or invalid
    else if (!formData.vendorEmail || !isValidEmail(formData.vendorEmail)) {
      return toast.error("Invalid email", { autoClose: 3000 });
    }

    // Check phone number length
    if (formData.vendorContact.length !== 11) {
      return toast.error("Your Phone Number must be exactly 11 digits", { autoClose: 3000 });
    }

    // Check if password is empty
    if (!formData.vendorPassword || !formData.confirmVendorPassword) {
      return toast.error("Password cannot be empty", { autoClose: 3000 });
    }

    // Check password length and alphanumeric requirement
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
    if (!passwordRegex.test(formData.vendorPassword)) {

      return toast.error("Password must be at least 6 characters long and contain both letters and digits", { autoClose: 3000 });
    }

    // Check if passwords match
    if (formData.vendorPassword !== formData.confirmVendorPassword) {
      return toast.error("Passwords do not match!", { autoClose: 3000 });
    }


    // Check CNIC length
    if (formData.vendorCnic.length !== 13) {
      return toast.error("Invalid CNIC", { autoClose: 3000 });
    }

    // Extract confirmVendorPassword field and send rest of the formData
    const { confirmVendorPassword, ...rest } = formData;

    // console.log('formData', formData);
    // console.log('rest', rest);

    axios
      .post(`${BASE_URL}/Vendor-Details/Upload`, rest)
      .then((response) => {
        // console.log('success', response.data);
        toast.success("Signup Successful", { autoClose: 3000 });
        localStorage.setItem('vendorEmail', formData.vendorEmail);
        setTimeout(() => {
          navigate('/vendor-Dashboard');
        }, 3000);
      })
      .catch((error) => {
        console.error(error);
        if (error.response && error.response.status === 409) {
          return toast.error("Email Already Exist", { autoClose: 3000 });
        }
      });
  };

  // Helper function to validate email format
  const isValidEmail = (email) => {
    // Use a regular expression to check the email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  return (
    <>
      <ToastContainer />
      <section className="vh-100" style={{ backgroundColor: '#eee' }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black mt-5 mb-5" style={{ borderRadius: '25px' }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-1">
                      <img
                        src="https://img.freepik.com/premium-vector/travel-agency-receptionist-visitor-flat-vector_103044-2351.jpg?w=2000"
                        className="img-fluid"
                        alt="Registration"
                      />
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-2">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-2">Vendor SignUp</p>

                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit} method="POST">
                        <div className="d-flex flex-row align-items-center mb-4">
                        <img src="https://www.svgrepo.com/show/128722/profile.svg" alt="" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              name="vendorName"
                              placeholder="Enter Fullname"
                              className="form-control"
                              value={formData.vendorName}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                        <img src="https://www.svgrepo.com/show/415213/email-files-letter.svg" alt="" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              name="vendorEmail"
                              placeholder="Enter your email"
                              className="form-control"
                              value={formData.vendorEmail}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                        <img src="https://www.svgrepo.com/show/474939/phone-android.svg" alt="" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="number"
                              name="vendorContact"
                              placeholder="03XXXXXXXXX"
                              className="form-control"
                              value={formData.vendorContact}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                        <img src="https://www.svgrepo.com/show/513324/lock.svg" alt="" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              name="vendorPassword"
                              placeholder="Enter password"
                              className="form-control"
                              value={formData.vendorPassword}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                        <img src="https://www.svgrepo.com/show/496301/key.svg" alt="" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              name="confirmVendorPassword"
                              placeholder="Confirm password"
                              className="form-control"
                              value={formData.confirmVendorPassword}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                        <img src="https://www.svgrepo.com/show/501855/card.svg" alt="" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="number"
                              name="vendorCnic"
                              placeholder="3460XXXXXXXXX"
                              className="form-control"
                              value={formData.vendorCnic}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                         
                         <p className='text-muted mx-auto'>already have account? <a className='text-success' style={{textDecoration:'underline'}} href='/vendor-Signin'onClick={() => navigate('/vendor-Signin')}>Sign In</a></p>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="submit" className="btn btn-primary btn-lg">
                            SignUp
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VendorSignUp;
