import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Header from '../Header'
import { toast, ToastContainer } from 'react-toastify';
import Modal from 'react-bootstrap/Modal';
import { BASE_URL } from './../../App';

const Tour = () => {

    const [data, setdata] = useState([])
    const [clickedTour, setclickedTour] = useState([])
    const [clientdata, setclientdata] = useState({});

    useEffect(() => {
        axios.get(`${BASE_URL}/Vendor/Tours-Organized/Display`)
            .then((res) => {
                setdata(res.data)
                // console.log(res.data)
            })
    }, [])

    const [visibleCards, setVisibleCards] = useState(8);
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name === 'NumberOfSeats') {
            const totalAmount = parseInt(value) * clickedTour.tourPrice;
            const availableSeats = clickedTour.tourSeats;

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
    const getBookCard = (_id, tourSeats) => {
        // console.log('ts:',_id)
        // console.log('ts:',tourSeats)
        if (tourSeats === 0) {
            return toast.error("Sorry! all slots are already booked", { autoClose: 3000 });
        }
        else {
            const filteredData = data.filter(item => item._id === _id);
            // console.log('filer', filteredData)
            setclickedTour(...filteredData)
            // console.log('state', clickedTour)
            //  console.log(clickedTour.vendorEmail)
            handleShow();
        }
    }
    // REACT BOOTSTRAP MODAL FORMIK & YUP 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // REACT BOOTSTRAP MODAL 

    const handleFormSubmit = (event) => {
        event.preventDefault();
        // console.log('old', clickedTour)
        // console.log('new', clientdata)

        if (clientdata.ContactNo.length !== 11) {
            // For example, you can define an error state and set it when the validation fails
            alert('Contact number must be exactly 11 digits');
            return; // Stop form submission if validation fails
        }
        else {
            const { tripSeats, tourPhoto, tourStatus, tourDescription, ...parsedData } = { ...clickedTour, ...clientdata };

            // console.log("data", parsedData)
            // console.log('trip id', parsedData._id)

            axios.post(`${BASE_URL}/Tour-Records/Upload`, parsedData)
                .then(response => {
                    try {
                        axios.put(`${BASE_URL}/Vendor/Tours-Organized/Update-slots/${parsedData._id}`, { NumberOfSeats: parsedData.NumberOfSeats })
                            .then(res => {
                                toast.success("Reserved successfully. Please wait for the confirmation call.", { autoClose: 3000 });
                                setTimeout(() => {
                                    window.location.reload();
                                }, 3000);
                            });
                    } catch (error) {
                        console.log("Error while Updating", error);
                    }
                })
                .catch(error => {
                    console.error("booking Error", error);
                });

        }
    };

    return (
        <>
            <ToastContainer />
            <Header />
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
                                value={clickedTour.vendorEmail}
                                readOnly
                            />
                        </div>
                        <div className="form-group mt-3 col-12 col-sm-6 col-md-4 col-lg-3">
                            <label className='boldtext' >Tour Id</label>
                            <input
                                type="text"
                                className="form-control text-muted borderoutline"
                                name="_id"
                                value={clickedTour._id}
                                readOnly
                            />
                        </div>
                        <div className="form-group mt-3 col-12 col-sm-6 col-md-4 col-lg-3">
                            <label className='boldtext'>Departure</label>
                            <input
                                type="text"
                                className="form-control text-muted borderoutline"
                                name="Departure"
                                value={clickedTour.tourFrom}
                                readOnly
                            />
                        </div>
                        <div className="form-group mt-3 col-12 col-sm-6 col-md-4 col-lg-3">
                            <label className='boldtext'>Destination</label>
                            <input
                                type="text"
                                className="form-control text-muted borderoutline"
                                name="Destination"
                                value={clickedTour.tourTo}
                                readOnly
                            />
                        </div>
                        <div className="form-group mt-3 col-12 col-sm-6 col-md-4 col-lg-3">
                            <label className='boldtext'>Dated</label>
                            <input
                                type="text"
                                className="form-control text-muted borderoutline"
                                name="Date"
                                value={clickedTour.tourDate}
                                readOnly
                            />
                        </div>
                        <div className="form-group mt-3 col-12 col-sm-6 col-md-4 col-lg-3">
                            <label className='boldtext'>Timing</label>
                            <input
                                type="time"
                                className="form-control text-muted borderoutline"
                                name="Timing"
                                value={clickedTour.tourTiming}
                                readOnly
                            />
                        </div>
                        <div className="form-group mt-3 col-12 col-sm-6 col-md-4 col-lg-3">
                            <label className='boldtext'>Price (PKR)</label>
                            <input
                                type="number"
                                className="form-control text-muted borderoutline"
                                name="Price"
                                value={clickedTour.tourPrice}
                                readOnly
                            />
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px 0' }}>
                            <hr style={{ flex: '1', height: '1px', backgroundColor: 'black', margin: '0 10px' }} />
                            <span style={{ backgroundColor: 'white', padding: '0 10px' }}>Booking Section</span>
                            <hr style={{ flex: '1', height: '1px', backgroundColor: 'black', margin: '0 10px' }} />
                        </div>

                        <div className="form-group mt-3 col-12 col-sm-6 col-md-6 col-lg-6">
                            <label>Client Name</label>
                            <input
                                type="text"
                                className="form-control"
                                name="ClientName"
                                onChange={handleInputChange}
                                // value={clientdata.clientName}
                                placeholder="Enter Client Name"
                            />
                        </div>
                        <div className="form-group mt-3 col-12 col-sm-6 col-md-6 col-lg-6">
                            <label>Contact No</label>
                            <input
                                type="number"
                                className="form-control"
                                name="ContactNo"
                                onChange={handleInputChange}
                                // value={clientdata.contactNo}
                                placeholder="Enter Contact No"
                            />
                        </div>
                        <div className="form-group mt-3 col-12 col-sm-6 col-md-6 col-lg-6">
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
                        <div className="form-group col-12 mt-5 d-flex justify-content-center">
                            <button type="submit" onClick={handleFormSubmit} className="btn btn-primary px-5">confirm</button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            <section style={{ backgroundColor: '#eee' }}>
                <div className="text-center container py-5">
                    <h4 className="mt-4 mb-5"><strong>Discover Exciting Travel Experiences</strong></h4>
                    <div className="row">
                        <>
                            {data.slice(0, visibleCards).reverse().map((obj) => (
                                <div className="col-lg-3 col-md-6 col-sm-6 mb-4" key={obj.id}>
                                    <div className="card shadow" style={{ borderRadius: '15px' }}>
                                        <div className="bg-image hover-overlay ripple ripple-surface ripple-surface-light" data-mdb-ripple-color="light">
                                            <img loading="lazy" src={`${BASE_URL}/Uploads/Tours/${obj.tourPhoto}`} alt='' style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px', width: '100%', height: '200px' }} className="img-fluid" />
                                            <a href="#!">
                                                <div className="mask" />
                                            </a>
                                        </div>
                                        <div className="card-body pb-0">
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    <p><a href="#!" className="text-dark fw-bold">{obj.tourFrom} to {obj.tourTo}</a></p>
                                                    <p className="small text-muted">
                                                        {obj.tourDescription}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className="my-0" />
                                        <div className="card-body pb-0">
                                            <div className="d-flex justify-content-between">
                                                <p><a href="#!" className="text-dark fw-bold">{obj.tourPrice} PKR</a></p>
                                                <p className="text-muted">Slots available: {obj.tourSeats}</p>
                                            </div>
                                        </div>
                                        <hr className="my-0" />
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between align-items-center pb-2 mb-1">
                                                <a href="#!" className="text-muted ">{getDateMonthYear(obj.tourDate)}</a>
                                                <button type="button" className="btn btn-primary" onClick={() => getBookCard(obj._id, obj.tourSeats)}>Book now</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
    )
}

export default Tour