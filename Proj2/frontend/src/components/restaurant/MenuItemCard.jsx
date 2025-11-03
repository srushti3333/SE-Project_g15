// src/components/restaurant/MenuItemCard.jsx

import React from 'react';
import Button from '../common/Button/Button';
import './MenuItemCard.css';

const MenuItemCard = ({ item, onAddToCart }) => {
  return (
    <div className="menu-item">
      <div className="menu-item-header">
        <h4 className="menu-item-name">{item.name}</h4>
        <span className="menu-item-price">${item.price}</span>
      </div>
      <p className="menu-item-description">{item.description}</p>
      <Button 
        variant="primary" 
        size="small" 
        fullWidth
        onClick={() => onAddToCart(item)}
      >
        Add to Cart
      </Button>
    </div>
  );
};

export default MenuItemCard;