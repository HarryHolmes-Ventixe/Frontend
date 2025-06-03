import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

const DashboardPage = () => {

  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: ''});
  const location = useLocation();
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded.exp && Date.now() < decoded.exp * 1000) {
            setIsSignedIn(true);
            setUserInfo({
              name: `${decoded.firstName || ''} ${decoded.lastName || ''}`.trim()
            });
          } else {
            setIsSignedIn(false);
            setUserInfo({ name: ''});
          }
        } catch (e) {
          setIsSignedIn(false);
          setUserInfo({ name: ''});
        }
      } else {
        setIsSignedIn(false);
        setUserInfo({ name: ''});
      }
    }, [location]);
  return (
    <div id="dashboard">
      <div className="logo-container">
        <img src='/images/logo.svg' alt="Logo" className="logo"/>
        <h1>Ventixe</h1>
      </div>

      <div className='dashboard-container'>
        {!isSignedIn ? (
          <div className="dashboard-header-noauth">
            <h2>Welcome to Ventixe!</h2>
            <h3>Please sign in to view your dashboard</h3>
            <div className="dashboard-auth-links">
              <div className="dashboard-signin">
                <p>Click the button below to sign in.</p>
                <Link className="btn btn--large-lr btn--primary" to="/sign-in">Sign In</Link>
              </div>
              <div className="dashboard-signup">
                <p>Don't have an account with us?</p>
                <Link className="btn btn--large-lr btn--primary" to="/sign-up">Sign Up</Link>
              </div>  
            </div>
          </div>
        ) : (
          <>
            <div className="dashboard-header-auth">
              <h2>
                <span className="welcome-text">Welcome, </span>
                <span className="user-name">{userInfo.name}</span>
                <span className="welcome-text">!</span>
              </h2>
              <p>This is your dashboard, here you can view which events you have booked!</p>
            </div>
            <div className="dashboard-content">
              <div className="stats-card">
                <h3>Upcoming Events</h3>
                <p>2</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default DashboardPage