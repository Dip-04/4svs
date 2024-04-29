import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';  
import axios from 'axios';

const Login = () => {
  const history = useNavigate ();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const response = await axios.post('http://localhost:8081/login', {
            username: formData.username,
            password: formData.password,
        });

        console.log('Login successful!', response.data);
        window.alert("Login successful!");
        history('/login-otp/' + formData.username); 

    } catch (error) {
        console.error('Login failed!', error);
 window.alert("login failed")
        if (error.response && error.response.status === 401) {
           
            console.error('Invalid username or password');
            
        } else if (error.response) {
          
            console.error('Server responded with:', error.response.data);
        } else if (error.request) {
           
            console.error('No response received from the server');
        } else {
            
            console.error('Error setting up the request:', error.message);
        }

        
    }
};


  return (
    <div className='body1'>    
    <nav className="navbar navbar-dark ">
      <div className="container text-center head ">
          <span className="navbar-brand mb-0 
         h1 "><i class="bi bi-file-lock2 h1 text-danger"></i></span>
        <span className="navbar-brand mb-0 
         h1 text-danger">4-Step Verification Security</span>
      </div>
    </nav>
    <div className="login-container mt-5">
      <div className="text-center login-header ">
        <div>
        <h1 className=''>Step 1 </h1></div>
        <p className='p text-danger'>Take advantage of our secure services</p>
      </div>

      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label ">Username</label>
            <input type="text" className="form-control" name='username' id="username" placeholder="Enter your username" required  autocomplete="off"  onChange={handleChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' id="password" placeholder="Enter your password" required  autocomplete="off" onChange={handleChange}/>
          </div>
          <button type="submit" className="btn btn-danger text-light">Login</button>
        </form>
      </div>
      <div className="animation-container">
      <div className="typing-animation p">
        <span className="step p"></span> Your security is our top priority. </div>
      <div className="typing-animation p"> Experience the power of hacker-proof 
        <span className="step p"></span>
      </div>
   
      <div className="typing-animation p">
        <span className="step p"><i class="bi bi-key-fill me-2 "></i> <i class="bi bi-file-lock2 text-danger me-3"></i></span> login!

      </div>
     
      <div className=" p">
      <Link to='/' className="back btn-primary ">
          <i className="bi bi-arrow-left "></i>
        </Link></div>
    </div>
     
    </div>
    <footer className="footer">
        <div className="container text-center mt-2">
          <p>&copy; 2024 by Diptish-World</p>
        </div>
      </footer></div>
  );
};

export default Login;
