import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Portal from '../Portal'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../App'

const UserCustomHistory = () => {
    const navigate=useNavigate()
    const userEmail = localStorage.getItem('userEmail')

    const [data, setdata] = useState([])
    useEffect(() => {
       
        axios.get(`${BASE_URL}/Cusomized-Trip-Records/Display-selective-User`, {
            params: {
                userEmail
            }
        }).then((res => {
            // console.log('data', res.data)
            setdata(res.data)
        }))
            .catch((error) => {
                console.log('Error checking userEmail:', error);
            });

    }, [])
    const topBar = <h3>Custom Trip Record</h3>
    const Prop = <>
        <Row className='d-flex justify-content-between mt-3'>
            <Col md={12}>
                <div style={{ maxHeight: '600px', overflow: 'scroll', borderRadius: '12px', border: '0', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    <table className="table bg-light">
                        <thead className="text-white" style={{ backgroundColor: '#1d4e89' }}>
                            <tr>
                                <th style={{ textAlign: 'center' }} scope="col" colspan="10">User Customized Trip Details</th>
                            </tr>
                            <tr>
                                {/* <th scope="col">Tour#</th> */}
                                <th scope="col">Customized trip#</th>
                                <th scope="col">Vendor Email</th>
                                <th scope="col">Rate</th>
                                <th scope="col" colSpan="2">Description</th>
                                <th scope="col">|</th>
                                <th scope="col">User Email</th>
                                <th scope="col">Bid Description</th>
                                <th scope="col">Status</th>

                            </tr>
                        </thead>
                        <tbody>

                            {data.length === 0 ? (
                                <tr className='text-muted' style={{ fontWeight: '300' }}>
                                    <td className='px-auto' colSpan={10}><center>No data available</center></td>
                                </tr>
                            ) : (
                                <>
                                    {data.map((item) => (
                                        <tr className='text-muted' style={{ fontWeight: '300' }}>
                                            <td>{item.CustomizedtripId}</td>
                                            <td>{item.vendorEmail}</td>
                                            <td>{item.rate}</td>
                                            <td colSpan="2">{item.vdescription}</td>
                                            <td>|</td>

                                            <td>{item.userEmail}</td>
                                            <td>{item.bidDescription}</td>
                                            <td><b className='text-success'>Booked</b></td>

                                        </tr>
                                    ))}
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
            </Col>
        </Row>
    </>
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
            <Portal Prop={Prop} topBar={topBar} />
        </>
    )
}

export default UserCustomHistory
