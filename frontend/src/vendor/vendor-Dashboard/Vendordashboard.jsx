import React from 'react'
import Vendor from '../Vendor'
import { Container, Col, Row } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
} from 'mdb-react-ui-kit';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../App';

const Vendordashboard = () => {
  const vendorEmail = localStorage.getItem('vendorEmail');
  const navigate = useNavigate();
  // console.log(vendorEmail)
  const [tourData, setTourData] = useState([]);
  const [flightData, setFlightData] = useState([]);
  const [Details, setDetails] = useState([]);


  const [userComplain, setuserComplain] = useState([])

  const convertDate = (dateString) => {
    const date = new Date(dateString);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return (day + "-" + month + "-" + year)
  }

  useEffect(() => {
    const fetchflightData = async () => {
      try {
        await axios.get(`${BASE_URL}/Vendor/Trips-Organized/DisplayTable`, {
          params: {
            vendorEmail
          }
        }).then((res) => {
          setFlightData(res.data)
          // console.log('res',res.data)
        }
        )
      } catch (error) {
        console.log("Flight API:", error);
      }
    };

    const fetchtourData = async () => {
      try {
        await axios.get(`${BASE_URL}/Vendor/Tours-Organized/DisplayTable`, {
          params: {
            vendorEmail
          }
        }).then((res) => {
          setTourData(res.data);
        });
      } catch (error) {
        console.log('Tour API', error);
      }
    };


    const fetchDetails = async () => {
      try {
        await axios.get(`${BASE_URL}/Vendor-Details/Selective-Details`, {
          params: {
            vendorEmail
          }
        }).then((res) => setDetails(res.data))
      } catch (error) {
        console.log('Details', error);
      }
    }
    axios.get(`${BASE_URL}/User-Complains/Display`)
      .then((res) => {
        setuserComplain(res.data)
        // console.log(res.data)
      })
    fetchflightData();
    fetchtourData();
    fetchDetails();

  }, []);


  const topBar = "Hi! Welcome to Travelholic Vendor Dashboard"
  const Prop =
    <section style={{ backgroundColor: '#EFFAF5' }} className='mt-3 rounded-3 pb-3'>
      <Container fluid className='w-100'>
        <Row>
          <Col md={3}>
            <div className="pt-5 pb-5 mt-5 mb-3 d-flex justify-content-center text-bold shadow" style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <h3 style={{ fontWeight: '700' }}>Total Trips:<span className='text-muted'> {Details.totalFlights}</span></h3>
            </div>
          </Col>
          <Col md={3}>
            <div className="pt-5 pb-5 mt-5 mb-3 d-flex justify-content-center text-bold shadow" style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <h3 style={{ fontWeight: '700' }}>Total Tours:<span className='text-muted'> {Details.totalTours}</span></h3>
            </div>
          </Col>
          <Col md={6}>
            <MDBCard className='shadow' style={{ border: '0', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', marginTop: '20px' }}>
              <MDBCardBody style={{ maxHeight: '200px', overflowY: 'scroll' }}>
                <MDBRow>
                  <MDBCol sm="12">
                    <MDBCardText style={{ fontWeight: '600', fontSize: '20px' }} className="d-flex justify-content-center">Complains</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                {userComplain.map((obj =>
                (
                  (!obj.solved) &&
                  <>
                    <MDBRow>
                      <MDBCol sm="4">
                        <MDBCardText>{obj.userName}</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="4">
                        <MDBCardText className="text-muted">{obj.complainType}</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="4">
                        <MDBCardText className="text-muted">{obj.complainDetails}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
                  </>
                )))}

              </MDBCardBody>
            </MDBCard>

          </Col>
          <Col md={12}>
            <h4 className='d-flex justify-content-center mt-5 mb-3'> Sales & Record</h4>
          </Col>
          <Row className='d-flex justify-content-between mb-4'>
            <Col md={6}>
              <div style={{ maxHeight: '240px', overflowY: 'scroll', borderRadius: '12px', border: '0', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                <table className="table bg-light">
                  <thead className=" text-white" style={{ backgroundColor: '#52B586' }}>
                    <tr>
                      <th colSpan={4}><center>Flight Details</center></th>
                    </tr>
                    <tr>
                      {/* <th scope="col">Tour#</th> */}
                      <th scope="col">Departure#</th>
                      <th scope="col">Date</th>
                      <th scope="col">Time</th>
                      <th scope="col">Arrival</th>
                    </tr>
                  </thead>
                  <tbody className='text-muted'>
                    {flightData.length === 0 ? (
                      <tr>
                        <td className='px-auto' colSpan={4}><center>No Record Found</center></td>
                      </tr>
                    ) : (
                      flightData.map(obj => (
                        <tr>
                          <td>{obj.tripFrom}</td>
                          <td>{convertDate(obj.tripDate)}</td>
                          <td>{obj.tripTiming}</td>
                          <td>{obj.tripTo}</td>
                        </tr>
                      ))
                    )}

                  </tbody>
                </table>
              </div>
            </Col>
            <Col md={6}>
              <div style={{ paddingRight: "0", maxHeight: '240px', overflowY: 'scroll', borderRadius: '12px', border: '0', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                <table className="table bg-light">
                  <thead className=" text-white" style={{ backgroundColor: '#52B586' }}>
                    <tr>
                      <th colSpan={4}><center>Tour Details</center></th>
                    </tr>
                    <tr>
                      {/* <th scope="col">Trip#</th> */}
                      <th scope="col">Departure</th>
                      <th scope="col">Date</th>
                      <th scope="col">Time</th>
                      <th scope="col">Arrival</th>
                    </tr>
                  </thead>
                  <tbody className='text-muted'>
                    {/* {tourData.map(obj => (
                      <tr>
                        <td>{obj.tourFrom}</td>
                        <td>{convertDate(obj.tourDate)}</td>
                        <td>{obj.tourTiming}</td>
                        <td>{obj.tourTo}</td>
                      </tr>
                    ))} */}
                    {tourData.length === 0 ? (
                      <tr>
                        <td colSpan={4}><center>No Record Found</center></td>
                      </tr>
                    ) : (
                      tourData.map(obj => (
                        <tr>
                          <td>{obj.tourFrom}</td>
                          <td>{convertDate(obj.tourDate)}</td>
                          <td>{obj.tourTiming}</td>
                          <td>{obj.tourTo}</td>
                        </tr>
                      ))
                    )}

                  </tbody>
                </table>
              </div>
            </Col>
          </Row>
        </Row>
      </Container>
    </section>
  return (
    <>
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

export default Vendordashboard