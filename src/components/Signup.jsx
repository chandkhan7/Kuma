// src/components/Signup.jsx

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../styles/signup/Signup.css';  // Import the custom CSS
import { useNavigate } from 'react-router-dom';  // Import useNavigate for redirection

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    enrollmentNumber: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if enrollment number or email already exists in localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(
      user => user.enrollmentNumber === formData.enrollmentNumber || user.email === formData.email
    );

    if (existingUser) {
      setError('Enrollment number or email already taken');
    } else {
      // Add the new user to the localStorage
      users.push(formData);
      localStorage.setItem('users', JSON.stringify(users));
      setSuccess('Signup successful! You can now log in.');

      // Redirect to Login page after successful signup
      setTimeout(() => {
        navigate('/login');  // Redirect to Login page
      }, 2000); // Optional: Add a delay to show success message before redirect

      // Reset form after successful signup
      setFormData({
        username: '',
        email: '',
        enrollmentNumber: '',
        password: '',
      });
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm mt-5">
            <div className="card-body">
              <h3 className="text-center mb-4">Sign Up</h3>
              {error && <div className="alert alert-danger">{error}</div>}
              {success && <div className="alert alert-success">{success}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="enrollmentNumber" className="form-label">Enrollment Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="enrollmentNumber"
                    name="enrollmentNumber"
                    value={formData.enrollmentNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Sign Up</button>
              </form>
              <p className="mt-3 text-center">
                Already have an account? <a href="/login">Log in</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
