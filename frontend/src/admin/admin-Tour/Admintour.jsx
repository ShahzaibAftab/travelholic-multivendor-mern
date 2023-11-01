import React, { useEffect, useState } from 'react'
import {  Col, Row } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify';
import Panel from '../Panel';
import axios from 'axios';
import { BASE_URL } from '../../App';
const Admintour = () => {
  const [tourData, settourData] = useState([])
  const adminEmail = localStorage.getItem('adminEmail');
  useEffect(() => {
    axios.get(`${BASE_URL}/Vendor/Tours-Organized/Display`)
      .then((res) => {
        // console.log(res.data)
        settourData(res.data)
      })

  }, []) 
  const deleteEntry = (_id) => {
    axios.delete(`${BASE_URL}/Vendor/Tours-Organized/Delete-Organized-Tour/${_id}`)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Deleted Successfully", { autoClose: 3000 });
          setTimeout(() => {
            window.location.reload()
          }, 3000);
        }
        else {
          toast.error("Error! Try Again Later", { autoClose: 3000 })
          setTimeout(() => {
            window.location.reload()
          }, 3000);
        }
      })
  }
  const convertDate = (dateString) => {

    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return (day + "-" + month + "-" + year)
  }
  const topBar = <h4>Vendor Tour Details </h4>
  const Prop =
    <Row className='d-flex justify-content-between mt-3'>
      <Col md={12}>
        <div style={{ maxHeight: '600px', overflowY: 'scroll', borderRadius: '12px', border: '0', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <table className="table bg-light">
            <thead className="text-white" style={{ backgroundColor: '#111827', }}>
              <tr>
                <th style={{ textAlign: 'center' }} scope="col" colspan="11">Tour Details</th>
              </tr>
              <tr>
                {/* <th scope="col">Tour#</th> */}
                <th scope="col">Vendor Email</th>
                <th scope="col">Tour Id</th>
                <th scope="col">Departure</th>
                <th scope="col">Destination</th>
                <th scope="col">Duration</th>
                <th scope="col" colSpan="2">Time & Date</th>
                <th scope="col">Price(PKR)</th>
                <th scope="col">Seats</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                tourData.length === 0 ? (
                  <td className='px-auto' colSpan={9}><center>No Record Found</center></td>
                ) : (
                  tourData.reverse().map(obj => (
                    <tr className='text-muted' style={{ fontWeight: '300' }}>
                      <th scope="col">{obj.vendorEmail}</th>
                      <th scope="col">{obj._id}</th>
                      <th scope="col">{obj.tourFrom}</th>
                      <th scope="col">{obj.tourTo}</th>
                      <th scope="col">{obj.tourDuration}</th>
                      <th scope="col" colSpan="2">{convertDate(obj.tourDate)}<br />{obj.tourTiming} </th>
                      <th scope="col">{obj.tourPrice + "/-"} </th>
                      <th scope="col">{obj.tourSeats}</th>
                      <th scope="col">{obj.tourStatus ? <h6>True</h6> : <h6>False</h6>}</th>
                      <button type='button' onClick={() => deleteEntry(obj._id)} className='btn btn-danger text-muted'>Delete</button>
                    </tr>
                  ))
                )
              }


            </tbody>
          </table>
        </div>
      </Col>
    </Row>
  return (
    <div>
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
    </div>
  )
}

export default Admintour
