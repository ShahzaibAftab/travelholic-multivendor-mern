import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { BASE_URL } from '../../App';
const VendorSignIn = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vendorEmail: "",
    vendorPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${BASE_URL}/Vendor-Details/login`, formData)
      .then((res) => { 
        // console.log('response:', res);
        // console.log('status:', res.status);
        if (res.status === 200) {
          localStorage.setItem('vendorEmail', formData.vendorEmail);
          toast.success("Login Successfull", { autoClose: 3000 });
          setTimeout(() => {
            navigate('/vendor-Dashboard');
          }, 3000);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          return toast.error("Warning! Invalid Email", { autoClose: 3000 });
        } else {
          return toast.error("Warning! Incorrect Password", { autoClose: 3000 });
        }
      });
  };

  return (
    <>
      <ToastContainer />
      <section className="container-fluid d-flex justify-content-center align-center" style={{ minHeight: '750px', backgroundColor: '#E9EAEE' }}>
        <form onSubmit={handleSubmit} className='mt-auto mb-auto d-flex flex-column justify-content-center align-items-center shadow' style={{ color: 'blue', backgroundColor: '#FFFFFF', minHeight: '400px', minWidth: '450px', borderRadius: '12px' }}>
          <h4 className='mb-5' style={{ fontWeight: 'bolder' }}>Vendor Login Portal</h4>
          <div className='form-group col-8 mb-3'>
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" name='vendorEmail' value={formData.vendorEmail} onChange={handleChange} className="form-control shadow" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
          </div>
          <div className='form-group col-8 mb-3'>
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" name='vendorPassword' value={formData.vendorPassword} onChange={handleChange} className="form-control shadow" id="exampleInputPassword1" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-success mt-3 px-5">Login</button>
          <span className='mt-2'><span className='text-muted'>Haven't registered yet?</span><a href='/vendor-SignUp'> Register Now</a></span>
        </form>
      </section>
    </>
  );
};

export default VendorSignIn;
