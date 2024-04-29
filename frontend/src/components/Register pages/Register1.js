import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import OtpInput from 'otp-input-react';
import { CgSpinner } from 'react-icons/cg';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {RecaptchaVerifier,signInWithPhoneNumber } from 'firebase/auth';
import {auth}from "../Login pages/firebase.config"
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const Register1 = () => {
  const { username } = useParams();
  const history = useNavigate ();

 const [otp,setotp]=useState("")
 const [loading,setloading]=useState(false)
 const [ph,setph]=useState("")

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
  setloading(true)
  onCaptchVerify()
  
  const appVerifier=window.recaptchaVerifier
  const formatph='+' + ph
  console.log(formatph)
  signInWithPhoneNumber(auth, formatph, appVerifier)
    .then((confirmationResult) => {
     
      window.confirmationResult = confirmationResult;
      setloading(false)
      toast.success('OTP HAS BEEN SENT!!!!')
    
    }).catch((error) => {
   
      console.log(error)
      setloading(false)

    });



}
function onOTPVerify() {
  window.confirmationResult
    .confirm(otp)
    .then(async (res) => {
      alert('Step 2 is Completed !!!!'); 
      console.log(res);

      
      axios.post('http://localhost:8081/verify-otp', { username, phone: ph })
        .then((response) => {
          console.log('Phone number added to the database:', response.data);
          history('/register-bio/'+username);
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
            <h1 className='h2 h1  mb-2'>Applying Step 2 Security</h1>
          </div>
          <p className='p text-danger'>Take advantage of our secure services</p>
          <p className=' text-light'>OTP Verification</p>
          
        </div>
        <Toaster toastOptions={{duration:4000}}/>
        <div id="recaptcha-container"></div>
        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">Enter Phone Number</label>
          <PhoneInput value={ph} onChange={setph} country={"in"} ></PhoneInput>
        </div>
        <button  onClick={onSignup}  className="btn btn-danger btn-sm mb-3 text-light">
          Send OTP
        </button>
        
       <>
        <div className="mb-3">
          <label htmlFor="otp" className="form-label">Enter OTP</label>
          <OtpInput value={otp}
           className="otp-container"  onChange={setotp} OTPLength={6} otpType="number" disable={false} autoFocus></OtpInput>
        </div>
        
        <button   onClick={onOTPVerify} className="btn btn-danger btn-xs mb-3 text-light">
          {loading && 
        <CgSpinner size={20} style={{ animation: 'spin 1s linear infinite' }} />
          }
          Verify OTP
        </button></>
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

export default Register1;
