import React from 'react'

const SignInPage = () => {
  return (
    <div id="sign-in">
      <form className="auth-form sign-in-form">
        <h1>Sign In</h1>
        <div className="auth-input">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" required />
        </div>

        <div className="auth-input">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit" className="auth-btn btn btn--large-lr btn--primary">Sign In</button>
      </form>
    </div>
  )
}

export default SignInPage