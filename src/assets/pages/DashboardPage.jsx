import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

const DashboardPage = () => {

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: ''});
  const [bookings, setBookings] = useState([]);
  const [events, setEvents] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  
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

    useEffect(() => {
    // Fetch events (same as EventsPage)
    const fetchEvents = async () => {
      const res = await fetch('https://hh-ventixe-eventservice-caayb0hvfjczdega.swedencentral-01.azurewebsites.net/api/Events');
      if (res.ok) {
        const response = await res.json();
        setEvents(response.result);
      }
    };
    fetchEvents();
  }, []);

  const getEventDetails = (eventId) => events.find(e => e.id === eventId);

  const formatDate = (string) => {
    const date = new Date(string);
    const dateSection = date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    const timeSection = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
    return `${dateSection} - ${timeSection}`;
  }

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
              </div>

              <div className="bookings-list">
                {bookings.length === 0 ? (
                  <div className="no-bookings">
                    <p className='no-bookings-text'>No bookings found. Press the button below to book an event today!</p>
                    <button className='no-bookings-btn btn btn--large-lr btn--primary' onClick={() => navigate('/events')}>Events</button>
                  </div>
                ) : (
                  <div className='bookings-grid'>
                    {bookings.map(booking => {
                      const event = getEventDetails(booking.eventId);
                      return (
                        <div key={booking.id} className="booking-item">
                          <div className="booking-image">
                            <div className='booking-info'>
                              <h3 className='booking-event-title'>{event.title}</h3>
                              <div className="booking-event-location"><i className="fa-light fa-location-dot"></i> {event.location}</div>
                              <div className="booking-event-date"><i className="fa-light fa-calendar-star"></i> {formatDate(event.eventDate)}</div>
                              <div className='booking-tickets'>{booking.ticketQuantity} tickets</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
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