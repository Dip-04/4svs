import React, { useState } from 'react';
import axios from 'axios';
import './register.css'; 
import { Link, useNavigate  } from 'react-router-dom';

const Register = () => {
  const history = useNavigate ();
  const [values,setValues]=useState({
    name:"",
    username:"",
    email:"",
    password:"",
  })
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  }
  
  
  const handleSubmit=(event)=>{
    event.preventDefault();
    axios.post('http://localhost:8081/register',values)
    .then(res=>{console.log("registration successfully!!!!")
    window.alert("Registration successful!");
    console.log(res.data);
    history('/register-otp/'+values.username); 

  }
    )
    .catch(err=>console.log(err))
  }
  return (
    <div className='body3'>    
    <nav className="navbar navbar-dark ">
      <div className="container text-center head ">
          <span className="navbar-brand mb-0 
         h1 "><i class="bi bi-file-lock2 h1 text-danger"></i></span>
        <span className="navbar-brand mb-0 
        text-danger h1 ">4-Step Verification Security</span>
      </div>
    </nav>
    <div className="register-container mt-5">
      <div className="text-center register-header ">
        <div>
        <h1 className='h2 h1'>Applying Step 1 Security</h1></div>
        <p className='p text-danger'>Take advantage of our secure services</p>
      </div>

      <div className="register-form">
          <form onSubmit={handleSubmit}>
          <div className="mb-3">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input type="text" className="form-control" name='name' id="name" placeholder="Enter your name" required autoComplete="off" onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input type="text" className="form-control" id="username" placeholder="Choose a username" name="username" required autoComplete="off" onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email ID</label>
              <input type="email" className="form-control" id="email" placeholder="Enter Email id" name="email" required autoComplete="off" onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Create a password" name="password" required autoComplete="off" onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-danger btn-sm text-light">Register</button>
          </form>
          

          <div className=" p">
      <Link to='/' className="back btn-primary">
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

export default Register;
