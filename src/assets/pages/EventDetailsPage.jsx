import { jwtDecode } from 'jwt-decode'
import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'

const EventDetails = () => {
  const {id} = useParams()
  const [event, setEvent] = useState({})
  const navigate = useNavigate()
  const location = useLocation();

  const getEvent = async () => {
    const res = await fetch(`https://hh-ventixe-eventservice-caayb0hvfjczdega.swedencentral-01.azurewebsites.net/api/Events/${id}`)
    
    if (res.ok) {
      const response = await res.json()
      setEvent(response.result)
    }
  }
  
  useEffect(() => {
    getEvent()
  }, [])

  // Github copilot suggested this to make sure the page title is set correctly when redirecting from sign in.
    useEffect(() => {
    if (event.title && (!location.state || !location.state.title)) {
      navigate(location.pathname, {
        replace: true,
        state: { ...location.state, title: event.title }
      });
    }
  }, [event.title]);

  const formatDate = (string) => {
    const date = new Date(string);
    const dateSection = date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    const timeSection = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    });
    return `${dateSection} - ${timeSection}`;
  }

  const handleBookNow = (e) => {
      e.stopPropagation();
  
      const token = localStorage.getItem('token');
      let isSignedIn = false;
      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded.exp && Date.now() < decoded.exp * 1000) {
            isSignedIn = true;
          }
        } catch (e) {
          isSignedIn = false;
        }
      }
      if (!isSignedIn) {
        navigate('/sign-in', { state: { from: location.pathname } });
      } else {
        navigate(`/events/${id}/booking`);
      }
    };

  return (
    <div className="event-details-container">
      <div className="event-details">
        <div className="details-image">{event.image}
          
        </div>

        <div className="details-info">
          <h3 className="details-title">{event.title}</h3>
          <p className="details-date"><i className="fa-light fa-calendar-star"></i> {formatDate(event.eventDate)}</p>
          <p className="details-location"><i className="fa-light fa-location-dot"></i> {event.location}</p>
        </div>

        <div className="details-tickets">
          <div className="tickets-info">
            <p className="tickets-sold">Tickets sold</p>
            {/* <p className="tickets-number">{event.ticketsAvailable}</p> */}
          </div>

          <div className="details-price">
            <p className="starts-from">Starts from</p>
            <p className="price">${event.price}</p>
          </div>

          <div className="details-button">
            <button className="details-book btn btn--large-r btn--primary" onClick={handleBookNow} onMouseDown={e => e.stopPropagation()}>Book now</button>
          </div>
        </div>

        <div className="details-description">
          <p className="about">About Event</p>
          <p className="description">{event.description}</p>
        </div>
      </div>
    </div>
  )
}

export default EventDetails