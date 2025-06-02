import { jwtDecode } from 'jwt-decode'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const EventItem = ({item}) => {
  const navigate = useNavigate()
  const location = useLocation();

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

  const handleCardClick = () => {
    navigate(`/events/${item.id}`, { state: { title: item.title } });
  };

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
      navigate(`/events/${item.id}/booking`);
    }
  };

  return (      
    <div className="event-card" onClick={handleCardClick}>
      <div className="card-section-one">
        <div className="event-image">{item.image}</div>
      </div>
      <div className="card-section-two">
        <div className="event-info">
          <div className="event-title">{item.title}</div>
          <div className="event-description">{item.description}</div>
        </div>
        <div className="event-details">
          <div className="event-location"><i className="fa-light fa-location-dot"></i> {item.location}</div>
          <div className="event-date"><i className="fa-light fa-calendar-star"></i> {formatDate(item.eventDate)}</div>
        </div>
      </div>
      <div className="card-section-three">
        <div className="event-price">${item.price}</div>
        <button className="book btn btn--large-r btn--primary" onClick={handleBookNow} onMouseDown={e => e.stopPropagation()}>Book now</button>
      </div>
    </div>
  )
}

export default EventItem