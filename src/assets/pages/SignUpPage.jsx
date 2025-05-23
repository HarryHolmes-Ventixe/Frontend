import React from 'react'

const SignUpPage = () => {
  return (
    <div id="sign-up">
      <form className="auth-form sign-up-form">
        <h1>Sign Up</h1>
        <div className="auth-input">
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" name="firstName" required />
        </div>

        <div className="auth-input">
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" name="lastName" required />
        </div>

        <div className="auth-input">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>
        
        <div className="auth-input">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>

        <button type="submit" className="auth-btn btn btn--large-lr btn--primary">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpPage