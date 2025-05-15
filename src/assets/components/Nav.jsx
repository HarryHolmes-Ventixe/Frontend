import React from 'react'

const Nav = () => {
  return (
    <nav>
      <div class="nav-container">
        <div class="logo-container">
          <img src='/images/logo.svg' alt="Logo" class="logo"/>
          <h2>Ventixe</h2>
        </div>
         

         <div class="signout-container">
          <div class="signout-tablet">
            <i class="fa-regular fa-arrow-right-from-bracket"></i>
          </div>
          
          <div class="signout-desktop">
            <i class="fa-regular fa-arrow-right-from-bracket"></i>
            <p>Sign out</p>
          </div>
         </div>
      </div>
    </nav>
  )
}

export default Nav