import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUpPage = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' })
  const navigate = useNavigate()
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [signUpError, setSignUpError] = useState('');

   const postSignUp = async (e) => {
    try {
      if (!validate()) return;
      const res = await fetch('https://hh-ventixe-authservice-a2dke6b5hwezgpbe.swedencentral-01.azurewebsites.net/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        await fetch('https://hh-ventixe-verificationservice-emf8ddcmaeaxe9gf.swedencentral-01.azurewebsites.net/api/verification/send', {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email: formData.email})
      })
        navigate('/verification', { state: { email: formData.email } });
        } else{
        const errorText = await res.text();
        if (
          errorText.toLowerCase().includes('taken') ||
          errorText.toLowerCase().includes('already')
        ) {
          setEmailError('An account with this email already exists.');
        } else {
          setSignUpError('Error signing up. Please try again.');
        }
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
  
  const validate = () => {
    let valid = true;
    setFirstNameError('');
    setLastNameError('');
    setEmailError('');
    setPasswordError('');
    setSignUpError('');

    if(!formData.firstName) {
      setFirstNameError('First name is required');
      valid = false;
    }

    if(!formData.lastName) {
      setLastNameError('Last name is required');
      valid = false;
    }

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
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{6,}$/.test(formData.password)) {
    setPasswordError('Password must be at least 6 characters and include uppercase, lowercase, number, and special character.');
    valid = false;
  }
    return valid;
  }

  return (
    <div id="sign-up">
      <div className="auth-form-container">
        <form className="auth-form sign-up-form" onSubmit={handleSubmit} noValidate>
          <h1>Sign Up</h1>
          <div className="auth-input">
            <label htmlFor="firstName">First Name:</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
            {firstNameError && <p className="error">{firstNameError}</p>}
          </div>

          <div className="auth-input">
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
            {lastNameError && <p className="error">{lastNameError}</p>}
          </div>

          <div className="auth-input">
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {emailError && <p className="error">{emailError}</p>}
          </div>
          
          <div className="auth-input">
            <label htmlFor="password">Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
            {passwordError && <p className="error">{passwordError}</p>}
            {signUpError && <p className="error">{signUpError}</p>}
          </div>

          <button type="submit" className="auth-btn btn btn--large-lr btn--primary">Sign Up</button>
        </form>

        <div className="no-account">
          <p>Already have an account? </p>
          <a href='sign-in'>Sign in</a>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage