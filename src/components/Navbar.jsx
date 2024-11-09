// src/components/Navbar.js
import React from 'react';
import { FaCommentAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Navbar.css';  // Import the CSS file

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <div className="container-fluid">
        <div className="d-flex">
          {/* Messenger Icon */}
          <Link to="/messenger" className="nav-item text-white messenger-icon">
            <FaCommentAlt size={30} />
          </Link>
          {/* Other Navbar items */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
