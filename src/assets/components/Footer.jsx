import React from 'react'

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="copyright">
          <h6>Copyright © 2025 Peterdraw</h6>
        </div>
        <div className="footer-links">
          <p>Privacy Policy</p>
          <p>Terms and conditions</p>
          <p>Contact Us</p>
        </div>
        <div className="socials">
          <a href='https://www.facebook.com/' target="_blank"><i className="fa-brands fa-facebook"></i></a>
          <a href='https://www.x.com/' target="_blank"><i className="fa-brands fa-x-twitter"></i></a>
          <a href='https://www.instagram.com/' target="_blank"><i className="fa-brands fa-instagram"></i></a>
          <a href='https://www.youtube.com/' target="_blank"><i className="fa-brands fa-youtube"></i></a>
          <a href='https://www.linkedin.com/' target="_blank"><i className="fa-brands fa-linkedin"></i></a>
        </div>
      </div>
    </footer>
  )
}

export default Footer