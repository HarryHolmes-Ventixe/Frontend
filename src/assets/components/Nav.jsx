import React from 'react'
import { NavLink } from 'react-router-dom'

const Nav = () => {
  return (
    <nav>
      <div className="nav-container">
        <div className="logo-container">
          <img src='/images/logo.svg' alt="Logo" className="logo"/>
          <h2>Ventixe</h2>
        </div>
         
        <div className="nav-links">
          <NavLink to="/" className="nav-link">
            <span className="nav-icon"><i className="fa-light fa-grid-2"></i></span>
            <span className="nav-text">Dashboard</span>
          </NavLink>
          <NavLink to="/events" className="nav-link">
            <span className="nav-icon"><i className="fa-light fa-ticket"></i></span>
            <span className="nav-text">Events</span>
          </NavLink>
        </div> 

        <div className="signout-container">
        <div className="signout-tablet">
          <i className="fa-regular fa-arrow-right-from-bracket"></i>
        </div>
        
        <div className="signout-desktop">
          <i className="fa-regular fa-arrow-right-from-bracket"></i>
          <p>Sign out</p>
        </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav