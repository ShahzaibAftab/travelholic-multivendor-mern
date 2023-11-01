import React, { useState } from 'react'
import Vendor from '../Vendor'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { BASE_URL } from '../../App';

const Vendortour = () => {
    const navigate = useNavigate();
    const vendorEmail = localStorage.getItem('vendorEmail');
    const [formData, setFormData] = useState({

        vendorEmail,
        tourId: '',//0
        tourFrom: '',
        tourDuration: '',//0
        tourTo: '',
        tourDate: '',
        tourTiming: '',
        tourStatus: false,
        tourPhoto: File,
        tourSeats: '',//0
        tourPrice: '',
        tourDescription: ''
    })
    const handleInputChange = (event) => {
        const { name, value, files } = event.target;

        if (name === "tourPhoto") {
            setFormData((prevFormData) => ({
                ...prevFormData,
                tourPhoto: files[0]
            }));
        } else if (name === "tourDate") {
            const selectedDate = new Date(value);
            const currentDate = new Date();

            if (selectedDate.getTime() > currentDate.getTime()) {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    [name]: value
                }));
            } else {
                // Handle invalid date selection, such as displaying an error message
                return toast.error("Please Select a future Date", { autoClose: 3000 });
            }
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value
            }));
        }
    };


    const handleSubmit = (event) => {
        event.preventDefault();

        formData.tourId = 0
        formData.tourDuration = parseInt(formData.tourDuration);
        formData.tourSeats = parseInt(formData.tourSeats);
        formData.tourPrice = parseInt(formData.tourPrice);

        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }

        axios
            .post(`${BASE_URL}/Vendor/tours-Organized/Upload`, data)
            .then((response) => { 
                // console.log("success", response.data);
                // toast.success("Posted Successfully", { autoClose: 3000 });
                // setTimeout(() => {
                //     navigate('/vendor-Dashboard');
                // }, 3000);

                axios.put(`${BASE_URL}/Vendor-Details/UpdateTotalTours`, null, {
                    params: {
                        vendorEmail
                    }
                })
                    .then(response => {
                        // console.log(response.data); // Handle the response data
                        toast.success("Posted Successfully", { autoClose: 3000 });
                        setTimeout(() => {
                            navigate('/vendor-Dashboard');
                        }, 3000);
                    })
                    .catch(error => {
                        console.error(error); // Handle the error
                        return toast.error("Error! Please Try Again later", { autoClose: 3000 });
                    });

            })
            .catch((error) => {
                return toast.error("Error! Please Try Again later", { autoClose: 3000 });
            });
    };

    const Prop =
        <div className="col-10 card shadow-2-strong card-registration mt-2" style={{ borderRadius: '15px', width: '100%' }}>
            <div className="card-body p-4 p-md-3" style={{ backgroundColor: '#EFFAF5', borderRadius: '15px' }}>
                <h3 className="d-flex justify-content-center mb-2 pb-2 pb-md-0 mb-md-5" style={{ fontWeight: '700' }}>Register for a Tour</h3>
                <form className="g-3" enctype="multipart/form-data">

                    <div className="row">
                        <div className="col-md-3">
                            <div className="form-outline">
                                <label className="form-label"  >
                                    <img src="https://www.svgrepo.com/show/275185/tour.svg" alt="" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                                    Tour #
                                </label>
                                <input type="number" name="tourId" placeholder="Auto-Generated" readOnly value={formData.tourId} onChange={handleInputChange} id="tourId" className="form-control shadow" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="departure">
                                    <img src="https://www.svgrepo.com/show/499807/home-page.svg" alt="" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                                    Departure
                                </label>
                                <input type="text" name="tourFrom" value={formData.tourFrom} onChange={handleInputChange} id="tourDeparture" className="form-control shadow" placeholder='Enter Departure' />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="lastName">
                                    <img src="https://www.svgrepo.com/show/155586/calendar.svg" alt="" style={{ width: '40px', height: '30px', marginRight: '8px' }} />
                                    Tour Duration(Days)
                                </label>
                                <input type="number" name="tourDuration" value={formData.tourDuration} onChange={handleInputChange} id="tourDuration" className="form-control shadow" placeholder='Enter Tour Duration#' />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="TourDate">
                                    <img src="https://www.svgrepo.com/show/484293/date.svg" alt="" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                                    Tour Date
                                </label>
                                <input type="date" name="tourDate" value={formData.tourDate} onChange={handleInputChange} className="form-control shadow" id="tourDuration" placeholder='Enter Tour Date' />
                            </div>
                        </div>
                    </div>

                    <div className="row mt-5">
                        <div className="col-md-3">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="destination">
                                    <img src="https://www.svgrepo.com/show/492621/destination.svg" alt="" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                                    Destination
                                </label>
                                <input type="text" name="tourTo" value={formData.tourTo} onChange={handleInputChange} id="tourDestination" className="form-control shadow" placeholder='Enter Destination' />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="tourTime">
                                    <img src="https://www.svgrepo.com/show/474772/clock.svg" alt="" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                                    Tour Time
                                </label>
                                <input type="time" name="tourTiming" value={formData.tourTiming} onChange={handleInputChange} id="tourTime" className="form-control shadow" />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="tourSeats">
                                    <img src="https://www.svgrepo.com/show/285687/cinema-seats-theater.svg" alt="" style={{ width: '40px', height: '30px', marginRight: '8px' }} />
                                    Number of Seats
                                </label>
                                <input type="number" name="tourSeats" value={formData.tourSeats} onChange={handleInputChange} id="tourSeats" className="form-control shadow" placeholder='Enter No. of Seats' />
                            </div>
                        </div>
                    </div>

                    <div className="row mt-5">
                        <div className="col-md-3">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="lastName">
                                    <img src="https://www.svgrepo.com/show/422319/price-pricetag-tag.svg" alt="" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                                    Offer Price(Per Head)
                                </label>
                                <input type="text" name="tourPrice" value={formData.tourPrice} onChange={handleInputChange} id="tourPrice" className="form-control shadow" placeholder='Enter Price' />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label mt-1">
                                <img src="https://www.svgrepo.com/show/485544/upload-1.svg" alt="" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                                Attach Banner
                            </label>
                            <input type="file" name="tourPhoto" onChange={handleInputChange} className="form-control-file" /> </div>
                        <div className='col-md-6'>
                            <label className="form-label">
                                <img src="https://www.svgrepo.com/show/474814/document.svg" alt="" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                                Description
                            </label>
                            <textarea name="tourDescription" value={formData.tourDescription} onChange={handleInputChange} className="form-control shadow" rows="3" cols="6"></textarea>
                        </div>
                    </div>

                    <div className="col-12 d-flex justify-content-center mt-2">
                        <button className="px-5 mt-5 btn btn-success btn-lg" onClick={handleSubmit} type="submit">Apply</button>
                    </div>

                </form>
            </div>
        </div>

    const topBar = "List Your Tour Offers"
    return (
        <>
            <ToastContainer />
            {vendorEmail ? (
                <Vendor Prop={Prop} topBar={topBar} />
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
        </>
    )
}

export default Vendortour