// src/pages/Profile/Profile.jsx
import React, { useEffect, useState } from "react";
import { fetchProfile, updateProfile } from "../../api/profile";
import Navbar from "../../components/common/Navbar/Navbar";
import "./Profile.css";
import { getPastOrders } from "../../api/orders";
import { RESTAURANTS } from "../../utils/constants";
import Button from "../../components/common/Button/Button";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [orders, setOrders] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);


  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchProfile();
        setProfile(data);
        setForm(data);

        // Fetch past orders
        const pastOrders = await getPastOrders();
        setOrders(pastOrders);
      } catch (error) {
        console.error("Error fetching profile or orders:", error);
      }
    };
    loadProfile();
  }, []);

  // Helper to get item name from restaurant menu
  const getItemName = (restaurantId, itemId) => {
    const restaurant = RESTAURANTS.find(r => r.id === restaurantId);
    if (!restaurant) return `Item ID: ${itemId}`;
    const item = restaurant.items.find(i => i.id === itemId);
    return item ? item.name : `Item ID: ${itemId}`;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setForm({ ...form, profile_picture: file });
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      for (const key in form) {
        if (form[key] !== undefined && form[key] !== null) {
          formData.append(key, form[key]);
        }
      }

      if (selectedFile) {
        formData.append("profile_picture", selectedFile);
      }

      const updated = await updateProfile(formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setProfile({ ...form, profile_picture: updated.profile_picture || previewUrl });
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update profile.");
    }
  };


  if (!profile) return <div className="profile">Loading profile...</div>;

  return (
    <>
      <Navbar currentPage="profile" />

      <div className="profile-container">
        <div className="profile-card">
          <img
            src={previewUrl || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
            alt="Profile"
            className="profile-photo"
          />
          {editing && (
            <input type="file" accept="image/*" onChange={handleFileChange} />
          )}

          <h2>{profile.username}</h2>
          <p className="profile-email">{profile.email}</p>

          <hr />

          {editing ? (
            <div className="profile-form">
              <input
                name="full_name"
                placeholder="Full Name"
                value={form.full_name || ""}
                onChange={handleChange}
              />
              <input
                name="city"
                placeholder="City"
                value={form.city || ""}
                onChange={handleChange}
              />
              <input
                name="state"
                placeholder="State"
                value={form.state || ""}
                onChange={handleChange}
              />
              <input
                name="pincode"
                placeholder="Pincode"
                value={form.pincode || ""}
                onChange={handleChange}
              />
              <Button onClick={handleSave}>💾 Save</Button>
            </div>
          ) : (
            <div className="profile-info">
              <p>📍 {profile.city || "No Location Info"}</p>
              <p>{profile.state || ""}</p>
              <p>{profile.pincode || ""}</p>
              <Button onClick={() => setEditing(true)}>✏️ Edit Profile</Button>
            </div>
          )}

          <hr />
          <h3>🧾 Past Orders</h3>
          <div className="orders-container">
            {orders.length === 0 && <p>No past orders yet.</p>}
            {orders.map(order => {
              const date = new Date(order.orderDate.split('.')[0]);
              return (
                <div key={order.orderId} className="order-card">
                  <div className="order-header">
                    <span className="order-group">{order.groupName}</span>
                    <span className="order-date">{date.toLocaleDateString()}</span>
                  </div>
                  <ul className="order-items">
                    {order.items.map(item => (
                      <li key={item.id} className="order-item">
                        <span className="order-item-name">{getItemName(order.restaurantId, item.menuItemId)}</span>
                        <span className="order-item-qty">Qty: {item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;