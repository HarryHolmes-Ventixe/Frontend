import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext';

const Nav = () => {
  const { isSignedIn, setIsSignedIn } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setIsSignedIn(false);
    navigate('/dashboard');
  };
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