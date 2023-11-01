import React from 'react';
import gif from './Videos/tour.mp4';

const Containergif = () => {
  return (
    <>
      <section className='pb-5' style={{ backgroundColor: '#eee' }}>
      <h4 className="d-flex justify-content-center"><strong>Travel beautiful Valleys</strong></h4>
        <video className="rounded-5" style={{ height: '250px', width: '100%', objectFit: 'cover' }} autoPlay loop muted>
          <source src={gif} type="video/mp4" />
        </video>
      </section>
    </>
  );
};

export default Containergif;
