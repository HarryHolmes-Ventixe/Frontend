import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const EventDetails = () => {
  const {id} = useParams()

    const [event, setEvent] = useState({})
  
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

  return (
    <div class="event-details">
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p>{event.date}</p>
      <p>{event.location}</p>
      <p>{event.price}</p>
      <p>{event.category}</p>
      <p>{event.imageUrl}</p>
    </div>
  )
}

export default EventDetails