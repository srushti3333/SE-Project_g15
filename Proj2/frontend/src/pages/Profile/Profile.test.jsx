// src/pages/Profile/Profile.test.jsx
import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Profile from "./Profile";
import { MemoryRouter } from "react-router-dom";
import { fetchProfile, updateProfile } from "../../api/profile";
import { getPastOrders } from "../../api/orders";

// 🧠 Mock the API modules
jest.mock("../../api/profile");
jest.mock("../../api/orders");

// 🧭 Mock the navigate hook from react-router-dom
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// 🪄 Mock Button and Navbar components to simplify DOM
jest.mock("../../components/common/Button/Button", () => (props) => (
  <button onClick={props.onClick}>{props.children}</button>
));

jest.mock("../../components/common/Navbar/Navbar", () => () => (
  <div data-testid="navbar">Mock Navbar</div>
));

describe("Profile Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state and then profile info", async () => {
    // Mock profile and orders API responses
    fetchProfile.mockResolvedValue({
      username: "testuser",
      email: "test@example.com",
      city: "TestCity",
      state: "TS",
      pincode: "12345",
    });
    getPastOrders.mockResolvedValue([]);

    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    // Initially show loading
    expect(screen.getByText(/Loading profile/i)).toBeInTheDocument();

    // Wait for profile to load
    await waitFor(() =>
      expect(screen.getByText("testuser")).toBeInTheDocument()
    );

    // Verify key fields
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
    expect(screen.getByText(/TestCity/i)).toBeInTheDocument();
  });

  test("allows editing and saving profile", async () => {
    fetchProfile.mockResolvedValue({
      username: "testuser",
      email: "test@example.com",
      city: "OldCity",
    });
    getPastOrders.mockResolvedValue([]);
    updateProfile.mockResolvedValue({ profile_picture: "updated.png" });

    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText("testuser"));

    fireEvent.click(screen.getByText(/Edit Profile/i));
    const cityInput = screen.getByPlaceholderText("City");
    fireEvent.change(cityInput, { target: { value: "NewCity" } });

    fireEvent.click(screen.getByText(/Save/i));

    await waitFor(() =>
      expect(updateProfile).toHaveBeenCalledTimes(1)
    );
  });

  test("toggles past orders section", async () => {
    fetchProfile.mockResolvedValue({
      username: "testuser",
      email: "test@example.com",
    });

    getPastOrders.mockResolvedValue([
      {
        orderId: 1,
        orderDate: "2025-11-06T12:00:00.000Z",
        groupName: "Lunch Pool",
        restaurantId: 1,
        items: [
          { id: 1, menuItemId: 1, quantity: 2 },
          { id: 2, menuItemId: 2, quantity: 1 },
        ],
      },
    ]);

    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText("testuser"));

    // Initially hidden
    expect(screen.queryByText("Lunch Pool")).not.toBeInTheDocument();

    // Click to expand
    fireEvent.click(screen.getByText(/Past Orders/i));

    expect(await screen.findByText("Lunch Pool")).toBeInTheDocument();
  });

  test("handles logout properly", async () => {
    fetchProfile.mockResolvedValue({
      username: "testuser",
      email: "test@example.com",
    });
    getPastOrders.mockResolvedValue([]);

    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText("testuser"));

    // Mock localStorage and alert
    const removeItemSpy = jest.spyOn(Storage.prototype, "removeItem");
    window.alert = jest.fn();

    fireEvent.click(screen.getByText("Logout"));

    expect(removeItemSpy).toHaveBeenCalledWith("token");
    expect(window.alert).toHaveBeenCalledWith("You have been logged out.");
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
