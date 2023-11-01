import React, { useEffect, useState } from 'react'
import { Container, Col, Row } from 'react-bootstrap'
import {
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
} from 'mdb-react-ui-kit';
import Panel from '../Panel';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { BASE_URL } from '../../App';
const Adminvendorcomplain = () => {

  const adminEmail = localStorage.getItem('adminEmail');

  const [vendorComplain, setvendorComplain] = useState([])
  const [solved, setsolved] = useState(0)
  const [active, setactive] = useState(0);

  function countBooleanValues(activeState, solvedState, vendorComplain) {
    let activeCount = activeState;
    let solvedCount = solvedState;

    vendorComplain.forEach(obj => {
      if (obj.solved === true) {
        solvedCount++;
      }
      else {
        activeCount++
      }
    });

    setactive(activeCount);
    setsolved(solvedCount);

    // console.log("Active:", activeCount);
    // console.log("Solved:", solvedCount);
  }
  useEffect(() => {
    axios.get(`${BASE_URL}/Vendor-Complains/Display`)
      .then((res) => {
        setvendorComplain(res.data)
        // console.log(res.data)
      })
    countBooleanValues(active, solved, vendorComplain)

  }, [])
  const UpdateComplain = (_id) => { 

    axios.put(`${BASE_URL}/Vendor-Complains/Update-Complain/${_id}`)
      .then(res => {
        if (res.status === 200) {
          toast.success("Status Updated", { autoClose: 3000 });
          setTimeout(() => {
            window.location.reload()
          }, 3000);
        }
        else {
          toast.error("Error! try again Later", { autoClose: 3000 });
          setTimeout(() => {
            window.location.reload()
          }, 3000);
        }
      })
  }
  useEffect(() => {
    countBooleanValues(active, solved, vendorComplain);
  }, [vendorComplain]);
  const topBar = <h4>Vendor Complains</h4>
  const Prop =
    <section style={{ backgroundColor: '#F9FAFD' }} className='mt-3 rounded-3 pb-3'>
      <Container fluid className='w-100'>
        <Row>
          <Col md={3}>
            <div className="pt-5 pb-5 mt-5 mb-3 d-flex justify-content-center text-bold" style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <h3 style={{ fontWeight: '700' }}>Active:
                {active / 2}
              </h3>
            </div>
          </Col>
          <Col md={3}>
            <div className="pt-5 pb-5 mt-5 mb-3 d-flex justify-content-center text-bold" style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <h3 style={{ fontWeight: '700' }}>Resolved:
                {solved / 2}
              </h3>
            </div>
          </Col>
          <Col md={6}>
            <MDBCard style={{ border: '0', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', marginTop: '20px' }}>
              <MDBCardBody style={{ maxHeight: '200px', overflowY: 'scroll' }}>
                <MDBRow>
                  <MDBCol sm="12">
                    <MDBCardText style={{ fontWeight: '600', fontSize: '20px' }} className="d-flex justify-content-center">Complains Sorted</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                {vendorComplain.reverse().map((obj =>
                (
                  (obj.solved) &&
                  <>
                  <MDBRow>
                 
                    <MDBCol sm="4">
                      <MDBCardText>{obj.vendorName}</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="4">
                      <MDBCardText className="text-muted">{obj.vendorEmail}</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="4">
                      <MDBCardText className="text-muted">{obj.complainType}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr/>
                  </>
                )))}
              </MDBCardBody>
            </MDBCard>

          </Col>
          <Col md={12}>
            <h4 className='d-flex justify-content-center mt-5'></h4>
          </Col>
          <Row className='d-flex justify-content-center'>
            <Col md={8}>
              <div style={{ maxHeight: '240px', overflowY: 'scroll', borderRadius: '12px', border: '0', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
                <table className="table bg-light">
                  <thead className=" text-white" style={{ backgroundColor: '#111827', }}>
                    <tr>
                      <th style={{ textAlign: 'center' }} scope="col" colspan="8">Vendor Complains</th>
                    </tr>
                    <tr>
                      {/* <th scope="col">Tour#</th> */}
                      <th scope="col">Username</th>
                      <th scope="col">Email</th>
                      <th scope="col">Complain Type</th>
                      <th scope="col" colSpan="2">Complain Details</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vendorComplain.length === 0 ? (
                      <tr>
                        <td className='px-auto' colSpan={4}><center>No Record Found</center></td>
                      </tr>
                    ) : (
                      vendorComplain.reverse().map(obj => {
                        return ((!obj.solved) && <tr>
                          <td >{obj.vendorName}</td>
                          <td>{obj.vendorEmail}</td>
                          <td>{obj.complainType}</td>
                          <td colspan="2">{obj.complainDetails}</td>
                          <td><button type='button' onClick={() => UpdateComplain(obj._id)} className='btn btn-success'>Solve</button></td>
                        </tr>)
                      })
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
    </>
  )
}

export default Adminvendorcomplain
