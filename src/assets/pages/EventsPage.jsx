import React, { useEffect, useState } from 'react'
import EventList from '../components/EventList'

const Events = () => {
  const [events, setEvents] = useState([])

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch('https://hh-ventixe-eventservice-caayb0hvfjczdega.swedencentral-01.azurewebsites.net/api/Events')
      if (res.ok) {
        const response = await res.json()
        setEvents(response.result)
      }
    }
    fetchEvents()
  }, [])

  const now = new Date()
  const activeEvents = events.filter(event => new Date(event.eventDate) > now)
  const pastEvents = events.filter(event => new Date(event.eventDate) <= now)

  return (
    <div className="events-container">
      <div className="event-status-filter">
        <div className="slider"></div>
        <button className="btn btn--medium-lr btn--primary">Active ({activeEvents.length})</button>
        <button className="btn btn--medium-lr btn--status">Past ({pastEvents.length})</button>
      </div>

      <EventList events={events} />
    </div>
  )
}

export default Events