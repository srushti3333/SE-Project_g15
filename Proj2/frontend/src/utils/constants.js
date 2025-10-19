// src/utils/constants.js

// Mock restaurant data
export const RESTAURANTS = [
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

// Mock groups data
export const GROUPS = [
  { id: 1, name: "Office Lunch Crew", members: 8, nextOrder: "Today 12:30 PM" },
  { id: 2, name: "Weekend Foodies", members: 12, nextOrder: "Saturday 7:00 PM" },
  { id: 3, name: "Study Group Eats", members: 5, nextOrder: "Tomorrow 6:00 PM" }
];

// Mock nearby pools data
export const NEARBY_POOLS = [
  {
    id: 1,
    restaurantName: "Pizza Palace",
    restaurantEmoji: "🍕",
    organizerName: "John D.",
    currentMembers: 3,
    maxMembers: 8,
    timeRemaining: "12 min",
    estimatedSavings: 4.50,
    deliveryLocation: "Building A, Floor 3",
    distance: "0.2 km"
  },
  {
    id: 2,
    restaurantName: "Pizza Palace",
    restaurantEmoji: "🍕",
    organizerName: "Sarah M.",
    currentMembers: 5,
    maxMembers: 10,
    timeRemaining: "8 min",
    estimatedSavings: 5.20,
    deliveryLocation: "Main Campus Center",
    distance: "0.4 km"
  },
  {
    id: 3,
    restaurantName: "Pizza Palace",
    restaurantEmoji: "🍕",
    organizerName: "Mike R.",
    currentMembers: 2,
    maxMembers: 6,
    timeRemaining: "15 min",
    estimatedSavings: 3.80,
    deliveryLocation: "Library Building",
    distance: "0.6 km"
  }
];

// Configuration constants
export const CONFIG = {
  DELIVERY_FEE: 5.99,
  ESTIMATED_DELIVERY_TIME: "30-40 min",
  DEFAULT_POOL_TIME_LIMIT: 15,
  DEFAULT_MAX_MEMBERS: 8,
  MIN_POOL_TIME: 5,
  MAX_POOL_TIME: 30,
  MIN_POOL_MEMBERS: 2,
  MAX_POOL_MEMBERS: 15
};

// Page names
export const PAGES = {
  HOME: 'home',
  MY_GROUPS: 'mygroups',
  FIND_GROUPS: 'findgroups'
};

// Order options
export const ORDER_OPTIONS = {
  NOW: 'now',
  CREATE: 'create',
  JOIN: 'join'
};