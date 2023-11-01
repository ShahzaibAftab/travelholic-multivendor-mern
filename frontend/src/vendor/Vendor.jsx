// VENDOR SIDEBAR + TOPBAR 
import React from 'react';
import { BrowserRouter as Link, useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg'
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { toast, ToastContainer } from 'react-toastify';
import { Dropdown } from 'react-bootstrap';
const Vendor = ({ Prop, topBar }) => {

  let navigate = useNavigate();
  const logoutuser = () => {
    localStorage.removeItem('vendorEmail')

    toast.success("Logged Out", { autoClose: 3000 });
    setTimeout(() => {
      navigate('/vendor-Signin');
    }, 3000);

  }
  return (

    <div>
      <ToastContainer />
      <div style={{ display: 'flex', minHeight: '730px', overflow: 'scroll initial' }}>

        <CDBSidebar className='shadow h-auto' textColor="#fff" backgroundColor="#52B586">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
            Vendor Dashboard
          </CDBSidebarHeader>

          <CDBSidebarContent className="sidebar-content">
            <CDBSidebarMenu>
              <CDBSidebarMenuItem className='mt-3 mb-3' onClick={() => navigate('/vendor-Dashboard')} icon="columns">
                Dashboard
              </CDBSidebarMenuItem>
              <CDBSidebarMenuItem className='mt-3 mb-3' onClick={() => navigate('/vendor-Profile')} icon="user">
                Profile Page
              </CDBSidebarMenuItem>
              <CDBSidebarMenuItem className='mt-3 mb-3' onClick={() => navigate('/vendor-Issue-Tour')} icon="table">
                Add a Tour
              </CDBSidebarMenuItem>
              <CDBSidebarMenuItem className='mt-3 mb-3' onClick={() => navigate('/vendor-Issue-Flight-Ticket')} icon="suitcase">
                Add a Flight
              </CDBSidebarMenuItem>
              <CDBSidebarMenuItem className='mt-3 mb-3' onClick={() => navigate('/vendor-bid-on-trips')} icon="chart-line">
                Bid on Trips
              </CDBSidebarMenuItem>
              <CDBSidebarMenuItem className='mt-3 mb-3' onClick={() => navigate('/vendor-Tour-Bookings')} icon="book">
                Tour Bookings
              </CDBSidebarMenuItem>
              <CDBSidebarMenuItem className='mt-3 mb-3' onClick={() => navigate('/vendor-Trip-Bookings')} icon="suitcase">
                Trip Bookings
              </CDBSidebarMenuItem>
              <CDBSidebarMenuItem className='mt-3 mb-3' onClick={() => navigate('/vendor-Complain')} icon="exclamation-circle">
                Report a Problem
              </CDBSidebarMenuItem>
            </CDBSidebarMenu>
          </CDBSidebarContent>
        </CDBSidebar>




        <div style={{ marginRight: '100px', marginLeft: '100px', width: '100%', margin: '10px' }}>
          <span
            className='shadow'
            style={{
              height: '100px',
              color: '#fff',
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: "#52B586",
            }}
          >
            <span
              style={{
                color: '#fff',
                fontSize: '25px',
                fontWeight: '600',
                textAlign: 'center',
                width: '90%', // Adjusted to cover 90% of the width
                backgroundColor: "#52B586",
              }}
            >
              {topBar}
            </span>
            <Dropdown className='bg-dark' style={{ marginLeft: 'auto', marginRight: '15px' }}>
              <Dropdown.Toggle style={{
                backgroundColor: '#52B586',
                border: 'none',
                borderRadius: "0px"

              }}>
                <CgProfile style={{ fontSize: '30px' }} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={logoutuser}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </span>
          {Prop}
        </div>
      </div>
    </div>

  );
};

export default Vendor;
