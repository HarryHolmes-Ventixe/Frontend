import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const breadcrumbItems = [
    <Link key="home" to="/" className={pathnames.length === 0 ? 'active' : ''}>Dashboard</Link>
  ];

  pathnames.forEach((value, idx) => {
    const to = '/' + pathnames.slice(0, idx + 1).join('/');
    const isLast = idx === pathnames.length - 1;
    breadcrumbItems.push(
      <span key={to + '-sep'}> / </span>,
      <Link
        key={to}
        to={to}
        className={isLast ? 'active' : ''}
      >
        {decodeURIComponent(value.charAt(0).toUpperCase() + value.slice(1))}
      </Link>
    );
  });

  const pageTitle =
  pathnames.length === 0
    ? 'Dashboard'
    : decodeURIComponent(pathnames[pathnames.length - 1])
        .replace(/-/g, ' ')
        .replace(/^\w/, c => c.toUpperCase());

  return (
    <header>
      <div class="header-container">
        <div class='logo'>
          <img src='/images/logo.svg' alt="Logo" class="logo"/>
        </div>
        <div class="breadcrumb-container">
          <div class="breadcrumb">
            {breadcrumbItems}
          </div>
          <h2>{pageTitle}</h2>
        </div>

        <div class="more-container">
          <i class="fa-regular fa-bars"></i>

          <div class="options">
            <div class="search option">
              <div class="search-bar">
                <p>Search anything</p>
              </div>
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>
            <div class="notifications option">
              <i class="fa-solid fa-bell"></i>
            </div>
            <div class="settings option">
              <i class="fa-solid fa-gear"></i>
            </div>
            <div class="profile option">
              <i class="fa-solid fa-user"></i>
              <div class="profile-info">
                <p class="name">User Name</p>
                <p class="status">User Status</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header