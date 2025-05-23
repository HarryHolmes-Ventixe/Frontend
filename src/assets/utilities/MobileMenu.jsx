import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const MobileMenu = () => {

  const [showMenu, setShowMenu] = useState(false)

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const closeMenu = () => {
    setShowMenu(false)
  }

  useEffect(() => {
    if(showMenu) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }
  },[showMenu])

  return (
    <>
      <button className="btn-mobile" onClick={toggleMenu}>
        <i className="fa-regular fa-bars"></i>
      </button>

      <div className="navigation">
        <div className="menu-container">
          <nav className={`${showMenu ? 'show' : ''}`}>
            <div className="nav-links">
              <Link className="nav-link" to="/" onClick={closeMenu}>Dashboard</Link> 
              <Link className="nav-link" to="/" onClick={closeMenu}>Sign In/Sign Up</Link>
              <Link className="nav-link" to="/" onClick={closeMenu}>Events</Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}

export default MobileMenu