import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import MobileMenu from '../utilities/MobileMenu';

const Header = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);
  const isLoggedIn = false; // replace with logic from the AuthService MVP

  // GitHub Copilot helped me retrieve the event title and set it as the breadcrumb item and the page title.
  const eventTitle = location.state?.title;

  const breadcrumbItems = [
    <Link key="home" to="/" className={pathnames.length === 0 ? 'active' : ''}>Dashboard</Link>
  ];

  pathnames.forEach((value, idx) => {
    const to = '/' + pathnames.slice(0, idx + 1).join('/');
    const isLast = idx === pathnames.length - 1;
    let label = decodeURIComponent(value.charAt(0).toUpperCase() + value.slice(1));
    if (pathnames.includes('booking') && value !== 'booking' && idx === pathnames.length - 2) {
      return;
    }
    if (isLast && eventTitle) {
      label = eventTitle;
    }
    breadcrumbItems.push(
      <span key={to + '-sep'}> / </span>,
      <Link
        key={to}
        to={to}
        className={isLast ? 'active' : ''}
      >
        {label}
      </Link>
    );
  });

  const pageTitle =
    eventTitle
      ? eventTitle
      : pathnames.length === 0
        ? 'Dashboard'
        : decodeURIComponent(pathnames[pathnames.length - 1])
            .replace(/-/g, ' ')
            .replace(/^\w/, c => c.toUpperCase());

  return (
    <header>
      <div className="header-container">
        <div className='logo'>
          <img src='/images/logo.svg' alt="Logo" className="logo"/>
        </div>
        <div className="breadcrumb-container">
          <div className="breadcrumb">
            {breadcrumbItems}
          </div>
          <h2>{pageTitle}</h2>
        </div>

        <div className="more-container">
          <MobileMenu />

          <div className="options">
            <div className="search option">
              <div className="search-bar">
                <p>Search anything</p>
              </div>
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>

            <div className="notifications option">
              <i className="fa-solid fa-bell"></i>
            </div>

            <div className="settings option">
              <i className="fa-solid fa-gear"></i>
            </div>

            <div className="profile option">
              
              <Link to="/sign-in" className="btn-sign-in"><i className="fa-solid fa-user"></i></Link>

              {/*replace with logic from the AuthService MVP */}
              {!isLoggedIn ? (
                <div className="auth-container">
                  <Link to="/sign-in" className="btn-sign-in">Sign In / <br/></Link>
                  <Link to="/sign-up" className="btn-sign-up">Sign Up</Link>
                </div>
              ) : (
                <Link to="/profile" className="profile-info">
                  <p className="name">User Name</p>
                  <p className="status">User Status</p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header