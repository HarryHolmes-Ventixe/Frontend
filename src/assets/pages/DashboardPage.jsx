import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

const DashboardPage = () => {

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: ''});
  const [bookings, setBookings] = useState([]);
  const location = useLocation();
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded.exp && Date.now() < decoded.exp * 1000) {
            setIsSignedIn(true);
            setUserInfo({
              name: `${decoded.firstName || ''} ${decoded.lastName || ''}`.trim()
            });
          } else {
            setIsSignedIn(false);
            setUserInfo({ name: ''});
          }
        } catch (e) {
          setIsSignedIn(false);
          setUserInfo({ name: ''});
        }
      } else {
        setIsSignedIn(false);
        setUserInfo({ name: ''});
      }
    }, [location]);

    useEffect(() => {
      if (isSignedIn) {
        fetch(`https://hh-ventixe-bookingservice-ddh2g9c2gsetfng9.swedencentral-01.azurewebsites.net/api/bookings/my-bookings`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        .then(res => res.json())
        .then(data => setBookings(data))
        .catch(() => setBookings([]));
      }
    }, [isSignedIn]);
  return (
    <div id="dashboard">
      <div className="logo-container">
        <img src='/images/logo.svg' alt="Logo" className="logo"/>
        <h1>Ventixe</h1>
      </div>

      <div className='dashboard-container'>
        {!isSignedIn ? (
          <div className="dashboard-header-noauth">
            <h2>Welcome to Ventixe!</h2>
            <h3>Please sign in to view your dashboard</h3>
            <div className="dashboard-auth-links">
              <div className="dashboard-signin">
                <p>Click the button below to sign in.</p>
                <Link className="btn btn--large-lr btn--primary" to="/sign-in">Sign In</Link>
              </div>
              <div className="dashboard-signup">
                <p>Don't have an account with us?</p>
                <Link className="btn btn--large-lr btn--primary" to="/sign-up">Sign Up</Link>
              </div>  
            </div>
          </div>
        ) : (
          <>
            <div className="dashboard-header-auth">
              <h2>
                <span className="welcome-text">Welcome, </span>
                <span className="user-name">{userInfo.name}</span>
                <span className="welcome-text">!</span>
              </h2>
              <p>This is your dashboard, here you can view which events you have booked!</p>
            </div>
            <div className="dashboard-content">
              <div className="upcoming-events">
                <h2>Upcoming Events</h2>
                <p>{bookings.length}</p>
              </div>

              <div className="bookings-list">
                {bookings.length === 0 ? (
                  <div className="no-bookings">
                    <p className='no-bookings-text'>No bookings found. Press the button below to book an event today!</p>
                    <button className='no-bookings-btn btn btn--large-lr btn--primary'>Events</button>
                  </div>
                ) : (
                  <ul>
                    {bookings.map(booking => (
                      <li key={booking.id}>
                        {booking.eventTitle || booking.eventId} — {booking.ticketQuantity} tickets
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default DashboardPage