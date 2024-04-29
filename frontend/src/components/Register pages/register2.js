// BiometricVerification.js
import React from 'react';
import { Link } from 'react-router-dom';
import './register2.css';

const Register2 = () => {
  return (
    <div className="body4">
      <nav className="navbar navbar-dark">
        <div className="container text-center head">
          <span className="navbar-brand mb-0 h1 text-danger"><i className="bi bi-file-lock2 h1 text-danger"></i></span>
          <span className="navbar-brand mb-0 h1 text-danger">4-Step Verification Security</span>
        </div>
      </nav>
   
      <div className="register-container mt-5">
        <div className="text-center biometric-verification-header">
          <div>
            <h1 className='h2 h1  mb-2'>Applying Step 3 Security</h1>
            <p className='p text-danger mb-5'>Take advantage of our secure services</p>
          </div>
          <p className=' text-light'>Secure your account with biometric authentication</p>
          <p className='text-succes'>Place your finger on the fingerprint scanner</p>
        </div>

        <div className="biometric-icon">
          <i className="bi bi-fingerprint"></i>
        
        </div>
        <button className='btn  btn-sm btn-danger'>open</button>
        <div className="back-btn">
          <Link to='/' className="btn-primary ">
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

export default Register2;
