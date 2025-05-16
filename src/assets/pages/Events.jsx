import React from 'react'

const Events = () => {
  return (
    <div class="events-container">
      <div class="event-status-filter">
        <div class="slider"></div>
        <button class="btn btn--medium-lr btn--primary">Active (8)</button>
        <button class="btn btn--medium-lr btn--status">Past (0)</button>
      </div>

      <div class="events-list">
        <div class="event-card">
          <div class="event-image-wrapper">
            <img class="event-image" />
            <div class="event-top">
              <p class="event-type">Sports</p>
              <p class="event-status">Active</p>
            </div>
          </div>
          <div class="event-details">
            <p class="event-date">June 10th 2025 - 3:00 pm</p>
            <h3 class="event-title">Norwich City v Leeds United</h3>
            <p class="event-location">Carrow Road, Norwich</p>
            <div class="event-bottom">
              <p class="event-capacity">90%</p>
              <p class="event-cost">£30</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Events