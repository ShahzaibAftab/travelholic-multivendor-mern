import React from 'react';

const VendorAccount = () => {
    return (
        <section className="py-lg-5 py-3">
            <div className="container">
                <div className="row align-items-center">

                    <div className="col-lg-6 col-md-12 d-flex justify-content-center">
                        <div className="mt-5 mt-lg-0 position-relative">
                            <div className="position-absolute top-0 start-0 translate-middle d-none d-md-block">
                                <img src="https://codescandy.com/geeks-bootstrap-5/assets/images/svg/graphics-2.svg" alt="graphics-2" />
                            </div>
                            <img src="https://thrivemyway.com/wp-content/uploads/2022/10/cool-travel-agency-names-768x433.png" alt="online course" className="img-fluid rounded-4 w-100 z-1 position-relative" />
                            <div className="position-absolute top-100 start-100 translate-middle d-none d-md-block">
                                <img src="https://codescandy.com/geeks-bootstrap-5/assets/images/svg/graphics-1.svg" alt="graphics-1" />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 mb-4">
                        <div>
                            <h6 className="display-4 fw-bold mb-3">Become a - <u className="text-warning"><span className="text-primary" style={{ color: '#7564e5' }}>Travel Vendor</span></u></h6>
                            <p style={{ fontSize: '20px' }} className="mb-4">Becoming a travel vendor for a multivendor marketplace offers a unique opportunity to expand your reach and tap into a wider customer base. By joining the marketplace, you can showcase your travel services and experiences to a diverse audience, leveraging the platform's marketing capabilities.</p>
                            <ul className="list-unstyled mb-5">
                                <li className="mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#00FF00" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                    </svg>
                                    <span className="ms-2 text-muted">No Extra Documentation</span>
                                </li>
                                <li className="mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#00FF00" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                    </svg>
                                    <span className="ms-2 text-muted">No FBR Registration Required</span>
                                </li>
                                <li className="mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="#00FF00" className="bi bi-check-circle-fill" viewBox="0 0 16 16">
                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                    </svg>
                                    <span className="ms-2 text-muted">Manage Hassle-free Tourism</span>
                                </li>
                                {/* Add other list items here */}
                            </ul>
                            <div className='d-flex justify-content-center'>
                                <a href="/vendor-SignUp" className=" btn btn-primary btn-lg shadow">Register Now</a>
                            </div>
                            <div className="d-flex flex-row align-items-center mb-4 mt-3">
                                <p className='text-muted mx-auto'>already have account? <i> <a className=' text-success' style={{ textDecoration: 'underline' }} href='/vendor-Signin'>Sign In</a></i></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VendorAccount;
