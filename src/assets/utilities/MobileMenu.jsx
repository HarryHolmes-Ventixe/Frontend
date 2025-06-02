import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

const MobileMenu = () => {

  const [showMenu, setShowMenu] = useState(false)
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [userInfo, setUserInfo] = useState({ name: ''})
  const navigate = useNavigate()

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

   useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded.exp && Date.now() < decoded.exp * 1000) {
            setIsSignedIn(true);
            setUserInfo({
              name: `${decoded.firstName || ''} ${decoded.lastName || ''}`.trim(),
              email: decoded.email || ''
            });
          } else {
            setIsSignedIn(false);
            setUserInfo({ name: '', email: '' });
          }
        } catch (e) {
          setIsSignedIn(false);
          setUserInfo({ name: '', email: '' });
        }
      } else {
        setIsSignedIn(false);
        setUserInfo({ name: '', email: '' });
      }
    }, []);

    const handleSignOut = () => {
      localStorage.removeItem('token')
      setIsSignedIn(false)
      setUserInfo({ name: '', email: '' })
      closeMenu()
      navigate('/dashboard')
    }
  

  return (
    <>
      <button className="btn-mobile" onClick={toggleMenu}>
        <i className="fa-regular fa-bars"></i>
      </button>

      <div className="navigation">
        <div className="menu-container">
          <nav className={`${showMenu ? 'show' : ''}`}>
            <div className="nav-links">
              <div>
                {!isSignedIn ? (
                <div>
                  <Link className="nav-link" to="/sign-in" onClick={closeMenu}>Sign In /</Link>
                  <Link className="nav-link" to="/sign-up" onClick={closeMenu}>Sign Up</Link>
                </div>
              ) : (
                <div className="mobile-auth">
                  <Link className="nav-link" to="/profile" onClick={closeMenu}>Profile</Link>
                  <button className="nav-link btn-sign-out mobile-sign-out" onClick={handleSignOut}>Sign Out</button>
                </div>
              )}
              </div>
              <Link className="nav-link" to="/" onClick={closeMenu}>Dashboard</Link> 
              <Link className="nav-link" to="/events" onClick={closeMenu}>Events</Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  )
}

export default MobileMenu