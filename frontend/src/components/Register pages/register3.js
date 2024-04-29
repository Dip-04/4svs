import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './register3.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Register3 = () => {
  const history = useNavigate();
  const { username } = useParams();
  const [selectedColor, setSelectedColor] = useState('');

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleSubmit = (event) => {
    console.log()
    event.preventDefault(selectedColor);

    axios
      .post('http://localhost:8081/register-color',  { username, color: selectedColor })
      .then((res) => {
        console.log('Registration successful!!!!');
        window.alert('Registration successful!');
        console.log(res.data);
        history('/login');
      })
      .catch((err) => {
        console.error('Registration failed:', err);
        window.alert('Registration failed. Please try again.');
      });
  };
  return (
    <div className="body5">
      <nav className="navbar navbar-dark">
        <div className="container text-center head">
          <span className="navbar-brand mb-0 h1 text-danger"><i className="bi bi-file-lock2 h1 text-danger"></i></span>
          <span className="navbar-brand mb-0 h1 text-danger">4-Step Verification Security</span>
        </div>
      </nav>
      <div className="register-container mt-5">
        <div className="text-center color-selection-header">
          <div>
            <h1 className='h2 h1  mb-2'>Applying Step 4 Security</h1>
            <p className='p text-danger mb-5'>Take advantage of our secure services</p>
          </div>
          <p className=' text-light'>Select a color and register </p>
        </div>

        <div className="color-options">
          <label className="color-option red">
            <input type="radio" name="color" value="red" className='red' onChange={() => handleColorChange('red')} />
          </label>
          <label className="color-option blue">
            <input type="radio" name="color" value="blue" className='blue' onChange={() => handleColorChange('blue')} />
          </label>
          <label className="color-option green">
            <input type="radio" name="color" value="green" className='green' onChange={() => handleColorChange('green')} />
          </label>
        </div>

        <button className="btn btn-danger btn-lg text-light " onClick={handleSubmit}>
          Register
        </button>

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

export default Register3;