// user SIDEBAR + TOPBAR 
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
const Portal = ({ Prop, topBar }) => {

  let navigate = useNavigate();
  const logoutuser = () => {
    localStorage.removeItem('userEmail')

    toast.success("Logged Out", { autoClose: 3000 });
    setTimeout(() => {
      navigate('/user-Signin');
    }, 3000);
  }

  return (

    <div>
      <ToastContainer />
      <div style={{ display: 'flex', minHeight: '750px', overflow: 'scroll initial' }}>
        <CDBSidebar className='shadow h-auto' textColor="#fff" backgroundColor="#1d4e89">
          <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>} >
           User Dashboard
          </CDBSidebarHeader>
          <CDBSidebarContent className="sidebar-content shadow">
            <CDBSidebarMenu>
              <CDBSidebarMenuItem className='mt-3 mb-3' onClick={() => navigate('/user-Tour')} icon="book">
                Tours
              </CDBSidebarMenuItem>
              <CDBSidebarMenuItem className='mt-3 mb-3' onClick={() => navigate('/user-Trip')} icon="suitcase">
                Trips
              </CDBSidebarMenuItem>
              <CDBSidebarMenuItem className='mt-3 mb-3' onClick={() => navigate('/user-Profile')} icon="id-card">
                Profile Page
              </CDBSidebarMenuItem>
              <CDBSidebarMenuItem className='mt-3 mb-3' onClick={() => navigate('/user-Custom-Tour')} icon="user">
                Bid Management
              </CDBSidebarMenuItem>
              <CDBSidebarMenuItem className='mt-3 mb-3' onClick={() => navigate('/user-Recent-Tours')} icon="train">
                Recent Tours
              </CDBSidebarMenuItem>
              <CDBSidebarMenuItem className='mt-3 mb-3' onClick={() => navigate('/user-Recent-Trips')} icon="map">
                Recent Trips
              </CDBSidebarMenuItem>
              <CDBSidebarMenuItem className='mt-3 mb-3' onClick={() => navigate('/user-bid-history')} icon="map">
                Bid Bookings
              </CDBSidebarMenuItem>
              <CDBSidebarMenuItem className='mt-3 mb-3' onClick={() => navigate('/user-Complain-form')} icon="exclamation-circle">
                Complain
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
              backgroundColor: "#1d4e89",
            }}
          >
            <span
              style={{
                color: '#fff',
                fontSize: '25px',
                fontWeight: '600',
                textAlign: 'center',
                width: '90%', // Adjusted to cover 90% of the width
                backgroundColor: "#1d4e89",
              }}
            >
              {topBar}
            </span>
            <Dropdown className='bg-dark' style={{ marginLeft: 'auto', marginRight: '15px' }}>
              <Dropdown.Toggle style={{
                backgroundColor: '#1d4e89',
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

export default Portal;
