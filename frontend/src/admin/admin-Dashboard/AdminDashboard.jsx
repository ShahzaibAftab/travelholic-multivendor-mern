import React, { useEffect, useState } from 'react'
import Panel from '../Panel'
import { Container, Col, Row } from 'react-bootstrap'
import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
} from 'mdb-react-ui-kit';
import axios from 'axios';
import { BASE_URL } from '../../App';
const AdminDashboard = () => {
  const [AdminDetails, setAdminDetails] = useState([])
  const [VendorDetails, setVendorDetails] = useState([])
  const [UserDetails, setUserDetails] = useState([])

  const [NoOfAdmin, setNoOfAdmin] = useState(0)
  const [NoOfVendor, setNoOfVendor] = useState(0)
  const [NoOfUser, setNoOfUser] = useState(0)


  const adminEmail = localStorage.getItem('adminEmail');

  useEffect(() => {
    // console.log(adminEmail)
    axios.get(`${BASE_URL}/Admin-Details/Display`)
      .then((res) => {
        // console.log(res.data.length)
        setNoOfAdmin(res.data.length);
        setAdminDetails(res.data)
        // console.log('state',[AdminDetails])
        // console.log('passed',[res.data])
      })

    axios.get(`${BASE_URL}/Vendor-Details/Display`)
      .then((res) => {
        // console.log(res.data.length)
        setNoOfVendor(res.data.length);
        setVendorDetails(res.data)
      })

    axios.get(`${BASE_URL}/User-Details/Display`)
      .then((res) => {
        // console.log(res.data.length)
        setNoOfUser(res.data.length);
        setUserDetails(res.data)
      })

  }, [])

  const topBar = <h3>Welcome To the Administrator Dashboard </h3>
  const Prop =
    <section style={{ backgroundColor: '#F9FAFD' }} className='mt-3 rounded-3 pb-3'>
      <Container fluid className='w-100'>
        <Row>
          <Col md={3}>
            <div className="pt-5 pb-5 mt-5 mb-3 d-flex justify-content-center text-bold" style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <h3 style={{ fontWeight: '700' }}>Total Vendors:{NoOfVendor}

              </h3>
            </div>
          </Col>
          <Col md={3}>
            <div className="pt-5 pb-5 mt-5 mb-3 d-flex justify-content-center text-bold" style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <h3 style={{ fontWeight: '700' }}>Total Clients: {NoOfUser}

              </h3>
            </div>
          </Col>
          <Col md={6}>
            <MDBCard style={{ border: '0', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', marginTop: '20px' }}>
              <MDBCardBody style={{ maxHeight: '200px', overflowY: 'scroll' }}>
                <MDBRow>
                  <MDBCol sm="12">
                    <MDBCardText style={{ fontWeight: '600', fontSize: '20px' }} className="d-flex justify-content-center">Administrator Details - {NoOfAdmin}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                {
                  AdminDetails.length === 0 ? (
                    <tr>
                      <td className='px-auto' colSpan={4}><center>No Record Found</center></td>
                    </tr>) : (
                    AdminDetails.map(obj => (
                      <MDBRow>
                        <MDBCol sm="4">
                          <MDBCardText>{obj.adminName}</MDBCardText>
                        </MDBCol>
                        <MDBCol sm="8">
                          <MDBCardText className="text-muted">{obj.adminEmail}</MDBCardText>
                        </MDBCol>
                      </MDBRow>
                    )
                    ))}
                <hr />
              </MDBCardBody>
            </MDBCard>

          </Col>
          <Col md={12}>
            <h4 className='d-flex justify-content-center mt-5'> Vendor & User Details</h4>
          </Col>
          <Row className='d-flex justify-content-between'>
            <Col md={6}>
              <div style={{ maxHeight: '240px', overflowY: 'scroll', borderRadius: '12px', border: '0', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                <table className="table bg-light">
                  <thead className="thead-dark text-white" style={{ backgroundColor: '#111827', }}>
                    <tr>
                      <th style={{ textAlign: 'center' }} scope="col" colspan="4">Vendor Details</th>
                    </tr>
                    <tr>
                      {/* <th scope="col">Tour#</th> */}
                      <th scope="col">Vendor Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Total Tours</th>
                      <th scope="col">Total Trips</th>
                    </tr>
                  </thead>
                  <tbody>

                    {
                      VendorDetails.length === 0 ? (
                        <td className='px-auto' colSpan={4}><center>No Record Found</center></td>
                      ) : (
                        VendorDetails.reverse().map(obj => (
                          <tr className='text-muted' style={{ fontWeight: '300' }}>
                            <th scope="col">{obj.vendorName}</th>
                            <th scope="col">{obj.vendorEmail}</th>
                            <th scope="col">{obj.totalTours}</th>
                            <th scope="col">{obj.totalFlights}</th>
                          </tr>
                        ))
                      )
                    }
                  </tbody>
                </table>
              </div>
            </Col>
            <Col md={6}>
              <div style={{ paddingRight: "0", maxHeight: '240px', overflowY: 'scroll', borderRadius: '12px', border: '0', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                <table className="table bg-light">
                  <thead className="thead-dark text-white" style={{ backgroundColor: '#111827', }}>
                    <tr>
                      <th style={{ textAlign: 'center' }} scope="col" colspan="4">Client Details</th>
                    </tr>
                    <tr>
                      {/* <th scope="col">Trip#</th> */}
                      <th scope="col">Name</th>
                      <th scope="col">Contact</th>
                      <th scope="col">Trips</th>
                      <th scope="col">Tours</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      UserDetails.length === 0 ? (
                        <td className='px-auto' colSpan={4}><center>No Record Found</center></td>
                      ) : (
                        UserDetails.reverse().map(obj => (
                          <tr className='text-muted' style={{ fontWeight: '300' }}>
                            <th scope="col">{obj.ClientName}</th>
                            <th scope="col">{obj.userEmail}</th>
                            <th scope="col">{obj.totalTours}</th>
                            <th scope="col">{obj.totalFlights}</th>
                          </tr>
                        ))
                      )
                    }
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
    </>
  )
}

export default AdminDashboard
