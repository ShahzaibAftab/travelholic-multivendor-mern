import React from 'react';
import { BrowserRouter as Link, useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg'
import { toast, ToastContainer } from 'react-toastify';
import {
    CDBSidebar,
    CDBSidebarContent,
    CDBSidebarHeader,
    CDBSidebarMenu,
    CDBSidebarMenuItem,
} from 'cdbreact';

import { Dropdown } from 'react-bootstrap';
const Panel = ({ Prop, topBar }) => {
    let navigate = useNavigate();
    const logoutuser = () => {
        localStorage.removeItem('adminEmail')

        toast.success("logged out", { autoClose: 3000 });
        setTimeout(() => {
            navigate('/admin-Signin');
        }, 3000);
    }
    return (
        <div>
            <ToastContainer />
            <div style={{ display: 'flex',minHeight:'700px', overflow: 'scroll initial' }}>

                <CDBSidebar textColor="#fff" style={{height:'auto'}} className='bg-muted shadow h-auto'>
                    <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                        Admin Panel
                    </CDBSidebarHeader>

                    <CDBSidebarContent className="sidebar-content shadow">
                        <CDBSidebarMenu>
                            <CDBSidebarMenuItem className='mt-3 mb-3' onClick={() => navigate('/admin-Dashboard')} icon="columns">Dashboard</CDBSidebarMenuItem>
                            <CDBSidebarMenuItem className='mt-3 mb-3' onClick={() => navigate('/admin-Flight-Record')} icon="chart-line">Vendor Flights</CDBSidebarMenuItem>
                            <CDBSidebarMenuItem className='mt-3 mb-3' onClick={() => navigate('/admin-Tour-Record')} icon="table">Vendor Tours</CDBSidebarMenuItem>
                            <CDBSidebarMenuItem className='mt-3 mb-3' onClick={() => navigate('/admin-customized-Trip-Record')} icon="table">Customized Trip Records</CDBSidebarMenuItem>
                            <CDBSidebarMenuItem className='mt-3 mb-3' onClick={() => navigate('/client-Feedbacks')} icon="exclamation-circle">Client Feedback</CDBSidebarMenuItem>
                            <CDBSidebarMenuItem className='mt-3 mb-3' onClick={() => navigate('/admin-Personal-Profile')} icon="user">Personal Profile</CDBSidebarMenuItem>
                            <CDBSidebarMenuItem className='mt-3 mb-3' onClick={() => navigate('/vendor-Feedback')} icon="exclamation-circle">Vendor Feedback</CDBSidebarMenuItem>
                            <CDBSidebarMenuItem className='mt-3 mb-3' onClick={() => navigate('/Tour-Booking-Record')} icon="book">
                                Tour Bookings
                            </CDBSidebarMenuItem>
                            <CDBSidebarMenuItem className='mt-3 mb-3' onClick={() => navigate('/Trip-Booking-Record')} icon="suitcase">
                                Trip Bookings
                            </CDBSidebarMenuItem>
                        </CDBSidebarMenu>
                    </CDBSidebarContent>
                </CDBSidebar>
                <div style={{ marginRight: '100px', marginLeft: '100px', width: '100%', margin: '10px' }}>
                    <span className='shadow'
                        style={{
                            height: '100px',
                            color: '#fff',
                            backgroundColor: '#111827',
                            borderRadius: '12px',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',

                        }}
                    >
                        <span
                            style={{
                                color: '#fff',
                                fontSize: '25px',
                                fontWeight: '600',
                                textAlign: 'center',
                                width: '100%',
                            }}
                        >
                            {topBar}
                        </span>
                        <Dropdown style={{ marginLeft: 'auto', marginRight: '15px' }}>
                            <Dropdown.Toggle style={{ backgroundColor: '#111827', border: 'none' }}>
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
    )
}

export default Panel
