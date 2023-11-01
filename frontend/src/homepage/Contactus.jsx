import React from 'react'
import Header from './Header'
import { useRef } from 'react';
import emailjs from 'emailjs-com';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { BsPhone } from 'react-icons/bs'
import { HiLocationMarker } from 'react-icons/hi'
import { BiMessageSquareDetail } from 'react-icons/bi'

function Contactus() {
    const form = useRef();
    const navigate = useNavigate();
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_ig3i8wf', 'template_svvcmzw', form.current, 'Bs28WcN_Kigd9r5cQ')

        e.target.reset();

        if (e) {
            toast.success("You Email has been Sent Successfully", { autoClose: 3000 });
            setTimeout(() => {
                navigate('/')
            }, 3000);
        }
    };
    return (
        <>
            <ToastContainer />
            <Header />
            <div className="contact3 py-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="card-shadow">
                                <img src="https://img.freepik.com/free-vector/organic-flat-man-customer-support_23-2148893295.jpg?w=740&t=st=1686163739~exp=1686164339~hmac=8c9fa6244ff35f31a15e34974aabe886774756a29b215dcf7dc8da12176f096a" style={{ width: 450 }} className="img-fluid" alt="Contact" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="contact-box ml-3">
                                <center><h1 className=" font-weight-light mt-2">Contact Us</h1></center>
                                <p className='justify-content-between text-muted'>
                                    We'd love to hear from you! At Travelholic.pk, we are committed to providing you with exceptional travel experiences. Whether you have a question, need assistance with your booking, or simply want to share your feedback, our dedicated team is here to help. Contact us through the provided form, and we'll get back to you promptly. Our knowlend we're excited to be part of your journey!
                                </p>
                                <form className="mt-4" ref={form} onSubmit={sendEmail}>
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="form-group mt-2">
                                                <input type='text' className='form-control' name='name' placeholder='Enter your name' />
                                            </div>
                                        </div>
                                        <div className="col-lg-12 mt-2">
                                            <div className="form-group mt-2">
                                                <input type='text' className='form-control' name='email' placeholder='Enter your email' />
                                            </div>
                                        </div>
                                        <div className="col-lg-12 mt-2">
                                            <div className="form-group mt-2">
                                                <textarea name='message' className='form-control' rows={4} placeholder='Enter your messege' />
                                            </div>
                                        </div>
                                        <div className="col-lg-12 mt-2">
                                            <div className="form-group mt-3 text-center">
                                                <button type="submit" className="btn btn-primary text-center px-5">Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="card mt-4 border-0 mb-4">
                                <div className="row">
                                    <div className="col-lg-4 col-md-4">
                                        <div className="card-body d-flex align-items-center c-detail pl-0">
                                            <div className="mx-4  align-self-center">
                                                <HiLocationMarker style={{ color: '#8F68FF', fontSize: '50px' }} />
                                            </div>
                                            <div className>
                                                <h6 className="font-weight-medium">Address</h6>
                                                <p className>601 Sherwood Ave.
                                                    <br /> San Bernandino</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4">
                                        <div className="card-body d-flex align-items-center c-detail">
                                            <div className="mx-4 align-self-center">
                                                <BsPhone style={{ color: '#8F68FF', fontSize: '50px' }} />
                                            </div>
                                            <div className>
                                                <h6 className="font-weight-medium">Phone</h6>
                                                <p className>251 546 9442
                                                    <br /> 630 446 8851</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4">
                                        <div className="card-body d-flex align-items-center c-detail">
                                            <div className="mx-4 align-self-center">
                                                <BiMessageSquareDetail style={{ color: '#8F68FF', fontSize: '50px' }} />

                                            </div>
                                            <div className>
                                                <h6 className="font-weight-medium">Email</h6>
                                                <p className>
                                                    info@travelholic.pk
                                                    <br /> 123@travelholic.pk
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Contactus
