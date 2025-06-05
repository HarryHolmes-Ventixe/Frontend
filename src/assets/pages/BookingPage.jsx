import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';

const BookingPage = () => {
  const {id} = useParams()
  const [event, setEvent] = useState({})
  const { userInfo } = useAuth();
  const [formData, setFormData] = useState({ eventId: id, firstName: '', lastName: '', email: '', streetName: '', postalCode: '', city: '', ticketQuantity: 1 })
  const navigate = useNavigate()
  const [streetError, setStreetError] = useState('');
  const [postcodeError, setPostcodeError] = useState('');
  const [cityError, setCityError] = useState('');
  const [bookingError, setBookingError] = useState('');

  // This was suggested by Github Copilot to prevent the form being submitted multiple times.
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    getEvent()
  }, [])

  const getEvent = async () => {
  console.log('Fetching event with id:', id);
  const res = await fetch(`https://hh-ventixe-eventservice-caayb0hvfjczdega.swedencentral-01.azurewebsites.net/api/Events/${id}`)
  if (res.ok) {
    const response = await res.json()
    console.log('Event data received:', response);
    setEvent(response.result)
  } else {
    console.error('Failed to fetch event:', res.status);
  }
}

const postBooking = async () => {
  setIsSubmitting(true)
  try{
    if (!validate()) return;
    console.log('Submitting booking with formData:', formData);
    const res = await fetch(`https://hh-ventixe-bookingservice-ddh2g9c2gsetfng9.swedencentral-01.azurewebsites.net/api/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    if (res.ok) {
      const booking = await res.json();
      console.log('Booking response received:', booking);
      const bookingId = booking.id;
      if (bookingId) {
        navigate(`/booking-confirmation/${bookingId}`);
      } else {
        console.error('Booking ID not found in response');
      }
    }
    else {
      console.error('Error booking the event, status:', res.status)
    }

  } catch (error) {
    console.error('Error submitting the booking:', error)
  } finally {
    setIsSubmitting(false)
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
    if (isSubmitting) return;
    await postBooking()
  }

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

  useEffect(() => {
    if (userInfo) {
      setFormData(prev => ({
        ...prev,
        firstName: userInfo.firstName || '',
        lastName: userInfo.lastName || '',
        email: userInfo.email || ''
      }))
    }
  }, [userInfo])

  const validate = () => {
    let valid = true;
    setStreetError('');
    setPostcodeError('');
    setCityError('');
    setBookingError('');

    if (!formData.streetName) {
      setStreetError('Street name is required');
      valid = false;
    }

    if (!formData.postalCode) {
      setPostcodeError('Postal code is required');
      valid = false;
    }

    if (!formData.city) {
      setCityError('City is required');
      valid = false;
    }

    return valid;
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
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} disabled />
        </div>

        <div className="form-input">
          <label>Last Name</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} disabled />
        </div>

        <div className="form-input">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} disabled />
        </div>

        <div className="form-input">
          <label>Street Name</label>
          <input type="text" name="streetName" value={formData.streetName} onChange={handleChange}/>
          {streetError && <p className="error">{streetError}</p>}
        </div>

        <div className="form-input">
          <label>Postal Code</label>
          <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} />
          {postcodeError && <p className="error">{postcodeError}</p>}
        </div>

        <div className="form-input">
          <label>City</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} />
          {cityError && <p className="error">{cityError}</p>}
        </div>

        <div className="form-input">
          <label>Number of Tickets (Max 4 per booking)</label>
          <select name="ticketQuantity" value={formData.ticketQuantity || ''} onChange={handleChange}>
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

          <button type="submit" className="confirm-booking btn btn--large-lr btn--primary" disabled = {isSubmitting}>{isSubmitting ? 'Booking...' : 'Book now'}</button>
        </div>
      </form>
    </div>
  )
}

export default BookingPage