import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { BASE_URL } from '../../App';

const UserSignup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        ClientName: '',
        userEmail: '',
        ContactNo: '',
        userPassword: '',
        confirmuserPassword: '',
        userCnic: '',
        userDob: '',
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


        // Check if ClientName contains only alphabetic characters and doesn't start with a digit
        const ClientNameRegex = /^[a-zA-Z\s]+$/;
        if (!ClientNameRegex.test(formData.ClientName)) {
            return toast.error("user name must contain only alphabetic characters or spaces", { autoClose: 3000 });
        }
        // Check if email is empty or invalid
        else if (!formData.userEmail || !isValidEmail(formData.userEmail)) {
            return toast.error("Invalid email", { autoClose: 3000 });
        }

        // Check phone number length
        if (!formData.ContactNo.startsWith('03') || formData.ContactNo.length !== 11) {
            return toast.error("Error! Please Enter a valid Phone Number", { autoClose: 3000 });
        }

        // Check if password is empty
        if (!formData.userPassword || !formData.confirmuserPassword) {
            return toast.error("Password cannot be empty", { autoClose: 3000 });
        }

        // Check password length and alphanumeric requirement
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
        if (!passwordRegex.test(formData.userPassword)) {

            return toast.error("Password must be at least 6 characters long and contain both letters and digits", { autoClose: 3000 });
        }

        // Check if passwords match
        if (formData.userPassword !== formData.confirmuserPassword) {
            return toast.error("Passwords do not match!", { autoClose: 3000 });
        }


        // Check CNIC length
        if (formData.userCnic.length !== 13) {
            return toast.error("Invalid CNIC", { autoClose: 3000 });
        }

        // Assuming the DOB is stored as a string in formData.userDob
        const userDob = new Date(formData.userDob);
        const currentDate = new Date();
        const minAge = 18;

        const ageDiffMs = currentDate.getTime() - userDob.getTime();
        const ageDate = new Date(ageDiffMs);

        const userAge = Math.abs(ageDate.getUTCFullYear() - 1970);

        if (userAge < minAge) {
            return toast.error("You must be 18 years or older to create an account.", { autoClose: 3000 });
        }

        // Extract confirmuserPassword field and send rest of the formData
        const { confirmuserPassword, ...rest } = formData;

        // console.log('formData', formData);
        // console.log('rest', rest);

        axios
            .post(`${BASE_URL}/User-Details/Upload`, rest)
            .then((response) => {
                // console.log('success', response.data);
                toast.success("Signup Successful", { autoClose: 3000 });
                localStorage.setItem('userEmail', formData.userEmail);
                setTimeout(() => {
                    navigate('/user-Tour');
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
                        <div className="col-lg-10 col-xl-11">
                            <div className="card text-black mt-2 shadow" style={{ borderRadius: '10px', minHeight: '700px' }}>
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">

                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-2">
                                            <div>
                                                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 ">User SignUp<br />
                                                    <small className='text-center text-muted' style={{ fontSize: '15px', fontWeight: '200' }}>Create your account Today and earn exclusive rewards</small>
                                                </p>

                                            </div>
                                            <form className="mx-1 mx-md-4" onSubmit={handleSubmit} method="POST">
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <img src="https://www.svgrepo.com/show/128722/profile.svg" alt="" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="text"
                                                            name="ClientName"
                                                            placeholder="Enter Fullname"
                                                            className="form-control shadow"
                                                            value={formData.ClientName}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <img src="https://www.svgrepo.com/show/415213/email-files-letter.svg" alt="" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="email"
                                                            name="userEmail"
                                                            placeholder="Enter your email"
                                                            className="form-control shadow"
                                                            value={formData.userEmail}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <img src="https://www.svgrepo.com/show/474939/phone-android.svg" alt="" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="number"
                                                            name="ContactNo"
                                                            placeholder="03XXXXXXXXX"
                                                            className="form-control shadow"
                                                            value={formData.ContactNo}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <img src="https://www.svgrepo.com/show/513324/lock.svg" alt="" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="password"
                                                            name="userPassword"
                                                            placeholder="Enter password"
                                                            className="form-control shadow"
                                                            value={formData.userPassword}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <img src="https://www.svgrepo.com/show/496301/key.svg" alt="" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="password"
                                                            name="confirmuserPassword"
                                                            placeholder="Confirm password"
                                                            className="form-control shadow"
                                                            value={formData.confirmuserPassword}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <img src="https://www.svgrepo.com/show/501855/card.svg" alt="" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="number"
                                                            name="userCnic"
                                                            placeholder="3460XXXXXXXXX"
                                                            className="form-control shadow"
                                                            value={formData.userCnic}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <img src="https://www.svgrepo.com/show/485195/date.svg" alt="" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                                                    <div className="form-outline flex-fill mb-0">
                                                        <input
                                                            type="date"
                                                            name="userDob"
                                                            className="form-control shadow"
                                                            value={formData.userDob}
                                                            onChange={handleChange}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">

                                                    <p className='text-muted mx-auto'>already have account? <a className='text-success' style={{ textDecoration: 'underline' }} href='/user-signin' onClick={() => navigate('/user-signin')}>Sign In</a></p>
                                                </div>
                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="submit" className="btn btn-primary btn-lg px-5">
                                                        Sign me up
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

export default UserSignup;
