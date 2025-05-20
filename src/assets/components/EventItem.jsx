import React from 'react'
import { Link } from 'react-router-dom'

const EventItem = ({item}) => {
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

  return (
    <Link 
    to={`/events/${item.id}`}
    state={{ title: item.title }}
    >
      
      <div className="event-card">
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
        </div>
      </div>
    </Link>
  )
}

export default EventItem