import React, { useEffect, useState } from 'react'
import Vendor from '../Vendor.jsx'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem
} from 'mdb-react-ui-kit';
import { BASE_URL } from '../../App.js';



const VendorProfile = () => {

  const vendorEmail = localStorage.getItem('vendorEmail')
  
  const navigate = useNavigate();
  const [Details, setDetails] = useState([])
  const [Edit, setEdit] = useState({})

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "UserPhoto") {
      const fileName = files[0].name;
      setDetails((prevFormData) => ({
        ...prevFormData,
        UserPhoto: fileName
      }));
    } else {
      setDetails((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }));
    }

    // console.log('Details:', Details);
  };

  const handleSubmit = () => {

    // console.log('Data: ', Details)
    const temp = { ...Details }
    // console.log('obj', temp)
    const id = Details._id
    // console.log('id', Details._id);

    axios
      .put(`${BASE_URL}/Vendor-Details/add-changes/${id}`, temp)
      .then(response => {
        // console.log('success', response.data);
        if (response.status === 200) {
          toast.success("Updated Successfully", { autoClose: 3000 });
          setTimeout(() => {
            navigate('/vendor-profile');
          }, 3000);
        } else {
          toast.error("Error occurred while updating", { autoClose: 3000 });
          setTimeout(() => {
            navigate('/vendor-profile');
          }, 3000);
        }
      })
      .catch(error => {
        // Handle the error
        console.error(error);
        alert('Error occurred while updating');
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await axios.get(`${BASE_URL}/Vendor-Details/Selective-Details`, {
          params: {
            vendorEmail
          }
        }).then((res) => setDetails(res.data))
      } catch (error) {
        console.log("Personal Profile API:", error);
      }
    }
    fetchData()
    // console.log('deatils', Details)
  }, [])
  const Prop =
    <section style={{ marginTop: '25px', backgroundColor: '#EFFAF5', borderRadius: '12px',minHeight:'580px' }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className=" rounded-3 p-3 mb-4" style={{ backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <MDBBreadcrumbItem>
                <a href='#'>Home</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href="#">Dashboard</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>My Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4" style={{ border: '0', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <MDBCardBody className="text-center"  >
                <MDBCardImage
                  src={`http://localhost:8000/Uploads/Vendor/${Details.UserPhoto}`}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid
                />
                <p className="text-muted mb-1">Vendor at Travelholic</p>
                <div className="d-flex justify-content-center mb-2">
                  <MDBBtn color="danger btn-fixed-size" onClick={handleShow}>Edit Profile</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4" style={{ border: '0', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Username:</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{Details.vendorName}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email:</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{Details.vendorEmail}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Contact:</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{Details.vendorContact}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email:</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{Details.vendorEmail}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>CNIC:</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{Details.vendorCnic}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
            <MDBRow>
              <MDBCol md="6"></MDBCol>
              <MDBCol md="6">
                <MDBCard className="mb-4 mb-md-0"></MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  return (
    <>
      <ToastContainer />
      {vendorEmail ? (
        <Vendor Prop={Prop} />
      ) : (
        <>

          <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className='text-center'>
              <h6>You must login to access this page.</h6>
              <button className='btn btn-danger' onClick={() => navigate('/vendor-Signin')}>Login</button>
            </div>
          </div>

        </>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} encType="multipart/form-data">

            <div className="row">
              <div className="form-group col-6">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  name="vendorEmail"
                  value={Details.vendorEmail}
                  onChange={handleInputChange}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group col-6">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                  type="text"
                  onChange={handleInputChange}
                  name="vendorPassword"
                  value={Details.vendorPassword}
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="form-group col-6">
                <label htmlFor="exampleInputEmail1">Vendor Name</label>
                <input
                  type="text"
                  onChange={handleInputChange}
                  name="vendorName"
                  value={Details.vendorName}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Name"
                />
              </div>
              <div className="form-group col-6">
                <label htmlFor="exampleInputPassword1">Vendor CNIC</label>
                <input
                  type="Number"
                  onChange={handleInputChange}
                  name="vendorCnic"
                  value={Details.vendorCnic}
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Id"
                />
              </div>
              <div className="form-group col-6">
                <label htmlFor="exampleInputPassword1">Vendor Contact</label>
                <input
                  type="Number"
                  onChange={handleInputChange}
                  name="vendorContact"
                  value={Details.vendorContact}
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Contact"
                />
              </div>
            </div>
            <div className="form-group mt-3">
              <input
                type="file"
                accept=".png"
                onChange={handleInputChange}
                name="UserPhoto"
                className="form-control-file"
                id="exampleFormControlFile1"
              />
              <br />
              <small className="ml-3" style={{ color: 'red', fontWeight: 'bold' }}>
                *Only PNG
              </small>
            </div>

          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default VendorProfile