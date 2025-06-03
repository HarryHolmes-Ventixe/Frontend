import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const VerificationPage = () => {
  const location = useLocation()
  const email = location.state?.email
  const [code, setCode] = useState('')
  const navigate = useNavigate()

  const postVerification = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://hh-ventixe-verificationservice-emf8ddcmaeaxe9gf.swedencentral-01.azurewebsites.net/api/verification/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, code})
      })
      if(res.ok) {
        alert('Email verified successfully!')
        navigate('/sign-in')
      } else{
        console.error('Error verifying email')
        const errorText = await res.text();
        console.error('API response:', errorText);
        console.log('Submitted code:', code);
      }
    } catch {
      console.error('Error verifying email:', error)
      alert('An error occurred while verifying your email. Please try again.')
    }
  }

  return (
    <div id="verification">
      <div className='verification-container'>
        <h2>Enter verification code</h2>
        <p>We have sent an email to {email} with a verification code</p>
        <p className='p-bottom'>Enter the code below to verify your email address</p>
        <form onSubmit={postVerification} className='verification-form'>
          <div className="form-group">
            <label htmlFor="verification-code">Verification Code</label>
            <input type="text" id="verification-code" name="verification-code" value={code} onChange={e => setCode(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn--large-lr btn--primary">Verify</button>
        </form>
      </div>
    </div>
  )
}

export default VerificationPage