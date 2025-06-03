import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Nav = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded.exp && Date.now() < decoded.exp * 1000) {
            setIsSignedIn(true);
          } else {
            setIsSignedIn(false);
          }
        } catch (e) {
          setIsSignedIn(false);
        }
      }
    }, []);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setIsSignedIn(false);
    navigate('/dashboard');
  }
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

        {isSignedIn && (
          <div className="signout-container">
            <button onClick={handleSignOut} className="signout-tablet">
              <i className="fa-regular fa-arrow-right-from-bracket"></i>
            </button>
            
            <button onClick={handleSignOut} className="signout-desktop">
              <i className="fa-regular fa-arrow-right-from-bracket"></i>
              <p>Sign out</p>
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Nav