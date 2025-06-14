import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const SignInPage = () => {
  const [formData, setFormData] = useState({email: '', password: ''})
  const navigate = useNavigate()
  const location = useLocation();
  const { checkAuth } = useAuth();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [signInError, setSignInError] = useState('');

  const postSignIn = async (e) => {
    if (!validate()) return;
    try {
      const res = await fetch('https://hh-ventixe-authservice-a2dke6b5hwezgpbe.swedencentral-01.azurewebsites.net/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        const data = await res.json()
        localStorage.setItem('token', data.token);
        checkAuth()
        console.log('Sign in successful')
        const redirectTo = location.state?.from || '/'
        navigate (redirectTo)
      } else {
      setSignInError('Invalid email or password.');
    }
    }
    catch (error) {
      console.error('Error signing in:', error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await postSignIn()
  }

  const validate = () => {
    let valid = true;
    setEmailError('');
    setPasswordError('');
    setSignInError('');

    if (!formData.email) {
      setEmailError('Email is required');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setEmailError('Email format is invalid');
      valid = false;
    }

    if(!formData.password) {
      setPasswordError('Password is required');
      valid = false;
    }
    return valid;
  }

  return (
    <div id="sign-in">
      <div className="auth-form-container">
        <form className="auth-form sign-in-form" onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          <div className="auth-input">
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {emailError && <p className="error">{emailError}</p>}
          </div>

          <div className="auth-input">
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
            {passwordError && <p className="error">{passwordError}</p>}
            {signInError && <p className="error">{signInError}</p>}
          </div>
          <button type="submit" className="auth-btn btn btn--large-lr btn--primary">Sign In</button>
        </form>

        <div className="no-account">
          <p>Don't have an account? </p>
          <a href='sign-up'>Sign up</a>
        </div>
      </div>
    </div>
  )
}

export default SignInPage