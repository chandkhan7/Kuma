import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCog } from 'react-icons/fa';

function Settings({ isLoggedIn, setIsLoggedIn }) {
  const [showSettings, setShowSettings] = useState(false);
  const [loading, setLoading] = useState(false);  
  const [creatingAccount, setCreatingAccount] = useState(false);  
  const [themeColor, setThemeColor] = useState(localStorage.getItem('themeColor') || 'dark');  // Default theme is dark
  const navigate = useNavigate();

  useEffect(() => {
    // Apply the selected theme to the body element 
    document.body.className = themeColor;
    switch(themeColor) {
      case 'light':
        document.body.style.backgroundColor = '#f0f0f0'; // Light theme background
        break;
      case 'blue':
        document.body.style.backgroundColor = '#1e3a8a'; // Blue theme background
        break;
      default:
        document.body.style.backgroundColor = '#121212'; // Dark theme background
    }
    // Save the theme color in localStorage to persist the theme
    localStorage.setItem('themeColor', themeColor);
  }, [themeColor]);

  const toggleSettings = () => {
    setShowSettings((prev) => !prev);
  };

  const handleLoginRedirect = () => {
    setLoading(true);  
    setTimeout(() => {
      setLoading(false);  
      navigate('/login');
    }, 1000);  
  };

  const handleLogout = () => {
    setLoading(true);  
    setTimeout(() => {
      localStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
      navigate('/login');  
    }, 1000);  
  };

  const handleCreateAccount = () => {
    setCreatingAccount(true);  
    setTimeout(() => {
      setCreatingAccount(false);  
      navigate('/signup');  
    }, 1000);  
  };

  const handleThemeChange = (color) => {
    setThemeColor(color);  // Update the theme color state
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
          zIndex: 10, 
        }}>
          {!isLoggedIn ? (
            <>
              <button 
                className="dropdown-item create-account-btn" 
                onClick={handleCreateAccount}
                disabled={creatingAccount || loading}  
              >
                {creatingAccount ? 'Creating account...' : 'Create Account'}
              </button>
              <button 
                className="dropdown-item login-btn" 
                onClick={handleLoginRedirect}
                disabled={loading}  
              >
                {loading ? 'Loading...' : 'Log in'}  
              </button>
            </>
          ) : (
            <>
              <button 
                className="dropdown-item logout-btn" 
                onClick={handleLogout}
                disabled={loading}  
              >
                {loading ? 'Logging out...' : 'Logout'}
              </button>
            </>
          )}

          {/* Theme color change options */}
          <div className="dropdown-divider my-2"></div>
          <p className="theme-title">Change Theme Color</p>
          <div className="theme-options">
            <button 
              className={`theme-btn ${themeColor === 'dark' ? 'active' : ''}`} 
              onClick={() => handleThemeChange('dark')}
            >
              Dark Theme
            </button>
            <button 
              className={`theme-btn ${themeColor === 'light' ? 'active' : ''}`} 
              onClick={() => handleThemeChange('light')}
            >
              Light Theme
            </button>
            <button 
              className={`theme-btn ${themeColor === 'blue' ? 'active' : ''}`} 
              onClick={() => handleThemeChange('blue')}
            >
              Blue Theme
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
