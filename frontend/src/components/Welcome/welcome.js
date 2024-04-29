
import React from 'react';
import './welcome.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css';
import {Link} from 'react-router-dom'
const Welcome = () => {
  return (
    <div className='body'>
      
      <nav className="navbar navbar-dark ">
        <div className="container text-center head">
            <span className="navbar-brand mb-0 text-danger
           h1 "><i class="bi bi-file-lock2 text-danger"></i></span>
          <span className="navbar-brand mb-0 text-danger
           h1 ">4-Step Verification Security</span>
        </div>
      </nav>

<div className="hacker-container">
  <div className="text-center hacker-content black">
    <h2 className='mt-5 mb-4'>Welcome to the Security Zone</h2>
    <p className='mt-3 mb-4 text-danger'>Unlock the secrets with our 4-step verification security</p>
    <div className="animation-container">
      <div className="typing-animation">
        <span className="step"><i class="bi bi-key-fill me-2 "> </i> <i class="bi bi-file-lock2 text-danger me-3"></i>Step 1:</span> Enter Password
      </div>
      <div className="typing-animation">
        <span className="step"><i class="bi bi-key-fill me-2 "></i> <i class="bi bi-file-lock2 text-danger me-3"></i>Step 2:</span> Enter OTP
      </div>
      <div className="typing-animation">
        <span className="step"><i class="bi bi-key-fill me-2 "></i> <i class="bi bi-file-lock2 text-danger me-3"></i>Step 3:</span> Biometric Verification
      </div>
      <div className="typing-animation">
        <span className="step"><i class="bi bi-key-fill me-2 "></i> <i class="bi bi-file-lock2 text-danger me-3"></i>Step 4:</span> Choose Your Color
      </div>
    </div>
    <div className="btn-group" role="group">
      <Link  className="btn btn-danger me-3 text-light" to='/login'>Login</Link>
      <Link className="btn btn-success ms-3"  to='/register'>Register</Link>
    </div>
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

export default Welcome;
