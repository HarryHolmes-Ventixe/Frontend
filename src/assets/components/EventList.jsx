import React, { useEffect, useState } from 'react'
import EventItem from './EventItem'

const EventList = () => {
  const [events, setEvents] = useState([])

  const getEvents = async () => {
    const res = await fetch('https://hh-ventixe-eventservice-caayb0hvfjczdega.swedencentral-01.azurewebsites.net/api/Events')
    
    if (res.ok) {
      const response = await res.json()
      setEvents(response.result)
    }
  }
  
  useEffect(() => {
    getEvents()
  }, [])

  return (
    <section id="events-list">
      {
        events.map(event => (<EventItem item={event} key={event.id} />))
      }
    </section>
  )
}

export default EventList