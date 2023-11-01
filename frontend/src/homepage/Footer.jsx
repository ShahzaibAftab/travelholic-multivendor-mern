import React from 'react';
import { FaFacebookSquare } from 'react-icons/fa'
import { FaTwitterSquare } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'

export const Footer = () => {
    return (


        <footer
            className="text-center text-lg-start text-white"
            style={{ backgroundColor: '#1c2331' }}
        >
            <section
                className="d-flex justify-content-between p-4"
                style={{ backgroundColor: '#4F8CD6' }}
            >
                <div className="me-5">
                    <span>Get connected with us on social networks:</span>
                </div>
                <div>
                    <a href="#" className="text-white me-4">
                        <FaFacebookSquare className='icon' />
                    </a>
                    <a href="#" className="text-white me-4">
                        <FaTwitterSquare />
                    </a>
                    <a href="#" className="text-white me-4">
                        <FaInstagram />
                    </a>
                </div>
            </section>
            <section className="">
                <div className="container text-center text-md-start mt-5">
                    <div className="row mt-3">
                        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold">Travelholic.pk</h6>
                            <hr
                                className="mb-4 mt-0 d-inline-block mx-auto"
                                style={{ width: '60px', backgroundColor: '#4F8CD6', height: '2px' }}
                            />
                            <p>
                                Pakistan's first Multi-vendor square. Register today and enhance your business value with our streamless ervices
                            </p>
                        </div>
                        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold">Tours</h6>
                            <hr
                                className="mb-4 mt-0 d-inline-block mx-auto"
                                style={{ width: '60px', backgroundColor: '#4F8CD6', height: '2px' }}
                            />
                            <p>
                                <a href="/Tours" className="text-white">Book a Tour</a>
                            </p>
                            <p>
                                <a href="/contact-Us" className="text-white">Customer feedback</a>
                            </p>
                            <p>
                                <a href="/contact-Us" className="text-white">Report a Problem</a>
                            </p>
                            <p>
                                <a href="#!" className="text-white">Terms & condition</a>
                            </p>

                        </div>
                        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold">Enhance your business</h6>
                            <hr
                                className="mb-4 mt-0 d-inline-block mx-auto"
                                style={{ width: '60px', backgroundColor: '#4F8CD6', height: '2px' }}
                            />
                            <p>
                                <a href="/vendor-SignUp" className="text-white">Join us</a>
                            </p>
                            <p>
                                <a href="/vendor-Signin" className="text-white">Sign In</a>
                            </p>
                            <p>
                                <a href="/contact-Us" className="text-white">Complain</a>
                            </p>
                            <p>
                                <a href="/contact-Us" className="text-white">Contract</a>
                            </p>
                        </div>
                        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                            <h6 className="text-uppercase fw-bold">Contact Us</h6>
                            <hr
                                className="mb-4 mt-0 d-inline-block mx-auto"
                                style={{ width: '60px', backgroundColor: '#4F8CD6', height: '2px' }}
                            />
                            <p><i className="fas fa-home mr-3"></i> New Lahore, Punjab, PK</p>
                            <p><i className="fas fa-envelope mr-3"></i> info@travelholic.com</p>
                            <p><i className="fas fa-phone mr-3"></i> +92 234 567 88</p>
                            <p><i className="fas fa-print mr-3"></i> +92 234 567 89</p>
                        </div>
                    </div>
                </div>
            </section>
            <div
                className="text-center p-3"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
            >
                © 2023 Copyright:
                <a className="text-white" href="#!"
                >Travelholic.pk</a>
            </div>
        </footer>

    );
};