import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const VerificationPage = () => {
  const location = useLocation()
  const email = location.state?.email
  const [code, setCode] = useState('')
  const navigate = useNavigate()
  const [codeError, setCodeError] = useState('')
  const [resendTimer, setResendTimer] = useState(0)

  const postVerification = async (e) => {
    e.preventDefault();
    try {
      if (!validate()) return;
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
        setCodeError('Incorrect verification code. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying email:', error)
      alert('An error occurred while verifying your email. Please try again.')
    }
  }

  const newCode = async () =>{
    await fetch('https://hh-ventixe-verificationservice-emf8ddcmaeaxe9gf.swedencentral-01.azurewebsites.net/api/verification/send', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email})
    })
    alert('A new verification code has been sent to your email address.')
    setResendTimer(60);
    const interval = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      })
    }, 1000)
  }

  const validate = () => {
    let isValid = true;
    setCodeError('');
    if(!code) {
      setCodeError('Verification code is required.');
      isValid = false;
    }
    return isValid;
  }

  return (
    <div id="verification">
      <div className='verification-container'>
        <h2>Enter verification code</h2>
        <p className="p-top">We have sent an email to <span className='email-highlight'>{email}</span><br></br> with a verification code</p>
        <p className='p-valid'>This code is valid for 5 minutes</p>
        <p className='p-bottom'>Enter the code below to verify your email address</p>
        <form onSubmit={postVerification} className='verification-form' noValidate>
          <div className="form-group">
            <label htmlFor="verification-code">Verification Code</label>
            <input type="text" id="verification-code" name="verification-code" value={code} onChange={e => setCode(e.target.value)} />
            {codeError && <span className="error">{codeError}</span>}
          </div>
          <button type="submit" className="verify-button btn btn--large-lr btn--primary">Verify</button>
        </form>

        <div className='new-code'>
          <p className='p-top'>Didn't receive the code?</p>
          <p className='p-bottom'>You can request a new code to be sent to your email address.</p>
          <button className="resend-button btn btn--large-l btn--secondary" onClick={newCode} disabled={resendTimer > 0}>{resendTimer > 0 ? `Resend Code (${resendTimer}s)` : 'Resend Code'}</button>
        </div>
      </div>
    </div>
  )
}

export default VerificationPage