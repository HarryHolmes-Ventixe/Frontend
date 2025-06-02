import React from 'react'
import EventItem from './EventItem'

const EventList = ({events}) => {
  return (
    <section id="events-list">
      {
        events.map(event => (<EventItem item={event} key={event.id} />))
      }
    </section>
  )
}

export default EventList