import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCog } from 'react-icons/fa';

function Settings({ isLoggedIn, setIsLoggedIn }) {
  const [showSettings, setShowSettings] = useState(false);
  const [loading, setLoading] = useState(false);  // To control loading state
  const [creatingAccount, setCreatingAccount] = useState(false);  // To track loading for account creation
  const navigate = useNavigate();

  const toggleSettings = () => {
    setShowSettings((prev) => !prev);
  };

  const handleLoginRedirect = () => {
    setLoading(true);  // Start the loading process
    setTimeout(() => {
      setLoading(false);  // Stop loading after 1 second
      navigate('/login');  // Redirect to login page
    }, 1000);  // Wait for 1 second before redirecting
  };

  const handleLogout = () => {
    setLoading(true);  // Start the loading process for logout
    setTimeout(() => {
      localStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
      navigate('/login');  // Redirect to login page after logout
    }, 1000);  // Wait for 1 second before logging out
  };

  const handleCreateAccount = () => {
    setCreatingAccount(true);  // Start loading for account creation
    setTimeout(() => {
      setCreatingAccount(false);  // Stop loading after 1 second
      navigate('/signup');  // Redirect to signup page
    }, 1000);  // Wait for 1 second before navigating
  };

  return (
    <div className="nav-item position-relative text-white">
      <FaCog size={30} onClick={toggleSettings} style={{ cursor: 'pointer' }} />
      
      {/* Conditional rendering of the dropdown */}
      {showSettings && (
        <div className="dropdown-menu dropdown-menu-right show p-2" style={{
          position: 'absolute', 
          bottom: '40px', 
          right: '0',
          zIndex: 10, // Ensure dropdown shows above other content
        }}>
          {!isLoggedIn ? (
            <>
              <button 
                className="dropdown-item create-account-btn" 
                onClick={handleCreateAccount}
                disabled={creatingAccount || loading}  // Disable button during loading
              >
                {creatingAccount ? 'Creating account...' : 'Create Account'}
              </button>
              <button 
                className="dropdown-item login-btn" 
                onClick={handleLoginRedirect}
                disabled={loading}  // Disable button during loading
              >
                {loading ? 'Loading...' : 'Log in'}  {/* Show loading text */}
              </button>
            </>
          ) : (
            <>
              <button 
                className="dropdown-item logout-btn" 
                onClick={handleLogout}
                disabled={loading}  // Disable button during loading
              >
                {loading ? 'Logging out...' : 'Logout'}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Settings;
