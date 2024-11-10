// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../styles/Login.css';

const Login = ({ setIsLoggedIn }) => {
  const [enrollmentNumber, setEnrollmentNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Find user by enrollment number and password
    const user = users.find(
      user => user.enrollmentNumber === enrollmentNumber && user.password === password
    );

    if (user) {
      // Save user data in localStorage
      localStorage.setItem('user', JSON.stringify({
        name: user.username || user.name,  // Use username if present, otherwise use name
        enrollmentNumber: user.enrollmentNumber
      }));
      localStorage.setItem('isLoggedIn', 'true');
      
      setIsLoggedIn(true);  // Update App's login state
      navigate('/attendance');  // Redirect to attendance page or profile
    } else {
      setError('Invalid enrollment number or password');
    }
  };

  return (
    <div className="container login-container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm mt-5">
            <div className="card-body">
              <h3 className="text-center mb-4">Log In</h3>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="enrollmentNumber" className="form-label">Enrollment Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="enrollmentNumber"
                    value={enrollmentNumber}
                    onChange={(e) => setEnrollmentNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Log In</button>
              </form>
              <p className="mt-3 text-center">
                Don't have an account? <a href="/signup">Sign Up</a>
              </p>
              <p className="text-center">
                <a href="/forgot-password">Forgot Password?</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
