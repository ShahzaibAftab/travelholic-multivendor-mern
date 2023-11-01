import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Vendor from '../Vendor'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../App';
import { toast, ToastContainer } from 'react-toastify';

const VendorBid = () => {
    const vendorEmail = localStorage.getItem('vendorEmail')
    const navigate = useNavigate()

    const [bidRecord, setBidrecord] = useState([])
    const [bidRate, setBidRate] = useState({
        CustomizedtripId: "",
        vendorEmail,
        rate: "",
        vdescription: "",
        avail: false
    })

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [id, setid] = useState();
    const [data, setdata] = useState([])
    useEffect(() => {

        axios.get(`${BASE_URL}/Cusomized-Trip-Records/Display-selective-vendor`, {
            params: {
                vendorEmail
            }
        }).then((res => {
            // console.log('data', res.data)
            setdata(res.data)
        }))


        axios
            .get(`${BASE_URL}/User-Customized-Trip/Display`)
            .then((res) => {
                // console.log("res data", res.data);
                setBidrecord(res.data)
                console.log("Saved-State:", bidRecord)
            })
            .catch((error) => {
                console.error("Error fetching tour booking records", error);
            });
    }, [])
    const getRecord = (_id) => {
        // console.log('id', _id)
        handleShow();
        setid(_id)
    }
    const setValues = (e) => {
        const { name, value } = e.target;
        setBidRate((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const sendQuote = (e) => {
        e.preventDefault();
        // console.log('initial', bidRecord)
        bidRate.CustomizedtripId = id
        const rate = parseInt(bidRate.rate, 10);

        const updatedBidRate = {
            ...bidRate,
            rate
        };

        // console.log('obj', updatedBidRate) 

        axios.post(`${BASE_URL}/Vendor/Trip-Bids/Upload`, updatedBidRate)
            .then((res) => {
                if (res.status === 201) {
                    toast.success("Booking Successfully, You will receive confirmation call shortly", { autoClose: 3000 });
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                }
                else {
                
                    toast.error("Error Updating,try again Later", { autoClose: 3000 });
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                }

            }).catch((error) => {
                console.log('error', error)
            })

    }

    const Prop =
        <section className='mt-3' style={{ backgroundColor: '#EFFAF5', minHeight: '580px', borderRadius: '15px' }}>
            <div className='row'>
                <div className='col-6 mt-3'>
                    <div className='shadow' style={{ maxHeight: '600px', overflow: 'scroll', borderRadius: '12px', border: '0', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                        <table className="table bg-light">
                            <thead className="text-white" style={{ backgroundColor: '#52B586', }}>
                                <tr>
                                    <th style={{ textAlign: 'center' }} scope="col" colspan="10">Bid Section</th>
                                </tr>
                                <tr>
                                    {/* <th scope="col">Tour#</th> */}
                                    <th scope="col">Bid#</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    bidRecord.length === 0 ? (
                                        <td className='px-auto' colSpan={9}><center>No Active Bid found</center></td>
                                    ) : (
                                        bidRecord
                                            .filter(obj => obj.Open == true)
                                            .reverse()
                                            .map(obj => (
                                                <tr className='text-muted' style={{ fontWeight: '300' }} key={obj._id}>
                                                    <th scope="col">{obj._id}</th>
                                                    <th scope="col">{obj.bidDescription}</th>
                                                    <td> {console.log('bidddd', bidRecord)}
                                                        <button type='button' onClick={() => getRecord(obj._id)} className='btn btn-outline-warning px-4 my-1'>Bid</button>
                                                    </td>
                                                </tr>
                                            ))
                                    )
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='col-6 mt-3'>
                    <div className='shadow' style={{ maxHeight: '600px', overflow: 'scroll', borderRadius: '12px', border: '0', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                        <table className="table bg-light">
                            <thead className="text-white" style={{ backgroundColor: '#52B586', }}>
                                <tr>
                                    <th style={{ textAlign: 'center' }} scope="col" colspan="10">Customized Booking Record</th>
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
                </div>

            </div>
        </section>

    const topBar = <h3>Travelholic Custom Bidding </h3>
    return (
        <>
            <ToastContainer />

            {vendorEmail ? (
                <Vendor Prop={Prop} topBar={topBar} />
            ) : (
                <>
                    <div className='d-flex justify-content-center align-items-center vh-100'>
                        <div className='text-center'>
                            <h6>You must create an account to access this page.</h6>
                            <button className='btn btn-danger' onClick={() => navigate('/vendor-Signin')}>Signup</button>
                        </div>
                    </div>

                </>
            )}


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='px-auto'>Quote Your offer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className='row' onSubmit={sendQuote}>

                        <div className="form-group mt-3 col-12">

                            <center><label className='boldtext text-center px-auto'>Trip Id#</label></center>
                            <input
                                type="text"
                                className="form-control text-muted borderoutline text-center"
                                name="CustomizedtripId"
                                value={id}
                                readOnly
                            />

                        </div>
                        <div className='d-flex justify-content-between text-muted px-3'>
                            <div className="form-group mt-3 col-4">
                                <label>Offer Rate</label>
                                <input
                                    type="number" required
                                    className="form-control"
                                    name="rate"
                                    onChange={setValues}
                                    placeholder="Enter Number of Seats"
                                />
                            </div>
                            <div className="form-group mt-3 col-6">
                                <label>Description/Note</label>

                                <textarea className='form-control' name='vdescription' onChange={setValues} cols={8} rows={3}></textarea>
                            </div>
                        </div>
                        <center> <Button className='col-4 mt-4' type='submit' variant="primary" onClick={handleClose}>Confirm</Button></center>
                    </form>

                </Modal.Body>
            </Modal>
        </>
    )
}

export default VendorBid
