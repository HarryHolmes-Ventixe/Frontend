import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUpPage = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' })
   const navigate = useNavigate()

  const getEvent = async () => {
    const res = await fetch(`https://hh-ventixe-eventservice-caayb0hvfjczdega.swedencentral-01.azurewebsites.net/api/Events/${id}`)
    
    if (res.ok) {
      const response = await res.json()
      setEvent(response.result)
    }
  }

   const postSignUp = async (e) => {
    try {
      const res = await fetch('https://hh-ventixe-authservice-a2dke6b5hwezgpbe.swedencentral-01.azurewebsites.net/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        console.log('Sign in successful')
        navigate ('/')
      } else{
        console.error('Error signing up')
        const errorText = await res.text();
        console.error('API response:', errorText);
        console.log('Submitted form data:', formData);
      }
    }
    catch (error) {
      console.error('Error signing up:', error)
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
    await postSignUp()
  }

  return (
    <div id="sign-up">
      <form className="auth-form sign-up-form" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <div className="auth-input">
          <label htmlFor="firstName">First Name:</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </div>

        <div className="auth-input">
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </div>

        <div className="auth-input">
          <label htmlFor="email">Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        
        <div className="auth-input">
          <label htmlFor="password">Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>

        <button type="submit" className="auth-btn btn btn--large-lr btn--primary">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpPage