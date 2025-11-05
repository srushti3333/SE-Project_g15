import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Dashboard from "./Dashboard";
import '@testing-library/jest-dom';


// Mock CartContext
jest.mock("../../context/CartContext.jsx", () => ({
  useCart: () => ({ addToCart: jest.fn() }),
}));

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

// Mock API modules that use axios
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

  test("clicking a restaurant card shows restaurant detail page", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Test Restaurant 1"));

    expect(screen.getByText("Test Restaurant 1")).toBeInTheDocument();
    expect(screen.getByText("⭐ 4.5")).toBeInTheDocument();
    expect(screen.getByText("📍 Test City")).toBeInTheDocument();

    expect(screen.getByText("Burger")).toBeInTheDocument();
    expect(screen.getByText("Fries")).toBeInTheDocument();
  });

  test("back button returns to restaurant list", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Test Restaurant 1"));
    fireEvent.click(screen.getByText("← Back to Restaurants"));

    expect(screen.getByText("Restaurants Near You")).toBeInTheDocument();
  });

});
