import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import carouselSlide1 from './Images/carouselSlide1.png';
import carouselSlide2 from './Images/carouselSlide2.png';
import carouselSlide3 from './Images/carouselSlide3.png';

const Carouselcrossfade = () => {
  return (
    <>
<Carousel fade controls={false} indicators={false}>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={carouselSlide1}
      alt="First slide"
      style={{ height: '450px' }}
    />
    <Carousel.Caption>
      <h3>Live your life as there's no tomorrow</h3>
      <p>Enjoy your life and collect memories with your beloved once</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={carouselSlide2}
      alt="Second slide"
      style={{ height: '450px' }}
    />
    <Carousel.Caption>
      <h3>Experience the beauty of Mother Nature</h3>
      <p>Blossom flowers cover the entire sky, creating an awe-inspiring sight as they twinkle like stars</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={carouselSlide3}
      alt="Second slide"
      style={{ height: '450px' }}
    />
    <Carousel.Caption>
      <h3>Book your trip with us</h3>
      <p>We offer amazing deals at economical price</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
    </>
  )
}

export default Carouselcrossfade