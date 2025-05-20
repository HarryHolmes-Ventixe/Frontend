import React from 'react'
import EventList from '../components/EventList'

const Events = () => {
  return (
    <div className="events-container">
      <div className="event-status-filter">
        <div className="slider"></div>
        <button className="btn btn--medium-lr btn--primary">Active (8)</button>
        <button className="btn btn--medium-lr btn--status">Past (0)</button>
      </div>

      <EventList />
    </div>
  )
}

export default Events