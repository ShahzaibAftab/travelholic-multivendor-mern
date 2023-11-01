import React from 'react'
import Header from './Header'
import Carouselcrossfade from './Carouselcrossfade'
import Tripsearch from './Tripsearch'
import TourCards from './TourCards'
import { Footer } from './Footer'
import Containergif from './Containergif'
import Slidercard from './Slidercard'
import About from './About'
import Advertising from './Advertising'
import VendorAccount from './VendorAccount'
const Homepage = () => {
  return (
    <>
      <Header />
      <Carouselcrossfade />
      <Tripsearch />
      <TourCards />
      <Containergif />
      <Slidercard />
      <Advertising />
      <VendorAccount/>
      <About />
      <Footer />
    </>
  )
}

export default Homepage