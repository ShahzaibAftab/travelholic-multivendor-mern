import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { BASE_URL } from '../../App';
const AdminSignin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    adminEmail: "",
    adminPassword: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get(`${BASE_URL}/Admin-Details/login`, {
      params: {
        adminEmail: formData.adminEmail,
        adminPassword: formData.adminPassword
      }
    })
      .then((res) => {
        // console.log('response:', res);
        // console.log('status:', res.status);
        if (res.status === 200) {
          localStorage.setItem('adminEmail', formData.adminEmail);
          toast.success("Login Successfull", { autoClose: 3000 });
          setTimeout(() => {
            navigate('/admin-Dashboard');
          }, 3000);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          console.log(error)
          return toast.error("Warning! Invalid Email", { autoClose: 3000 });
        } else {
          console.log(error)
          return toast.error("Warning! Invalid Email", { autoClose: 3000 });
        }
      });
  };
  return (
    <>
      <ToastContainer />
      <section className="container-fluid d-flex justify-content-center align-center" style={{ minHeight: '750px', backgroundImage: 'url(/login-background.jpg)' }}>
        <form onSubmit={handleSubmit} className='mt-auto mb-auto d-flex flex-column justify-content-center align-items-center shadow text-muted' style={{ backgroundColor: '#FFFFFF', minHeight: '400px', minWidth: '450px', borderRadius: '12px' }}>
          <h4 className='mb-5' style={{ fontWeight: 'bolder' }}>admin Login Portal</h4>
          <div className='form-group col-8 mb-3'>
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" name='adminEmail' value={formData.adminEmail} onChange={handleChange} className="form-control shadow" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
          </div>
          <div className='form-group col-8 mb-3'>
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" name='adminPassword' value={formData.adminPassword} onChange={handleChange} className="form-control shadow" id="exampleInputPassword1" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-success mt-3 px-5">Login</button>
        </form>
      </section>
    </>
  )
}

export default AdminSignin
