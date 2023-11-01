import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import Panel from '../Panel'
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
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { BASE_URL } from '../../App';

const Adminprofile = () => {
  const adminEmail = localStorage.getItem('adminEmail');
  const [profileDetails, setprofileDetails] = useState([])

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e, index) => {
    const { name, value, files } = e.target;
    const updatedProfileDetails = [...profileDetails];
    if (files) {
      updatedProfileDetails[index][name] = files[0];
    } else {
      updatedProfileDetails[index][name] = value;
    }
    setprofileDetails(updatedProfileDetails);
  };

  useEffect(() => {
    axios.get(`${BASE_URL}/Admin-Details/Admin-Profile`, {
      params: {
        adminEmail
      }
    })
      .then((res) => {
        setprofileDetails(res.data)
        console.log(res.data)
      })
  }, [])

  const handleSubmit = () => {
    // console.log('editdata', profileDetails);
    // console.log('id', profileDetails[0]._id);

    const id = profileDetails[0]._id;

    axios
      .put(`${BASE_URL}/Admin-Details/add-changes/${id}`, profileDetails)
      .then(response => {
        // console.log(response.data);
        if (response.status === 200) {
          return toast.success("Updated Successfully", { autoClose: 3000 });
        } else {
          return toast.error("Error! try Again later", { autoClose: 3000 });
        }
      })
      .catch(error => {
        // Handle the error
        console.error(error);
        return toast.error("Warning! Error while updating", { autoClose: 3000 });
      });
  };


  const topBar = <h4>Admin Personal Profile</h4>
  const Prop =
    <section style={{ marginTop: '25px', backgroundColor: '#F9FAFD', borderRadius: '12px' }}>
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
        {profileDetails.map((obj =>
          <MDBRow>

            <MDBCol lg="4">
              <MDBCard className="mb-4" style={{ border: '0', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                <MDBCardBody className="text-center"  >
                  <MDBCardImage
                    src={`http://localhost:8000/Uploads/Admin/${obj.UserPhoto}`}
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: '150px' }}
                    fluid
                  />
                  <p className="text-muted mb-1">Admininistrator</p>
                  <div className="d-flex justify-content-center mb-2 px-2 py-2">
                    <MDBBtn className='btn btn-success px-2 py-2 btn-fixed-size' color="success" onClick={handleShow}>Edit Profile</MDBBtn>
                  </div>

                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="8">
              <MDBCard className="mb-4" style={{ border: '0', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                <MDBCardBody>
                  {/* {profileDetails.map((obj => */}
                  <>
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Username:</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{obj.adminName}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Email:</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{obj.adminEmail}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                    <MDBRow>
                      <MDBCol sm="3">
                        <MDBCardText>Official Id:</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="9">
                        <MDBCardText className="text-muted">{obj.adminId}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                  </>
                  {/* ))} */}
                  <hr />
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
        ))}
      </MDBContainer>
    </section>
  return (
    <>
      <ToastContainer />
      {adminEmail ? (
        <Panel topBar={topBar} Prop={Prop} />
      ) : (
        <>

          <div className='d-flex justify-content-center align-items-center vh-100'>
            <div className='text-center'>
              <h6><span className='text-danger'>Warning:</span> You are not authorized to have access</h6>
            </div>
          </div>

        </>
      )}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            {profileDetails.map((obj, index) => (
              <React.Fragment key={index}>
                <div className="row">
                  <div className="form-group col-6">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input
                      type="email"
                      onChange={(e) => handleChange(e, index)}
                      name="adminEmail"
                      value={obj.adminEmail}
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
                      onChange={(e) => handleChange(e, index)}
                      name="adminPassword"
                      value={obj.adminPassword}
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                    />
                  </div>
                </div>
                <div className="row mt-2">
                  <div className="form-group col-6">
                    <label htmlFor="exampleInputEmail1">Admin Name</label>
                    <input
                      type="text"
                      onChange={(e) => handleChange(e, index)}
                      name="adminName"
                      value={obj.adminName}
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Name"
                    />
                  </div>
                  <div className="form-group col-6">
                    <label htmlFor="exampleInputPassword1">Admin Id</label>
                    <input
                      type="text"
                      onChange={(e) => handleChange(e, index)}
                      name="adminId"
                      value={obj.adminId}
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Id"
                    />
                  </div>
                </div>
                <div className="form-group mt-3">
                  <input
                    type="file"
                    accept=".png"
                    onChange={(e) => handleChange(e, index)}
                    name="UserPhoto"
                    className="form-control-file"
                    id="exampleFormControlFile1"
                  />
                  <br />
                  <small className="ml-3" style={{ color: 'red', fontWeight: 'bold' }}>
                    *Only PNG
                  </small>
                </div>
              </React.Fragment>
            ))}
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

export default Adminprofile
