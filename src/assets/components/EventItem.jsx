import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const EventItem = ({item}) => {
  const navigate = useNavigate()

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
      // hour12: false
    });
    return `${dateSection} - ${timeSection}`;
  }

    const handleCardClick = () => {
    navigate(`/events/${item.id}`, { state: { title: item.title } });
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
        {/* Github copilot helped my issue of having a link within a link. */}
        <Link to={`/events/${item.id}/booking`} className="book btn btn--large-r btn--primary" onClick={e => e.stopPropagation()} onMouseDown={e => e.stopPropagation()}>Book now</Link>
      </div>
    </div>
  )
}

export default EventItem