import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const BookingConfirmationPage = () => {
  const {id} = useParams()
  const [event, setEvent] = useState({})
  const [booking, setBooking] = useState({})

  useEffect(() => {
    const fetchBookingAndEvent = async () => {
      const bookingRes = await fetch(`https://hh-ventixe-bookingservice-ddh2g9c2gsetfng9.swedencentral-01.azurewebsites.net/api/bookings/${id}`)
      if (bookingRes.ok) {
        const bookingData = await bookingRes.json()
        console.log('Booking data received:', bookingData)
        setBooking(bookingData)

        if (bookingData.eventId) {
          console.log('Fetching event with eventId:', bookingData.eventId)
          const eventRes = await fetch(`https://hh-ventixe-eventservice-caayb0hvfjczdega.swedencentral-01.azurewebsites.net/api/Events/${bookingData.eventId}`)
          if (eventRes.ok) {
            const eventData = await eventRes.json()
            console.log('Event data received:', eventData)
            setEvent(eventData.result)
          }else {
            console.log('Failed to fetch event:', eventRes.status)
          }
        } else {
          console.log('No eventId found in booking data')
        }
      } else {
        console.log('Failed to fetch booking:', bookingRes.status)
      }
    }
    fetchBookingAndEvent()
  }, [id])

  const formatDate = (string) => {
    const date = new Date(string)
    const dateSection = date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
    const timeSection = date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    })
    return `${dateSection} - ${timeSection}`
  }

  return (
    <div id='booking-confirmation-page'>
      <h1 className='confirmation-title'>Booking confirmed!</h1>

      <div className='confirmation-details'>
        <div className="event-details">
          <h2 className='event-title'>Event: {event.title}</h2>
          <div className='event-image'></div>
          <p className='event-date'>Date: {formatDate(event.eventDate)}</p>
          <p className='event-location'>Location: {event.location}</p>
        </div>

        <div className="booking-details">
          <h3 className='booking-id'>Booking ID:<br></br> {booking.id}</h3>
          <div className='booking-info'>
            <p className='booking-tickets'>Ticket Quantity: {booking.ticketQuantity}</p>
            <p className='booking-name'>Customer Name: {booking.firstName} {booking.lastName}</p>
            <p className='booking-email'>Customer Email: {booking.email}</p>
            <p className='booking-address'>Customer Address: {booking.streetName}, {booking.city}, {booking.postalCode}</p>
            <p className='booking-date'>Booking Date: {formatDate(booking.bookingDate)}</p>
            <h3 className='booking-thanks'>Thank you for booking your spot!</h3>
          </div>
        </div>
      </div>

      <div className='confirmation-footer'>
        <p className='return-message'>Press here to return to your dashboard</p>
        <button className="dashboard-button btn btn--large-lr btn--primary">Dashboard</button>
      </div>
    </div>
  )
}

export default BookingConfirmationPage