// src/components/home/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Home.css'; // Ensure you have the necessary styles

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Welcome to the Home Page</h1>
        <p>Discover new posts and connect with people</p>
        {/* Link to the Profile page */}
        <Link to="/profile">
          <button className="profile-button">Go to Profile</button>
        </Link>
      </div>

      <div className="home-content">
        {/* Feed or content will go here */}
        <p>Here will be a list of posts, updates, or content on the Home page.</p>
      </div>
    </div>
  );
};

export default Home;
