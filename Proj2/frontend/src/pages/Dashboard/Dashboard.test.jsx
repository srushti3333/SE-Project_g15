import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Dashboard from "./Dashboard";
import '@testing-library/jest-dom';

// Mock CartContext with internal mock function
jest.mock("../../context/CartContext.jsx", () => {
  const addToCart = jest.fn();
  return {
    useCart: () => ({ addToCart }),
    __esModule: true, // optional but sometimes required for ES modules
  };
});

// Mock Navbar and CartSidebar
jest.mock("../../components/common/Navbar/Navbar", () => () => <div />);
jest.mock("../../components/common/Cart/CartSidebar", () => () => <div />);

// Mock constants
jest.mock("../../utils/constants", () => ({
  RESTAURANTS: [
    {
      id: "1",
      name: "Test Restaurant 1",
      image: "🍔",
      rating: 4.5,
      location: "Test City",
      offers: "10% off",
      items: [
        { id: "item1", name: "Burger", price: 10 },
        { id: "item2", name: "Fries", price: 5 }
      ]
    },
    {
      id: "2",
      name: "Test Restaurant 2",
      image: "🍕",
      rating: 4.0,
      location: "Test Town",
      offers: "Free Drink",
      items: [
        { id: "item3", name: "Pizza", price: 12 },
      ]
    }
  ],
  PAGES: {
    HOME: "HOME",
    MY_GROUPS: "MY_GROUPS",
    FIND_GROUPS: "FIND_GROUPS",
    EDIT_GROUP: "EDIT_GROUP",
    CREATE_POLL: "CREATE_POLL"
  }
}));

// Mock API modules
jest.mock("../../api/groups", () => ({
  getUserGroups: jest.fn().mockResolvedValue([]),
  getAllGroups: jest.fn().mockResolvedValue([]),
  getGroupDetails: jest.fn().mockResolvedValue({
    id: "1",
    name: "Test Group",
    members: ["Alice"],
  }),
  joinGroup: jest.fn().mockResolvedValue({}),
}));

// ------------------------
// Tests
// ------------------------
describe("Dashboard Home Page", () => {
  test("renders 'Restaurants Near You' and all restaurant cards", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    expect(screen.getByText("Restaurants Near You")).toBeInTheDocument();
    expect(screen.getByText("Test Restaurant 1")).toBeInTheDocument();
    expect(screen.getByText("Test Restaurant 2")).toBeInTheDocument();
  });
});

describe("Dashboard Restaurant Detail Page", () => {
  test("clicking Add to Cart calls addToCart", () => {
    const { useCart } = require("../../context/CartContext.jsx");
    const { addToCart } = useCart(); // now we can access the internal mock

    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    // Open restaurant detail
    fireEvent.click(screen.getByText("Test Restaurant 1"));

    // Click "Add to Cart" for first item
    fireEvent.click(screen.getAllByText(/Add to Cart/i)[0]);
    expect(addToCart).toHaveBeenCalledWith({ id: "item1", name: "Burger", price: 10 });
  });
});
