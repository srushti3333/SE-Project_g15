import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

// Mock data
const restaurants = [
  {
    id: 1,
    name: "Pizza Palace",
    rating: 4.5,
    location: "Downtown",
    offers: "20% off on orders above $30",
    image: "🍕",
    items: [
      { id: 1, name: "Margherita Pizza", price: 12.99, description: "Classic tomato and mozzarella" },
      { id: 2, name: "Pepperoni Pizza", price: 14.99, description: "Loaded with pepperoni" },
      { id: 3, name: "Veggie Supreme", price: 13.99, description: "Fresh vegetables and cheese" }
    ]
  },
  {
    id: 2,
    name: "Burger Barn",
    rating: 4.3,
    location: "Midtown",
    offers: "Free delivery on first order",
    image: "🍔",
    items: [
      { id: 4, name: "Classic Burger", price: 9.99, description: "Beef patty with lettuce and tomato" },
      { id: 5, name: "Cheese Burger", price: 10.99, description: "Double cheese goodness" },
      { id: 6, name: "Veggie Burger", price: 8.99, description: "Plant-based patty" }
    ]
  },
  {
    id: 3,
    name: "Sushi Station",
    rating: 4.7,
    location: "Uptown",
    offers: "Buy 2 Get 1 Free on rolls",
    image: "🍣",
    items: [
      { id: 7, name: "California Roll", price: 11.99, description: "Crab, avocado, cucumber" },
      { id: 8, name: "Spicy Tuna Roll", price: 13.99, description: "Fresh tuna with spicy mayo" },
      { id: 9, name: "Dragon Roll", price: 15.99, description: "Eel and avocado" }
    ]
  },
  {
    id: 4,
    name: "Taco Town",
    rating: 4.4,
    location: "West Side",
    offers: "Happy Hour: 3-6 PM",
    image: "🌮",
    items: [
      { id: 10, name: "Beef Tacos", price: 8.99, description: "Three seasoned beef tacos" },
      { id: 11, name: "Chicken Tacos", price: 8.99, description: "Grilled chicken tacos" },
      { id: 12, name: "Fish Tacos", price: 9.99, description: "Crispy fish tacos" }
    ]
  }
];

const groups = [
  { id: 1, name: "Office Lunch Crew", members: 8, nextOrder: "Today 12:30 PM" },
  { id: 2, name: "Weekend Foodies", members: 12, nextOrder: "Saturday 7:00 PM" },
  { id: 3, name: "Study Group Eats", members: 5, nextOrder: "Tomorrow 6:00 PM" }
];

function Dashboard() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (item) => {
    const existing = cart.find(cartItem => cartItem.id === item.id);
    if (existing) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    const existing = cart.find(cartItem => cartItem.id === itemId);
    if (existing.quantity === 1) {
      setCart(cart.filter(cartItem => cartItem.id !== itemId));
    } else {
      setCart(cart.map(cartItem => 
        cartItem.id === itemId 
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ));
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="dashboard-navbar">
        <div className="navbar-content">
          <div className="navbar-left">
            <h1 className="brand">FoodPool</h1>
            <button
              onClick={() => { setCurrentPage('home'); setSelectedRestaurant(null); }}
              className={`nav-button ${currentPage === 'home' ? 'active' : ''}`}
            >
              🏠 Home
            </button>
            <button
              onClick={() => { setCurrentPage('mygroups'); setSelectedRestaurant(null); }}
              className={`nav-button ${currentPage === 'mygroups' ? 'active' : ''}`}
            >
              👥 My Groups
            </button>
            <button
              onClick={() => { setCurrentPage('findgroups'); setSelectedRestaurant(null); }}
              className={`nav-button ${currentPage === 'findgroups' ? 'active' : ''}`}
            >
              🔍 Find Groups
            </button>
          </div>
          <div className="navbar-right">
            <button onClick={() => setShowCart(!showCart)} className="cart-button">
              🛒
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
            <button onClick={() => navigate('/login')} className="profile-button">
              👤
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        {currentPage === 'home' && !selectedRestaurant && (
          <div>
            <h2 className="page-title">Restaurants Near You</h2>
            <div className="restaurant-grid">
              {restaurants.map(restaurant => (
                <div
                  key={restaurant.id}
                  onClick={() => setSelectedRestaurant(restaurant)}
                  className="restaurant-card"
                >
                  <div className="restaurant-emoji">{restaurant.image}</div>
                  <h3 className="restaurant-name">{restaurant.name}</h3>
                  <div className="restaurant-rating">⭐ {restaurant.rating}</div>
                  <div className="restaurant-location">📍 {restaurant.location}</div>
                  <div className="restaurant-offer">{restaurant.offers}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentPage === 'home' && selectedRestaurant && (
          <div>
            <button onClick={() => setSelectedRestaurant(null)} className="back-button">
              ← Back to Restaurants
            </button>
            
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
                <div key={item.id} className="menu-item">
                  <div className="menu-item-header">
                    <h4 className="menu-item-name">{item.name}</h4>
                    <span className="menu-item-price">${item.price}</span>
                  </div>
                  <p className="menu-item-description">{item.description}</p>
                  <button onClick={() => addToCart(item)} className="add-to-cart-button">
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentPage === 'mygroups' && (
          <div>
            <h2 className="page-title">My Groups</h2>
            <div className="groups-grid">
              {groups.slice(0, 2).map(group => (
                <div key={group.id} className="group-card">
                  <div className="group-header">
                    <h3 className="group-name">{group.name}</h3>
                    <span className="group-icon">👥</span>
                  </div>
                  <p className="group-members">{group.members} members</p>
                  <p className="group-next-order">Next Order: {group.nextOrder}</p>
                  <button className="group-button">View Group</button>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentPage === 'findgroups' && (
          <div>
            <h2 className="page-title">Find Groups</h2>
            <div className="groups-grid">
              {groups.map(group => (
                <div key={group.id} className="group-card">
                  <div className="group-header">
                    <h3 className="group-name">{group.name}</h3>
                    <span className="group-icon">👥</span>
                  </div>
                  <p className="group-members">{group.members} members</p>
                  <p className="group-next-order">Next Order: {group.nextOrder}</p>
                  <button className="group-button join">Join Group</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="cart-overlay" onClick={() => setShowCart(false)}>
          <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h2>Your Cart</h2>
              <button onClick={() => setShowCart(false)} className="close-cart">✕</button>
            </div>

            {cart.length === 0 ? (
              <p className="empty-cart">Your cart is empty</p>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-header">
                        <h4>{item.name}</h4>
                        <span className="cart-item-total">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                      <div className="cart-item-controls">
                        <div className="quantity-controls">
                          <button onClick={() => removeFromCart(item.id)} className="qty-button minus">−</button>
                          <span className="quantity">{item.quantity}</span>
                          <button onClick={() => addToCart(item)} className="qty-button plus">+</button>
                        </div>
                        <span className="unit-price">${item.price} each</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-footer">
                  <div className="cart-total">
                    <span>Total:</span>
                    <span className="total-amount">${cartTotal.toFixed(2)}</span>
                  </div>
                  <button className="checkout-button">Checkout</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
