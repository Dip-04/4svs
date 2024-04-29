import OtpInput from 'otp-input-react';

import React, { useState, useEffect } from 'react';
import './login1.css';
import { Link,useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {RecaptchaVerifier,signInWithPhoneNumber } from 'firebase/auth';
import {auth}from "../Login pages/firebase.config"
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
const Login1 = () => {
  const { username } = useParams();
  const [phoneNumber, setph] = useState('');
  const history = useNavigate ();
  const [otp,setotp]=useState("")
  useEffect(() => {
    const fetchph = async () => {
      try {
        const response = await fetch(`http://localhost:8081/getPhoneNumber/${username}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch. Status: ${response.status}`);
        }
    
        const data = await response.json();
        setph(data.phoneNumber);
        console.log(data.phoneNumber)
      } catch (error) {
        console.error('Error during fetch:', error.message);
      }
    };
    
    fetchph();
  }, [username]);
  
  function onCaptchVerify() {
    const recaptchaContainer = document.getElementById('recaptcha-container');
  
    if (!recaptchaContainer) {
      console.error("reCAPTCHA container not found");
      return;
    }
  
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(recaptchaContainer, {
        'size': 'invisible',
        'callback': (response) => {
          // Callback logic, if needed
        },
        'expired-callback': () => {
          // Expired callback logic, if needed
        }
      }, auth);
    }
  }
  
  function onSignup(){
   
    onCaptchVerify()
    
    const appVerifier=window.recaptchaVerifier
    const formatph= phoneNumber
    console.log(formatph)
    signInWithPhoneNumber(auth, formatph, appVerifier)
      .then((confirmationResult) => {
       
        window.confirmationResult = confirmationResult;
       
        toast.success('OTP HAS BEEN SENT!!!!')
      
      }).catch((error) => {
     
        console.log(error)
    
  
      });
  
  
  
  }
  function onOTPVerify() {
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        alert('Step 2 is Completed !!!!'); 
        console.log(res);
  
        
        axios.post('http://localhost:8081/verify-otp', { username, phone: phoneNumber })
          .then((response) => {
            console.log('Phone number added to the database:', response.data);
            history('/login-bio/'+username);
          })
          .catch((error) => {
            console.error('Error adding phone number to the database:', error);
            toast.error('Error verifying OTP. Please try again.');
          });
      })
      .catch((err) => {
        toast.error('Wrong OTP !!!!')
        console.log(err);
      });
  }

  return (
    <div className='body2'>
      <nav className="navbar navbar-dark">
        <div className="container text-center head">
          <span className="navbar-brand mb-0 h1 text-danger"><i className="bi bi-file-lock2 h1 text-danger"></i></span>
          <span className="navbar-brand mb-0 h1 text-danger">4-Step Verification Security</span>
        </div>
      </nav>
      <div className="register-container mt-5">
        <div className="text-center register-header">
          <div>
            <h1 className='h2 h1  mb-2'>Step 2 </h1>
          </div>
          <p className='p text-danger'>Take advantage of our secure services</p>
          <p className=' text-light'>OTP Verification</p>
          
        </div>

        <div className="otp-form">
    
            <div className="mb-3">
              <label htmlFor="ph" className="form-label">{username}'s Phone Number</label>
              <input
              type="tel"
              className="form-control"
              id="phone"
              onChange={setph}
              placeholder="Enter Mobile no"
              value={phoneNumber}
              readOnly
              autoComplete="off"
            />
            </div>
            <button type="button" onClick={onSignup} className="btn btn-danger btn-sm mb-3 text-light">
              Send OTP
            </button>
            <Toaster toastOptions={{duration:4000}}/>
   <div id="recaptcha-container"></div>
            <div className="mb-3">
              <label htmlFor="otp" className="form-label">Enter OTP</label>
              <OtpInput value={otp}
           className="otp-container"  onChange={setotp} OTPLength={6} otpType="number" disable={false} autoFocus></OtpInput>
            </div>
            <button type="button" onClick={onOTPVerify} className="btn btn-danger btn-xs mb-3 text-light">Verify OTP</button>
       
        </div>
        <div className="back-btn">
          <Link to='/' className=" btn-primary mt-5">
            <i className="bi bi-arrow-left"></i> 
          </Link>
        </div>
      </div>
      <footer className="footer">
        <div className="container text-center mt-2">
          <p>&copy; 2024 by Diptish-World</p>
        </div>
      </footer>
    </div>
  );
};

export default Login1;
