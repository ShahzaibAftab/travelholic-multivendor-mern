import React, { useState } from 'react'
import Vendor from '../Vendor'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../App';

const Vendorflight = () => {
    const vendorEmail = localStorage.getItem('vendorEmail');
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        vendorEmail,
        tripId: '',//0
        tripFrom: '',
        tripDuration: '',//0
        tripTo: '',
        tripDate: '',
        tripTiming: '',
        tripStatus: false,
        tripSeats: '',//0
        tripPrice: '',
        tripDescription: ''
    })
    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name === "tripDate") {
            const selectedDate = new Date(value);
            const currentDate = new Date();

            if (selectedDate.getTime() > currentDate.getTime()) {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    [name]: value
                }));
            } else {
                return toast.error("Please select a future date for the flight.", { autoClose: 3000 });
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

        const updatedFormData = {
            ...formData,
            tripId:0,
            tripDuration: parseInt(formData.tripDuration),
            tripSeats: parseInt(formData.tripSeats),
            tripPrice: parseInt(formData.tripPrice)
        };

        const data = new FormData();
        for (const key in updatedFormData) {
            data.append(key, updatedFormData[key]);
        }

        // console.log('data', data)
        // console.log('updated', updatedFormData)
        axios.post(`${BASE_URL}/Vendor/Trips-Organized/Upload`, updatedFormData)
            .then((response) => {
                console.log("success", response.data);
                if (response.status === 201) {
                    toast.success("Posted successfully", { autoClose: 3000 });
                    axios.put(`${BASE_URL}/Vendor-Details/UpdateTotalTrips`, null, {
                        params: {
                            vendorEmail
                        }
                    })
                        .then(response => {
                           // console.log(response.data); // Handle the response data
                            // navigate('/vendor-Dashboard');
                            toast.success("Success - Trip Posted", { autoClose: 3000 });
                            setTimeout(() => {
                                navigate('/vendor-Dashboard');
                            }, 3000);
                        })
                        .catch(error => {
                            console.error(error); // Handle the error
                        });
                }
                else {

                    toast.error("Failed - Please contact Administrator", { autoClose: 3000 });
                    setTimeout(() => {
                        navigate('/vendor-Issue-Flight-Ticket');
                    }, 3000);
                }
            })
        console.log(formData);

    }
    const Prop =
        <div className="col-10 card shadow-2-strong card-registration mt-2" style={{ borderRadius: '15px', width: '100%' }}>
            <div className="card-body p-4 p-md-3" style={{ backgroundColor: '#EFFAF5', borderRadius: '15px' }}>
                <h3 className="d-flex justify-content-center mb-2 pb-2 pb-md-0 mb-md-5">Apply for a flight</h3>
                <form className="g-3">

                    <div className="row">
                        <div className="col-md-3">
                            <div className="form-outline">
                                <label className="form-label">
                                    <img src="https://www.svgrepo.com/show/474700/search.svg" alt="" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                                    Flight #
                                </label>
                                <input type="number" name="tripId" value={formData.tripId} readOnly onChange={handleInputChange} id="flightId" className="form-control shadow" placeholder='Auto-Generated' />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="departure">
                                    <img src="https://www.svgrepo.com/show/197153/departure-airport.svg" alt="" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                                    Departure
                                </label>
                                <input type="text" name="tripFrom" value={formData.tripFrom} onChange={handleInputChange} id="flightDeparture" className="form-control shadow" placeholder='Enter Departure' />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-outline">
                                <label className="form-label">
                                    <img src="https://www.svgrepo.com/show/15410/airplane.svg" alt="" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                                    flight Duration(Hours)
                                </label>
                                <input type="number" name="tripDuration" value={formData.tripDuration} onChange={handleInputChange} id="flightDuration" className="form-control shadow" placeholder='Enter Flight Duration' />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="flightDate">
                                    <img src="https://www.svgrepo.com/show/474756/calendar.svg" alt="" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                                    flight Date
                                </label>
                                <input type="date" name="tripDate" value={formData.tripDate} onChange={handleInputChange} className="form-control shadow" id="flightDuration" placeholder='Enter Flight Date' />
                            </div>
                        </div>
                    </div>

                    <div className="row mt-5">
                        <div className="col-md-3">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="destination">
                                    <img src="https://www.svgrepo.com/show/260688/route.svg" alt="" style={{ width: '30px', height: '30px', marginRight: '8px' }} />

                                    Destination
                                </label>
                                <input type="text" name="tripTo" value={formData.tripTo} onChange={handleInputChange} id="flightDestination" className="form-control shadow" placeholder='Enter Flight Destination' />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="flightTime">
                                    <img src="https://www.svgrepo.com/show/503644/clock.svg" alt="" style={{ width: '30px', height: '30px', marginRight: '8px' }} />

                                    flight Time
                                </label>
                                <input type="time" name="tripTiming" value={formData.tripTiming} onChange={handleInputChange} id="flightTime" className="form-control shadow" placeholder='Enter Flight Timings' />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="flightSeats">
                                    <img src="https://www.svgrepo.com/show/285687/cinema-seats-theater.svg" alt="" style={{ width: '30px', height: '30px', marginRight: '8px' }} />

                                    Number of Seats
                                </label>
                                <input type="number" id="flightSeats" name="tripSeats" value={formData.TripSeats} onChange={handleInputChange} className="form-control shadow" placeholder='Enter No. of seats' />
                            </div>
                        </div>
                    </div>

                    <div className="row mt-5">
                        <div className="col-md-3">
                            <div className="form-outline">
                                <label className="form-label" htmlFor="lastName">
                                    <img src="https://www.svgrepo.com/show/513339/price-tag.svg" alt="" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                                    Offer Price(Per Head)
                                </label>
                                <input type="text" name="tripPrice" value={formData.TripPrice} onChange={handleInputChange} id="flightPrice" className="form-control shadow" placeholder='Enter Ticket price' />
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <label className="form-label">
                                <img src="https://www.svgrepo.com/show/499759/edit.svg" alt="" style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                                Description
                            </label>
                            <textarea name="tripDescription" value={formData.TripDescription} onChange={handleInputChange} className="form-control shadow" rows="3" cols="6"></textarea>
                        </div>
                    </div>

                    <div className="col-12 d-flex justify-content-center mt-2">
                        <button onClick={handleSubmit} className="px-5 mt-5 btn btn-success btn-lg" type="submit">Apply</button>
                    </div>

                </form>
            </div>
        </div>


    const topBar = "Issue Flight Ticket"
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

export default Vendorflight