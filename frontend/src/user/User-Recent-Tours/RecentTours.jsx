import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Portal from '../Portal'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../App'


const RecentTours = () => {
    const navigate = useNavigate();
    const userEmail = localStorage.getItem('userEmail');

    const convertDate = (dateString) => {

        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        return (day + "-" + month + "-" + year)
    }

    useEffect(() => {
        axios 
            .get(`${BASE_URL}/Tour-Records/Display-recent-tour-record`, {
                params: {
                    userEmail,
                },
            })
            .then((res) => {
                // console.log("Tour booking Record", res.data);
                setbookingData(res.data)
                // console.log("Record-State:", bookingData)

            })
            .catch((error) => {
                console.error("Error fetching tour booking records", error);
            });
    }, []);

    const [bookingData, setbookingData] = useState([])
    const Prop = <>
        <Row className='d-flex justify-content-between mt-3'>
            <Col md={12}>
                <div style={{ maxHeight: '600px', overflow: 'scroll', borderRadius: '12px', border: '0', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    <table className="table bg-light">
                        <thead className="text-white" style={{ backgroundColor: '#1d4e89' }}>
                            <tr>
                                <th style={{ textAlign: 'center' }} scope="col" colspan="10">Tour Details</th>
                            </tr>
                            <tr>
                                {/* <th scope="col">Tour#</th> */}
                                <th scope="col">Tour Id</th>
                                <th scope="col">Departure</th>
                                <th scope="col">Destination</th>
                                <th scope="col" colSpan="2">Time & Date</th>
                                <th scope="col">Client Name</th>
                                <th scope="col">Contact#</th>
                                <th scope="col">Seats</th>
                                <th scope="col">Total(PKR)</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bookingData.length === 0 ? (
                                    <td className='px-auto' colSpan={9}><center>No Record Found</center></td>
                                ) : (
                                    bookingData.reverse().map(obj => (
                                        <tr className='text-muted' style={{ fontWeight: '300' }}>
                                            {/* <th scope="col">{obj.userEmail}</th> */}
                                            <th scope="col">{obj._id}</th>
                                            <th scope="col">{obj.tourFrom}</th>
                                            <th scope="col">{obj.tourTo}</th>
                                            <th scope="col" colSpan="2">{convertDate(obj.tourDate)}<br />{obj.tourTiming} </th>
                                            <th scope="col">{obj.ClientName}</th>
                                            <th scope="col">{obj.ContactNo}</th>
                                            <th scope="col">{obj.NumberOfSeats}</th>
                                            <th scope="col">{obj.TotalAmount + "/-"}</th>
                                            <th scope="col">{obj.tourStatus ? <h6>True</h6> : <h6>False</h6>}</th>
                                        </tr>
                                    ))
                                )
                            }


                        </tbody>
                    </table>
                </div>
            </Col>
        </Row>
    </>
    const topBar = <h3> Tour Booking Record </h3>
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

export default RecentTours
