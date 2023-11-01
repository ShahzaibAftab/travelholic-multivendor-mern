import Portal from '../Portal'
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { BiEdit } from 'react-icons/bi'
import axios from 'axios';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBBreadcrumb,
    MDBBreadcrumbItem
} from 'mdb-react-ui-kit';
import { BASE_URL } from '../../App';

const Userprofile = () => {
    const userEmail = localStorage.getItem('userEmail')

    const navigate = useNavigate();
    const [Details, setDetails] = useState([])
    const [Edit, setEdit] = useState({})

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setDetails((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));


        // console.log('Details:', Details);
    };
    function getDateMonthYear(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        return `${day}-${month}-${year}`;
    }

    const handleSubmit = () => {

        // console.log('Data: ', Details)
        const temp = { ...Details }
        // console.log('obj', temp)
        const id = Details._id
        // console.log('id', Details._id);

        axios 
            .put(`${BASE_URL}/User-Details/add-changes/${id}`, temp)
            .then(response => {
                // console.log('success', response.data);
                if (response.status === 200) {
                    toast.success("Updated Successfully", { autoClose: 3000 });
                    setTimeout(() => {
                        handleClose();
                    }, 3000);
                } else {
                    toast.error("Error occurred while updating", { autoClose: 3000 });
                    setTimeout(() => {
                        navigate('/user-profile');
                    }, 3000);
                }
            })
            .catch(error => {
                // Handle the error
                console.error(error);
                toast.error("Cannot Update, Try again Later!", { autoClose: 3000 });
                setTimeout(() => {
                    handleClose();
                }, 3000);
            });
    };

    useEffect(() => {
        const fetchData = async () => {
            try { 
                await axios.get(`${BASE_URL}/user-Details/Selective-Details`, {
                    params: {
                        userEmail
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
     <section style={{ marginTop: '25px', backgroundColor: '#E6EBF1', borderRadius: '12px' }}>
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
                        <div style={{ position: 'absolute', right: '5%' }}>
                            <a onClick={handleShow} > <BiEdit style={{ color: '#1D4E89', fontSize: '25px', cursor: 'pointer' }} /></a>
                        </div>
                    </MDBBreadcrumb>

                </MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol lg="4">
                    <div style={{ borderRadius: '12px', width: '350px', height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='d-flex justify-content-center text-muted container shadow bg-white'>
                        <h3>Total Trips: <span style={{ display: 'inline' }}>{Details.totalFlights}</span></h3>
                    </div>
                    <div style={{ borderRadius: '12px', width: '350px', height: '150px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className='d-flex justify-content-center text-muted container shadow bg-white mt-5'>
                        <h3>Total Tours: <span style={{ display: 'inline' }}>{Details.totalTours}</span></h3>
                    </div>
                </MDBCol>
                <MDBCol lg="8">
                    <MDBCard className="mb-4" style={{ border: '0', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                        <MDBCardBody className='shadow'>
                            <MDBRow>
                                <MDBCol sm="3">
                                    <MDBCardText>ClientName:</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    <MDBCardText className="text-muted">{Details.ClientName}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="3">
                                    <MDBCardText>Email:</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    <MDBCardText className="text-muted">{Details.userEmail}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="3">
                                    <MDBCardText>Contact:</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    <MDBCardText className="text-muted">{Details.ContactNo}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="3">
                                    <MDBCardText>Email:</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    <MDBCardText className="text-muted">{Details.userEmail}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="3">
                                    <MDBCardText>CNIC:</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    <MDBCardText className="text-muted">{Details.userCnic}</MDBCardText>
                                </MDBCol>
                            </MDBRow>
                            <hr />
                            <MDBRow>
                                <MDBCol sm="3">
                                    <MDBCardText>DOB:</MDBCardText>
                                </MDBCol>
                                <MDBCol sm="9">
                                    <MDBCardText className="text-muted">{getDateMonthYear(Details.userDob)}</MDBCardText>
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
    const topBar = <h3>Profile Page</h3>
    return (
        <>
            <ToastContainer />
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
                                    name="userEmail"
                                    value={Details.userEmail}
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
                                    name="userPassword"
                                    value={Details.userPassword}
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="Password"
                                />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="form-group col-6">
                                <label htmlFor="exampleInputEmail1">User Name</label>
                                <input
                                    type="text"
                                    onChange={handleInputChange}
                                    name="ClientName"
                                    value={Details.ClientName}
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Name"
                                />
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="exampleInputPassword1">User CNIC</label>
                                <input
                                    type="Number"
                                    onChange={handleInputChange}
                                    name="userCnic"
                                    value={Details.userCnic}
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="Id"
                                />
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="exampleInputPassword1">User Contact</label>
                                <input
                                    type="Number"
                                    onChange={handleInputChange}
                                    name="ContactNo"
                                    value={Details.ContactNo}
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="Contact"
                                />
                            </div>
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

export default Userprofile;
