import React from 'react'

const Header = () => {
  return (
    <header>
      <div class="header-container">
        <div class='logo'>
          <img src='/images/logo.svg' alt="Logo" class="logo"/>
        </div>
        <div class="breadcrumb-container">
          <div class="breadcrumb">
            <p>Breadcrumb</p>
          </div>
          <h2>Page title</h2>
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