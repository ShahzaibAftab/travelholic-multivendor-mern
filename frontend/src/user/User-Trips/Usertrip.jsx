import axios from 'axios'
import React from 'react'
import Modal from 'react-bootstrap/Modal';
import { useEffect } from 'react'
import { useState } from 'react'
import Portal from './../Portal';
import { Card, Col } from 'react-bootstrap';
import { IoMdPaperPlane } from 'react-icons/io'
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../App';
const Usertrip = () => {

    const navigate = useNavigate();
    const userEmail = localStorage.getItem('userEmail')

    const [data, setdata] = useState([])
    const [userData, setuserData] = useState({})
    const [clickedTrip, setclickedTrip] = useState([])
    const [clientdata, setclientdata] = useState({});
    const [id, setid] = useState()

    // REACT BOOTSTRAP MODAL
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // REACT BOOTSTRAP MODAL 

    useEffect(() => {
        axios.get(`${BASE_URL}/Vendor/Trips-Organized/Display`)
            .then((res) => {
                setdata(res.data)
                // console.log(res.data)
            })
        axios.get(`${BASE_URL}/User-Details/Selective-Details`, {
            params: { 
                userEmail
            }
        }).then((res) => {
            setuserData(res.data)
            // console.log('User Data', res.data)
            // console.log('User id', res.data._id)
        }
        )

    }, [])

    const [visibleCards, setVisibleCards] = useState(8);

    const handleSeeMore = () => {
        setVisibleCards(prevVisibleCards => prevVisibleCards + 4);
    };

    function getDateMonthYear(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        return `${day}-${month}-${year}`;
    }
    const getBookCard = (_id) => {
        const filteredData = data.filter(item => item._id === _id);
        // console.log('filer', filteredData)
        setid(_id)
        setclickedTrip(...filteredData)
        // console.log('state', clickedTrip)
        //  console.log(clickedTrip.vendorEmail)
        handleShow();
    }
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name === 'NumberOfSeats') {
            const totalAmount = parseInt(value) * clickedTrip.tripPrice;
            const availableSeats = clickedTrip.tripSeats;

            if (parseInt(value) > availableSeats) {
                toast.error("Cannot reserve, seats are not available", { autoClose: 3000 });
                setTimeout(() => {
                    window.location.reload();
                }, 3000);

                // Clear the NumberOfSeats field
                setclientdata((prevClientData) => ({
                    ...prevClientData,
                    [name]: '',
                    TotalAmount: 0,
                }));

                return;
            }

            setclientdata((prevClientData) => ({
                ...prevClientData,
                [name]: parseInt(value),
                TotalAmount: totalAmount || 0,
            }));
        } else {
            setclientdata((prevClientData) => ({
                ...prevClientData,
                [name]: value,
            }));
        }
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // console.log('old', clickedTrip)
        // console.log('new', clientdata)

        const { tripDuration, updatedAt, createdAt, userPassword, userCnic, userDob, totalTours, totalFlights, tripSeats, tripPhoto, tripStatus, tripDescription, ...parsedData } = { ...clickedTrip, ...clientdata, ...userData };

        // console.log("data", parsedData)
        // console.log('trip id', parsedData._id)

        axios.post(`${BASE_URL}/trip-Records/Upload`, parsedData)
            .then(response => {
                try {
                    axios.put(`${BASE_URL}/Vendor/trips-Organized/Update-slots/${id}`, { NumberOfSeats: parsedData.NumberOfSeats })
                        .then(res => { 
                            axios.put(`${BASE_URL}/User-Details/UpdateTotalTrips`, null, {
                                params: {
                                    userEmail
                                }
                            }).then(resp => {
                                toast.success("Reserved successfully. Please wait for the confirmation call.", { autoClose: 3000 });
                                setTimeout(() => {
                                    window.location.reload();
                                }, 3000);
                            })
                        });
                } catch (error) {
                    console.log("Error while Updating", error);
                }
            })
            .catch(error => {
                console.error("booking Error", error);
            });


    };

    const Prop =
        <>
            <ToastContainer />
            {/* REACT BOOTSTRAP MODAL */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ marginLeft: '35%' }} >Book Ticket</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='row'>
                        <div className="form-group mt-3 col-12 col-sm-6 col-md-4 col-lg-3">
                            <label className='boldtext'>Vendor Email</label>
                            <input
                                type="text"
                                className="form-control text-muted borderoutline"
                                name="vendorEmail"
                                value={clickedTrip.vendorEmail}
                                readOnly
                            />
                        </div>
                        <div className="form-group mt-3 col-12 col-sm-6 col-md-4 col-lg-3">
                            <label className='boldtext' >Trip Id</label>
                            <input
                                type="text"
                                className="form-control text-muted borderoutline"
                                name="_id"
                                value={clickedTrip._id}
                                readOnly
                            />
                        </div>
                        <div className="form-group mt-3 col-12 col-sm-6 col-md-4 col-lg-3">
                            <label className='boldtext'>Departure</label>
                            <input
                                type="text"
                                className="form-control text-muted borderoutline"
                                name="Departure"
                                value={clickedTrip.tripFrom}
                                readOnly
                            />
                        </div>
                        <div className="form-group mt-3 col-12 col-sm-6 col-md-4 col-lg-3">
                            <label className='boldtext'>Destination</label>
                            <input
                                type="text"
                                className="form-control text-muted borderoutline"
                                name="Destination"
                                value={clickedTrip.tripTo}
                                readOnly
                            />
                        </div>
                        <div className="form-group mt-3 col-12 col-sm-6 col-md-4 col-lg-3">
                            <label className='boldtext'>Dated</label>
                            <input
                                type="text"
                                className="form-control text-muted borderoutline"
                                name="Date"
                                value={clickedTrip.tripDate}
                                readOnly
                            />
                        </div>
                        <div className="form-group mt-3 col-12 col-sm-6 col-md-4 col-lg-3">
                            <label className='boldtext'>Timing</label>
                            <input
                                type="time"
                                className="form-control text-muted borderoutline"
                                name="Timing"
                                value={clickedTrip.tripTiming}
                                readOnly
                            />
                        </div>
                        <div className="form-group mt-3 col-12 col-sm-6 col-md-4 col-lg-3">
                            <label className='boldtext'>Price (PKR)</label>
                            <input
                                type="number"
                                className="form-control text-muted borderoutline"
                                name="Price"
                                value={clickedTrip.tripPrice}
                                readOnly
                            />
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px 0' }}>
                            <hr style={{ flex: '1', height: '1px', backgroundColor: 'black', margin: '0 10px' }} />
                            <span style={{ backgroundColor: 'white', padding: '0 10px' }}>Booking Section</span>
                            <hr style={{ flex: '1', height: '1px', backgroundColor: 'black', margin: '0 10px' }} />
                        </div>

                        <div className='d-flex justify-content-around'>
                            <div className="form-group mt-3 col-12 col-sm-6 col-md-4 col-lg-3">
                                <label>No of Seats</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="NumberOfSeats"
                                    onChange={handleInputChange}
                                    // value={clientdata.numberOfSeats}
                                    placeholder="Enter Number of Seats"
                                />
                            </div>
                            <div className="form-group mt-3 col-12 col-sm-6 col-md-4 col-lg-3">
                                <label>Total</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="TotalAmount"
                                    onChange={handleInputChange}
                                    value={clientdata.TotalAmount}
                                    placeholder="NA" readOnly
                                />
                            </div>
                        </div>

                        <div className="form-group col-12 mt-5 d-flex justify-content-center">
                            <button type="submit" onClick={handleFormSubmit} className="btn btn-primary px-5">confirm</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            {/* REACT BOOTSTRAP MODAL */}
            <section className='mt-3' style={{ backgroundColor: '#E6EBF1',borderRadius:'12px'}}>
                <div className="text-center container py-5">
                    <div className="row">
                        <>
                            {data.slice(0, visibleCards).map((cardObj) => (
                                <Col className='col-lg-3 col-md-6 col-sm-6 mb-4'>
                                    <Card className='mt-2'>
                                        <Card.Body>
                                            <div className='d-flex justify-content-between mt-2'>
                                                <Card.Title>{cardObj.tripFrom}</Card.Title>
                                                <div style={{ textAlign: 'center' }} className='pt-3'>
                                                    <span style={{ position: 'relative', display: 'inline-block' }}>
                                                        <p style={{ position: 'absolute', top: '-15px', left: '50%', transform: 'translateX(-50%)' }} className='text-muted'>
                                                            {cardObj.tripDuration}h
                                                        </p>
                                                        <span style={{ width: '100px', display: 'block' }}>
                                                            <hr style={{ border: '2px solid', borderColor: 'green' }} />
                                                        </span>
                                                    </span>
                                                </div>
                                                <Card.Title>{cardObj.tripTo}</Card.Title>
                                            </div>
                                            <div className='d-flex justify-content-between mt-2'>
                                                <Card.Text className='text-muted'>{getDateMonthYear(cardObj.tripDate)}</Card.Text>
                                                <Card.Text className='ml-5 mt-2 text-muted' style={{ fontSize: "15px" }}>Time: {cardObj.tripTiming}</Card.Text>
                                            </div>
                                            <div class="d-flex justify-content-end">
                                                <Card.Text className='ml-5 ml-2 text-muted' style={{ fontSize: "15px" }}>Seats: {cardObj.tripSeats}</Card.Text>
                                            </div>
                                            <center>
                                                <button
                                                    className={`btn btn-primary text-white`}
                                                    onClick={() => getBookCard(cardObj._id)}
                                                >
                                                    Book Now <IoMdPaperPlane />
                                                </button>
                                            </center>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                            {visibleCards < data.length && (
                                <div className="col-lg-12 text-center">
                                    <button type="button" className="btn btn-primary" onClick={handleSeeMore}>
                                        See More
                                    </button>
                                </div>
                            )}
                        </>
                    </div>

                </div>
            </section>
        </>
    const topBar =
        <h4>Welcome to Travelholic Air Services</h4>
    return (
        <>
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

export default Usertrip
