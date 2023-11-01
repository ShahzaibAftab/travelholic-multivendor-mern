import React, { useEffect, useState } from 'react'
import Panel from '../Panel'
import { toast, ToastContainer } from 'react-toastify';
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

const Adminclientcomplain = () => {
  const adminEmail = localStorage.getItem('adminEmail');

  const [userComplain, setuserComplain] = useState([])
  const [solved, setsolved] = useState(0)
  const [active, setactive] = useState(0);

  function countBooleanValues(activeState, solvedState, userComplain) {
    let activeCount = activeState;
    let solvedCount = solvedState;

    userComplain.forEach(obj => {
      if (obj.solved === true) {
        solvedCount++;
      } else {
        activeCount++;
      }
    });

    setactive(activeCount);
    setsolved(solvedCount);

    // console.log("Active:", activeCount);
    // console.log("Solved:", solvedCount);
  }

  useEffect(() => {
    axios.get(`${BASE_URL}/User-Complains/Display`) 
      .then((res) => {
        setuserComplain(res.data)
        // console.log(res.data)
      })
    countBooleanValues(active, solved, userComplain)

  }, [])

  useEffect(() => {
    countBooleanValues(active, solved, userComplain);
  }, [userComplain]);

  const UpdateComplain = (_id) => {

    axios.put(`${BASE_URL}/User-Complains/Update-Complain/${_id}`)
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

  const topBar = <h4>Customer Complains</h4>
  const Prop =
    <section style={{ backgroundColor: '#F9FAFD' }} className='mt-3 rounded-3 pb-3'>
      <Container fluid className='w-100'>
        <Row>
          <Col md={3}>
            <div className="pt-5 pb-5 mt-5 mb-3 d-flex justify-content-center text-bold" style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <h3 style={{ fontWeight: '700' }}>Active:{active / 2}

              </h3>
            </div>
          </Col>
          <Col md={3}>
            <div className="pt-5 pb-5 mt-5 mb-3 d-flex justify-content-center text-bold" style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
              <h3 style={{ fontWeight: '700' }}>Resolved:{solved / 2}
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
                {userComplain.reverse().map((obj =>
                (
                  (obj.solved) &&
                  <>
                    <MDBRow>
                      <MDBCol sm="4">
                        <MDBCardText>{obj.userName}</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="4">
                        <MDBCardText className="text-muted">{obj.userEmail}</MDBCardText>
                      </MDBCol>
                      <MDBCol sm="4">
                        <MDBCardText className="text-muted">{obj.complainType}</MDBCardText>
                      </MDBCol>
                    </MDBRow>
                    <hr />
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
                      <th style={{ textAlign: 'center' }} scope="col" colspan="8">Client Feedback/Complains</th>
                    </tr>
                    <tr>
                      {/* <th scope="col">Tour#</th> */}
                      <th scope="col">Username</th>
                      <th scope="col">Email</th>
                      <th scope="col">Complain Type</th>
                      <th scope="col" colSpan="2">Complain Details</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userComplain.length === 0 ? (
                      <tr>
                        <td className='px-auto' colSpan={4}><center>No Record Found</center></td>
                      </tr>
                    ) : (
                      userComplain.reverse().map(obj => {
                        return ((!obj.solved) && <tr>
                          <td >{obj.userName}</td>
                          <td>{obj.userEmail}</td>
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

export default Adminclientcomplain
