// src/pages/Dashboard/Dashboard.jsx

import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import Navbar from '../../components/common/Navbar/Navbar';
import CartSidebar from '../../components/common/Cart/CartSidebar';
import RestaurantCard from '../../components/restaurant/RestaurantCard';
import MenuItemCard from '../../components/restaurant/MenuItemCard';
import GroupCard from '../../components/group/GroupCard';
import Button from '../../components/common/Button/Button';
import { RESTAURANTS, GROUPS, PAGES } from '../../utils/constants';
import './Dashboard.css';

function Dashboard() {
  const [currentPage, setCurrentPage] = useState(PAGES.HOME);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const { addToCart } = useCart();

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedRestaurant(null);
  };

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const handleBackToRestaurants = () => {
    setSelectedRestaurant(null);
  };

  return (
    <div className="dashboard-container">
      <Navbar currentPage={currentPage} onPageChange={handlePageChange} />

      <div className="main-content">
        {/* Home Page - Restaurant List */}
        {currentPage === PAGES.HOME && !selectedRestaurant && (
          <div>
            <h2 className="page-title">Restaurants Near You</h2>
            <div className="restaurant-grid">
              {RESTAURANTS.map(restaurant => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  onClick={handleRestaurantClick}
                />
              ))}
            </div>
          </div>
        )}

        {/* Home Page - Restaurant Detail */}
        {currentPage === PAGES.HOME && selectedRestaurant && (
          <div>
            <Button 
              variant="secondary" 
              onClick={handleBackToRestaurants}
              className="back-button"
            >
              ← Back to Restaurants
            </Button>
            
            <div className="restaurant-detail">
              <div className="restaurant-header">
                <div className="restaurant-emoji-large">{selectedRestaurant.image}</div>
                <div>
                  <h2 className="restaurant-title">{selectedRestaurant.name}</h2>
                  <div className="restaurant-info">
                    <span>⭐ {selectedRestaurant.rating}</span>
                    <span>📍 {selectedRestaurant.location}</span>
                  </div>
                  <div className="restaurant-offer-large">{selectedRestaurant.offers}</div>
                </div>
              </div>
            </div>

            <h3 className="menu-title">Menu Items</h3>
            <div className="menu-grid">
              {selectedRestaurant.items.map(item => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </div>
        )}

        {/* My Groups Page */}
        {currentPage === PAGES.MY_GROUPS && (
          <div>
            <h2 className="page-title">My Groups</h2>
            <div className="groups-grid">
              {GROUPS.slice(0, 2).map(group => (
                <GroupCard
                  key={group.id}
                  group={group}
                  isJoinable={false}
                  onAction={() => console.log('View group:', group.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Find Groups Page */}
        {currentPage === PAGES.FIND_GROUPS && (
          <div>
            <h2 className="page-title">Find Groups</h2>
            <div className="groups-grid">
              {GROUPS.map(group => (
                <GroupCard
                  key={group.id}
                  group={group}
                  isJoinable={true}
                  onAction={() => console.log('Join group:', group.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <CartSidebar selectedRestaurant={selectedRestaurant} />
    </div>
  );
}

export default Dashboard;