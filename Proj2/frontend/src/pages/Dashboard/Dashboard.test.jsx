// src/pages/Dashboard/Dashboard.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Dashboard from "./Dashboard";
import '@testing-library/jest-dom';

// ------------------------
// Mock localStorage FIRST
// ------------------------
const localStorageMock = {
  getItem: jest.fn((key) => {
    if (key === 'username') return 'Guest';
    return null;
  }),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;

// ------------------------
// Mock CartContext
// ------------------------
const mockAddToCart = jest.fn();
jest.mock("../../context/CartContext.jsx", () => ({
    useCart: () => ({ addToCart: mockAddToCart }),
    __esModule: true,
}));

// ------------------------
// Mock API modules - Create mock functions that can be configured per test
// ------------------------
const mockGetUserGroups = jest.fn();
const mockGetAllGroups = jest.fn();
const mockGetGroupDetails = jest.fn();
const mockJoinGroup = jest.fn();

jest.mock("../../api/groups", () => ({
    getUserGroups: (username) => mockGetUserGroups(username),
    getAllGroups: () => mockGetAllGroups(),
    getGroupDetails: (id) => mockGetGroupDetails(id),
    joinGroup: (id, username) => mockJoinGroup(id, username),
}));

// ------------------------
// Mock Navbar and CartSidebar
// ------------------------
jest.mock("../../components/common/Navbar/Navbar", () => ({ currentPage, onPageChange }) => (
    <div data-testid="navbar">
        <button onClick={() => onPageChange("home")}>Home</button>
        <button onClick={() => onPageChange("mygroups")}>My Groups</button>
        <button onClick={() => onPageChange("findgroups")}>Find Groups</button>
    </div>
));

jest.mock("../../components/common/Cart/CartSidebar", () => () => <div data-testid="cart-sidebar" />);

// ------------------------
// Mock constants - Use the actual PAGES values from constants.js
// ------------------------
jest.mock("../../utils/constants", () => ({
    RESTAURANTS: [
        {
            id: 1,
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
            id: 2,
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
        HOME: "home",
        MY_GROUPS: "mygroups",
        FIND_GROUPS: "findgroups",
        EDIT_GROUP: "editgroup",
        CREATE_POLL: "createpoll"
    }
}));

jest.mock("../../components/group/GroupCard", () => ({ group, onAction, actionLabel }) => (
  <div data-testid={`group-card-${group.id}`}>
    <span>{group.name}</span>
    <button onClick={onAction}>{actionLabel}</button>
  </div>
));

// Mock other components that might be needed
jest.mock("../../components/restaurant/RestaurantCard", () => ({ restaurant, onClick }) => (
  <div data-testid={`restaurant-card-${restaurant.id}`} onClick={() => onClick(restaurant)}>
    <span>{restaurant.name}</span>
  </div>
));

jest.mock("../../components/restaurant/MenuItemCard", () => ({ item, onAddToCart }) => (
  <div data-testid={`menu-item-${item.id}`}>
    <span>{item.name}</span>
    <button onClick={() => onAddToCart(item)}>Add to Cart</button>
  </div>
));

jest.mock("../../components/common/Button/Button", () => ({ children, onClick, variant, className }) => (
  <button 
    onClick={onClick} 
    className={`btn btn-${variant} ${className || ''}`}
    type="button"
  >
    {children}
  </button>
));

// ------------------------
// Tests
// ------------------------
describe("Dashboard Home Page", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

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
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("clicking Add to Cart calls addToCart", async () => {
        render(
            <MemoryRouter>
                <Dashboard />
            </MemoryRouter>
        );

        // Open restaurant detail
        fireEvent.click(screen.getByText("Test Restaurant 1"));

        // Wait for menu items to appear
        await waitFor(() => {
            expect(screen.getByText("Burger")).toBeInTheDocument();
        });

        // Click "Add to Cart" for first item
        fireEvent.click(screen.getAllByText(/Add to Cart/i)[0]);
        expect(mockAddToCart).toHaveBeenCalledWith({ id: "item1", name: "Burger", price: 10 });
    });
});

describe("Dashboard Navbar Navigation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Configure mocks with test data
    mockGetUserGroups.mockResolvedValue([
      {
        id: 1,
        name: "Office Lunch Crew",
        restaurant: "Pizza Palace",
        members: ["Alice", "Bob"],
        deliveryType: "Doorstep",
        nextOrderTime: new Date(),
        deliveryLocation: "Office Lobby",
        maxMembers: 10
      }
    ]);
    
    mockGetAllGroups.mockResolvedValue([]);
  });

  test("clicking navbar buttons switches views correctly", async () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    // ===== HOME VIEW =====
    // Verify home view shows restaurants initially
    expect(screen.getByText("Restaurants Near You")).toBeInTheDocument();
    expect(screen.getByText("Test Restaurant 1")).toBeInTheDocument();

    // ===== MY GROUPS VIEW =====
    // Click 'My Groups' button
    fireEvent.click(screen.getByRole("button", { name: "My Groups" }));

    // Wait for the page title to change (use getByRole to be specific)
    await waitFor(() => {
      expect(screen.getByRole("heading", { name: "My Groups" })).toBeInTheDocument();
    });

    // Verify getUserGroups was called with correct username
    expect(mockGetUserGroups).toHaveBeenCalledWith('Guest');

    // Wait for the group to appear
    await waitFor(() => {
      expect(screen.getByText("Office Lunch Crew")).toBeInTheDocument();
    });

    // Verify empty state is NOT shown
    expect(screen.queryByText("You haven't joined any groups yet.")).not.toBeInTheDocument();

    // Verify home content is NOT visible
    expect(screen.queryByText("Restaurants Near You")).not.toBeInTheDocument();

    // ===== FIND GROUPS VIEW =====
    // Click 'Find Groups' button
    fireEvent.click(screen.getByRole("button", { name: "Find Groups" }));

    // Wait for Find Groups page title (use getByRole to be specific)
    await waitFor(() => {
      expect(screen.getByRole("heading", { name: "Find Groups" })).toBeInTheDocument();
    });

    // Verify getAllGroups was called
    expect(mockGetAllGroups).toHaveBeenCalled();

    // Wait for the empty state to appear (since mockGetAllGroups returns empty array)
    await waitFor(() => {
      expect(screen.getByText("No groups available to join right now.")).toBeInTheDocument();
    });

    // Verify My Groups content is NOT visible
    expect(screen.queryByText("Office Lunch Crew")).not.toBeInTheDocument();

    // ===== BACK TO HOME =====
    // Click 'Home' button
    fireEvent.click(screen.getByRole("button", { name: "Home" }));

    // Verify we're back to home view
    await waitFor(() => {
      expect(screen.getByText("Restaurants Near You")).toBeInTheDocument();
    });

    // Verify Find Groups content is NOT visible
    expect(screen.queryByText("No groups available to join right now.")).not.toBeInTheDocument();
  });
});