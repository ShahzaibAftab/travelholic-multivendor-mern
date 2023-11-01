import React from 'react';
import { FaCircle, FaGlobe, FaPlane, FaDollarSign, FaMapMarkerAlt } from 'react-icons/fa';

const About = () => {
  return (
    <>
      <section id="services" className="pt-1 pb-2" style={{ backgroundColor: '#eee' }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 style={{fontWeight:'600'}} className="text-muted section-heading my-5 mb-5">Why Travelholic?</h2>
            </div>
          </div>
          <div className="row text-center d-flex justify-content-around">
            <div className="col-md-2 mb-5">
              <span className="fa-stack fa-4x">
                <FaCircle className="fa-stack-2x" style={{ color: '#4F8CD6' }} />
                <FaMapMarkerAlt className="fa-stack-1x fa-inverse my-4" />
              </span>
              <h5 className="service-heading my-1" >Tourism Platform</h5>
              <p className="text-muted my-3" style={{textAlign: "justify"}}>All in One Travel & Tourism Platform</p>
            </div>
            <div className="col-md-2">
              <span className="fa-stack fa-4x">
                <FaCircle className="fa-stack-2x" style={{ color: '#4F8CD6' }} />
                <FaGlobe className="fa-stack-1x fa-inverse  my-4" />
              </span>
              <h5 className="service-heading my-1" >Multi-Vendor Square</h5>
              <p className="text-muted my-3" style={{textAlign: "justify"}}>Sell your services, Manage your Tourism with us</p>
            </div>
            <div className="col-md-2">
              <span className="fa-stack fa-4x">
                <FaCircle className="fa-stack-2x" style={{ color: '#4F8CD6' }} />
                <FaPlane className="fa-stack-1x fa-inverse my-4" />
              </span>
              <h5 className="service-heading my-1" >Book your Flight</h5>
              <p className="text-muted my-3" style={{textAlign: "justify"}}>You can Book your Tours as well as Flights with us</p>
            </div>
            <div className="col-md-2">
              <span className="fa-stack fa-4x">
                <FaCircle className="fa-stack-2x" style={{ color: '#4F8CD6' }} />
                <FaDollarSign className="fa-stack-1x fa-inverse my-4" />
              </span>
              <h5 className="service-heading my-1" >Offordable</h5>
              <p className="text-muted my-3" style={{textAlign: "justify"}}>We Offer affordable & Budget Friendly deals</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
