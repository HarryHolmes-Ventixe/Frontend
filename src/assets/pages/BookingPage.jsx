import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const BookingPage = () => {
  const {id} = useParams()
  const [event, setEvent] = useState({})
  const [formData, setFormData] = useState({ eventId: id, firstName: '', lastName: '', email: '', streetName: '', postalCode: '', city: '', ticketQuantity: 1 })
  const navigate = useNavigate()

  useEffect(() => {
    getEvent()
  }, [])

  const getEvent = async () => {
    const res = await fetch(`https://hh-ventixe-eventservice-caayb0hvfjczdega.swedencentral-01.azurewebsites.net/api/Events/${id}`)
    
    if (res.ok) {
      const response = await res.json()
      setEvent(response.result)
    }
  }

  const postBooking = async () => {
    try{
      const res = await fetch(`https://hh-ventixe-bookingservice-ddh2g9c2gsetfng9.swedencentral-01.azurewebsites.net/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        console.log('Booking successful')
        //  You can redirect the user to a confirmation page or show a success message
        navigate ('/')
        // navigate(`/events/${id}/confirmation`)
      }
      else {
        console.error('Error booking the event')
      }

    } catch (error) {
      console.error('Error submitting the booking:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "ticketQuantity" ? Number(value) : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await postBooking()
  }

  // This is if I want to show the date of the event
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

  return (
    <div id="booking-page">
      <h2 className="booking-title">Book Event - {event.title}</h2>

      <div className="booking-event-info">
        <div className="booking-event-image">{event.image}
          
        </div>

        <div className="booking-event-details">
          <p className="details-date"><i className="fa-light fa-calendar-star"></i> {formatDate(event.eventDate)}</p>
          <p className="details-location"><i className="fa-light fa-location-dot"></i> {event.location}</p>
          <p className="details-price">${event.price}</p>
        </div>
      </div>

      <form className="booking-form" onSubmit={handleSubmit} noValidate>
        <div className="form-input">
          <label>First Name</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>

        <div className="form-input">
          <label>Last Name</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>

        <div className="form-input">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-input">
          <label>Street Name</label>
          <input type="text" name="streetName" value={formData.streetName} onChange={handleChange} required/>
        </div>

        <div className="form-input">
          <label>Postal Code</label>
          <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} required />
        </div>

        <div className="form-input">
          <label>City</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} required />
        </div>

        <div className="form-input">
          <label>Number of Tickets (Max 4 per booking)</label>
          <select name="ticketQuantity" value={formData.ticketQuantity || ''} onChange={handleChange} required>
            <option value="" disabled>Select tickets</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>

        <div className="form-bottom">
          <div className="cost">
            <p className="cost-text">Total cost: </p>
            <p className="cost-value">${event.price * (formData.ticketQuantity || 1)}</p>
          </div>

          <button type="submit" className="confirm-booking btn btn--large-lr btn--primary">Book now</button>
        </div>
      </form>
    </div>
  )
}

export default BookingPage