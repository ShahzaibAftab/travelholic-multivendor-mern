import React, { useState } from 'react'
import Portal from '../Portal'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../App';

const UserCustomizedTrip = () => {
    const userEmail = localStorage.getItem('userEmail')
    const navigate = useNavigate();

    const [postId, setpostId] = useState()
    const [bidRecord, setBidrecord] = useState([])
    const [vendorBid, setvendorBid] = useState([])
    const [filteredBidRecord, setFilteredBidRecord] = useState();
    const [filteredVendorBidRecord, setfilteredVendorBidRecord] = useState();
    const [mergedData, setmergedData] = useState({});

    const [bidDisplay, setbidDisplay] = useState(false)

    useEffect(() => {
        axios
            .get(`${BASE_URL}/User-Customized-Trip/Display-Selective`, {
                params: {
                    userEmail
                },
            })
            .then((res) => {

                console.log("res data", res.data);
                setBidrecord(res.data)
                console.log("Saved-State:", bidRecord)

                bidRecord.forEach((arr) => {
                    if (Array.isArray(arr)) {
                        arr.forEach((item) => {
                            // Call your function and pass item and arr._id(for array)
                            console.log('iterate', item, arr._id);
                        });
                    } else {
                        // Handle the case when arr is not an array its an object
                        console.log('arr is not an array:', arr._id);

                        const _id = arr._id

                        axios.get(`${BASE_URL}/Vendor/Trip-Bids/Display-selective`, {
                            params: { _id } // Wrap the id in an object
                        })
                            .then((res) => {
                                console.log('im', res);
                            });
                    }
                });

            })
            .catch((error) => {
                console.error("Error fetching tour booking records", error);
            });
    }, [])

    const [Data, setData] = useState({
        userEmail,
        bidDescription: "",
        Open: true
    })

    const setValue = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const getBidByVendor = async (_id) => {

        axios.get(`${BASE_URL}/Vendor/Trip-Bids/Display-selective`, {
            params: { _id }
        }).then((res) => {
            console.log('i m', res.data);
            setvendorBid(res.data)
        });


    }
    const bookCustomTrip = (CustomizedtripId, id) => {
        const filteredData = bidRecord.filter(obj => obj._id === CustomizedtripId);
        setFilteredBidRecord(filteredData);
        console.log('UserTrip', filteredData);

        const resdata = vendorBid.filter(obj => obj._id === id);
        setfilteredVendorBidRecord(resdata);
        console.log('vendor', resdata);

        // Check if both filteredData and resdata have only one element
        if (filteredData.length === 1 && resdata.length === 1) {
            const { _id: filteredId, Open: filteredOpen, ...filteredWithoutId } = filteredData[0];
            const { _id: resId, avail: resAvail, ...resWithoutId } = resdata[0];

            const mergedObject = {
                ...filteredWithoutId,
                ...resWithoutId,
                CustomizedtripId
            };

            setmergedData(mergedObject);
            // console.log('merged', mergedObject);
            console.log(resdata[0].vendorEmail)
            const vendorEmail = resdata[0].vendorEmail;

            axios.post(`${BASE_URL}/Cusomized-Trip-Records/Upload`, mergedObject)
                .then(res => {
                    console.log('success', res.data)
                    // alert('Success')
                    axios.put(`${BASE_URL}/User-Customized-Trip/update-Open/${userEmail}`)
                        .then((response) => {
                            console.log('open status', response.data);
                            axios.put(`${BASE_URL}/Vendor/Trip-Bids/update-Avail/${CustomizedtripId}/${vendorEmail}`)
                                .then((response) => {
                                    console.log('Avail updated', response.data);
                                    toast.success("Booking Successfully, You will receive confirmation call shortly", { autoClose: 3000 });
                                    setTimeout(() => {
                                        window.location.reload();
                                    }, 3000);
                                })
                                .catch((error) => {
                                    console.error('Error:', error);
                                });

                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });

                })
        }
    };



    const onSubmit = (event) => {
        event.preventDefault();
        // console.log('data object:', Data);


        axios.post(`${BASE_URL}/User-Customized-Trip/Upload`, Data)
            .then((res) => {
                if (res.status === 201) {
                    toast.success("Post Successful", { autoClose: 3000 });
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                }
            });

    };
    const Prop =
        <section className='row mx-1 mt-3' style={{ backgroundColor: '#E6EBF1', borderRadius: '15px', minHeight: '600px' }}>
            <div className='col-6'>
                <div class="container mt-5">
                    <div class="border p-4 shadow" style={{ backgroundColor: 'white', borderRadius: '12px' }}>
                        <form className='col-12' onSubmit={onSubmit}>
                            <div className="form-group mx-auto">
                                <label className='text-muted my-1'>Enter your Tour Requirement</label>
                                <textarea
                                    type='text'
                                    name='bidDescription'
                                    onChange={setValue}
                                    placeholder="Write here...&#10;e.g 3-Day Tour to Gilgit Valley for 5 people"
                                    className="form-control center-textarea"
                                    rows="3"
                                    value={Data.bidDescription}
                                ></textarea>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <button type="submit" className="btn btn-primary mt-3 px-5 py-2">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className='col-6 mt-3'>
                <div style={{ maxHeight: '300px', overflow: 'scroll', borderRadius: '12px', border: '0', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    <table className="table bg-light">
                        <thead className="text-white" style={{ backgroundColor: '#1d4e89', position: 'sticky', top: '0', zIndex: '1' }}>
                            <tr>
                                <th style={{ textAlign: 'center' }} scope="col" colspan="14">Bid Details</th>
                            </tr>
                            <tr>
                                <th scope="col" colspan={2} >Id#</th>
                                <th scope="col" colspan={8}>Description</th>
                                <th scope="col" colspan={2}>Status</th>
                                <th scope="col" colspan={2}>Status</th>
                            </tr>
                        </thead>
                        <tbody style={{ maxHeight: '100px', overflow: 'scroll' }} >
                            {
                                bidRecord.length === 0 ? (
                                    <tr className='text-muted' style={{ fontWeight: '300' }}>
                                        <td className='px-auto' colSpan={9}>
                                            <center>No Active Bid</center>
                                        </td>
                                    </tr>
                                ) : (
                                    bidRecord.reverse().map(obj => {
                                        if (obj.Open) {
                                            return (
                                                <tr className='text-muted' style={{ fontWeight: '300' }}>
                                                    <th scope="col" colSpan={2}>{obj._id}</th>
                                                    <th scope="col" colSpan={8}>{obj.bidDescription}</th>
                                                    <th scope="col" colSpan={2}><h6 className='text-success'><b>Open</b></h6></th>
                                                    <button className='btn btn-outline-primary px-4 my-1' onClick={() => getBidByVendor(obj._id)} type='button' colSpan={2}>Show</button>
                                                </tr>
                                            );
                                        }
                                        return null; // Skip rendering if obj.Open is false
                                    })
                                )
                            }


                        </tbody>
                    </table>
                </div>
                <div className='mt-3' style={{ maxHeight: '250px', overflow: 'scroll', borderRadius: '12px', border: '0', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                    <table className="table bg-light">
                        <thead className="text-white" style={{ backgroundColor: '#1d4e89', position: 'sticky', top: 'auto' }}>
                            <tr>
                                <th style={{ textAlign: 'center' }} scope="col" colspan="12">Open Market</th>
                            </tr>
                            <tr>
                                <th scope="col" colSpan={2}>Id#</th>
                                <th scope="col" colspan={6}>Description</th>
                                <th scope="col" colspan={2}>Rate</th>
                                <th scope="col" colspan={2}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bidDisplay ? (<p >No Record Found</p>) : (
                                    vendorBid.map((obj =>
                                        <tr className='text-muted' style={{ fontWeight: '300' }}>
                                            <th scope="col" colspan={2}>{obj.CustomizedtripId}</th>
                                            <th scope="col" colspan={6}>{obj.vdescription}</th>
                                            <th scope="col" colspan={2}>{obj.rate}/-</th>
                                            <button type='button' onClick={() => bookCustomTrip(obj.CustomizedtripId, obj._id)} colSpan={2} className=' px-3 my-2 btn btn-outline-primary'>Choose</button>
                                        </tr>
                                    ))
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    const topBar = <h3>Travelholic Custom Tour Management</h3>
    return (
        <>
            <ToastContainer />

            {userEmail ? (
                <Portal Prop={Prop} topBar={topBar} />
            ) : (
                <>

                    <div className='d-flex justify-content-center align-items-center vh-100'>
                        <div className='text-center'>
                            <h6>You must login to access this page.</h6>
                            <button className='btn btn-danger' onClick={() => navigate('/user-signup')}>Login</button>
                        </div>
                    </div>

                </>
            )}
        </>
    )
}

export default UserCustomizedTrip
