import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import logo from './Images/logo.png'

const Header = () => {
  const navigate = useNavigate();
  const navBar = {
    backgroundColor: "#4F8CD6",
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'

  }
  const Seller = {
    backgroundColor: "#4F8CD6",
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    border: '2px solid white',
    color: 'white',
  };
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const navStyle = { marginRight: '20px', color: 'white', fontWeight: '600' }
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className='py-3 ' style={navBar}>
        <Container>
          <Navbar.Brand href="#" className='text-white m-0 p-0' style={{ height: '50px', width: '100px' }}>
          <img src={logo} alt='travelholic' style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
            {/* Travelholic.pk */}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className='justify-content-end'>
            <Nav>
              <Nav.Link href="/Tours"onClick={() => navigate('/Tours')} style={navStyle}>Tours</Nav.Link>
              <Nav.Link href="/Trips" onClick={() => navigate('/Trips')} style={navStyle}>Trips</Nav.Link>
              <Nav.Link href="/Contact-Us" onClick={() => navigate('/Contact-Us')} style={navStyle}>Contact Us</Nav.Link>
              <Nav.Link href="/Contact-Us" onClick={() => navigate('/Contact-Us')} style={navStyle}>About Us</Nav.Link>
              <Nav.Link style={{
                ...Seller,
                backgroundColor: isHovered ? 'white' : Seller.backgroundColor,
                color: isHovered ? '#4F8CD6' : Seller.color,
              }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave} onClick={() => navigate('/vendor-SignUp')}>Become a Seller</Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header