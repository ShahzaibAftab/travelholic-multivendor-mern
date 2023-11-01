import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Portal from './../Portal';
import { BASE_URL } from '../../App';

const UserComplain = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');
  const [formData, setformData] = useState({
    userEmail: "",
    userName: "",
    complainType: "",
    complainDetails: "",
    solved: false
  })
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setformData((prevformData) => ({
      ...prevformData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post(`${BASE_URL}/User-Complains/Upload`, formData)
      .then((response) => {
        // console.log("success", response.data);
        toast.success("Complain Successful", { autoClose: 3000 });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      })
    // console.log(formData);

  }

  const topBar = <h3>Report a Problem</h3>
  const Prop =
    <div className="col-10 card shadow-2-strong card-registration mt-2" style={{ borderRadius: '15px', width: '100%' }}>
      <div className="card-body p-4 p-md-3" style={{ backgroundColor: '#E6EBF1', borderRadius: '15px' }}>
        <h3 className="d-flex justify-content-center mb-2 pb-2 pb-md-0 mb-md-5">Please Fill the Form Below</h3>
        <form className="g-3">

          <div className="row d-flex justify-content-center">
            <div className="col-md-3">
              <div className="form-outline">
                <label className="form-label" htmlFor="firstName">
                  <img src="https://www.svgrepo.com/show/499764/user.svg" alt="" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                  Username
                </label>
                <input type="text" name="userName" value={formData.userName} onChange={handleInputChange} id="tourId" className="form-control shadow" placeholder='Enter Username' />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-outline">
                <label className="form-label" htmlFor="departure">
                  <img src="https://www.svgrepo.com/show/421616/email-mail-web.svg" alt="" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                  Email
                </label>
                <input type="text" name="userEmail" value={formData.userEmail} onChange={handleInputChange} id="userEmail" className="form-control shadow" placeholder='Enter Email' />
              </div>
            </div>
          </div>

          <div className="row mt-5 d-flex justify-content-center">
            <div className="col-md-4">
              <label htmlFor="complainType" className="form-label">
                <img src="https://www.svgrepo.com/show/425157/complain-ecommerce-shop.svg" alt="" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                Complain Type
              </label>
              <select id="complainType" name="complainType" value={formData.complainType} onChange={handleInputChange} className="form-select shadow" aria-label="Select Complain option">
                <option selected>Complain Type</option>
                <option value="Customer Relations">Customer Relations</option>
                <option value="Trip & Tours">Trip & Tours</option>
                <option value="User Verification">User Verification</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="row mt-5 d-flex justify-content-center">
            <div className='col-md-6'>
              <label className="form-label">
                <img src="https://www.svgrepo.com/show/514320/message.svg" alt="" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                Share Your Problem
              </label>
              <textarea name="complainDetails" value={formData.complainDetails} onChange={handleInputChange} className="form-control shadow" rows="3" cols="6" placeholder='Enter Message'></textarea>

            </div>
          </div>

          <div className="col-12 d-flex justify-content-center mt-2">
            <button onClick={handleSubmit} className="px-5 mt-5 btn btn-primary btn-lg" type="submit">Apply</button>
          </div>
        </form>
      </div>
    </div>
  return (
    <>
      <ToastContainer />

      {userEmail ? (
        <Portal topBar={topBar} Prop={Prop} />
      ) : (
        <>

          <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className='text-center'>
              <h6>You must create an account to access this page.</h6>
              <button className='btn btn-danger' onClick={() => navigate('/user-signup')}>Signup</button>
            </div>
          </div>

        </>
      )}
    </>
  )
}

export default UserComplain
