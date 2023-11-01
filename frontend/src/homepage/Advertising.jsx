import React, { useState } from 'react';
import icon from './Images/suit.png';
import { useNavigate } from 'react-router-dom';

const Advertising = () => {
    const navigate = useNavigate();

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const buttonStyle = {
        color: 'white',
        backgroundColor: isHovered ? '#ffffff' : '#4F8CD6',
        padding: '1em 2em',
        borderRadius: '2em',
        boxShadow: '5px 5px 5px rgba(105, 73, 73, 0.15)',
        width: '200px',
        border: `2px solid ${isHovered ? '#4F8CD6' : 'transparent'}`,
    };

    return (
        <>
            <div className="banner" style={{ backgroundColor: '#F1EFEF', padding: '2em 0', marginTop: '1rem', marginBottom: '2rem' }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-12">
                            <h1 className="display-4 fw-bold my-5" style={{ textShadow: '1px 1px 2px #7c7c7c' }}>
                                Need a Customized Trip?
                            </h1>
                            <p>
                                Get ready to satisfy your wanderlust and set off on an amazing journey designed just for you. From handpicked destinations to curated activities, our Customized Trips allow you to discover the world on your terms. Our special approach puts you in control, allowing you to create the adventure of a lifetime.
                            </p>
                            <button
                                className="btn my-5"
                                style={buttonStyle}
                                onClick={() => navigate('/user-signup')}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                Apply Now
                            </button>
                        </div>
                        <div className="col-lg-6 col-md-12 text-center mt-4 mt-lg-0">
                            <img className="img-fluid" src={icon} alt="" style={{ maxWidth: '100%', marginLeft: 'auto', marginRight: 'auto' }} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Advertising;
