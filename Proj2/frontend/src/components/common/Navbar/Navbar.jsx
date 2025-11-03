// src/components/common/Navbar/Navbar.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import './Navbar.css';

const Navbar = ({ currentPage, onPageChange }) => {
  const navigate = useNavigate();
  const { cartCount, setShowCart } = useCart();

  return (
    <nav className="dashboard-navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <h1 className="brand">FoodPool</h1>
          <button
            onClick={() => onPageChange('home')}
            className={`nav-button ${currentPage === 'home' ? 'active' : ''}`}
          >
            🏠 Home
          </button>
          <button
            onClick={() => onPageChange('mygroups')}
            className={`nav-button ${currentPage === 'mygroups' ? 'active' : ''}`}
          >
            👥 My Groups
          </button>
          <button
            onClick={() => onPageChange('findgroups')}
            className={`nav-button ${currentPage === 'findgroups' ? 'active' : ''}`}
          >
            🔍 Find Groups
          </button>
        </div>
        <div className="navbar-right">
          <button onClick={() => setShowCart(true)} className="cart-button">
            🛒
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>
          <button onClick={() => navigate('/login')} className="profile-button">
            👤
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;