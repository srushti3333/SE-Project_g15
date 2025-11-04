// src/pages/Profile/Profile.jsx
import React, { useEffect, useState } from "react";
import { fetchProfile, updateProfile } from "../../api/profile";
import Navbar from "../../components/common/Navbar/Navbar"; // ✅ add this import
import "./Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchProfile();
        setProfile(data);
        setForm(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    loadProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await updateProfile(form);
      setProfile(form);
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      alert("Failed to update profile.");
    }
  };

  if (!profile) return <div className="profile">Loading profile...</div>;

  return (
    <>
      {/* ✅ Add Navbar but skip the props (safe mode for Profile page) */}
      <Navbar currentPage="profile"/>

      <div className="profile-container">
        <div className="profile-card">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="Profile"
            className="profile-photo"
          />
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
              <button onClick={handleSave}>💾 Save</button>
            </div>
          ) : (
            <div className="profile-info">
              <p>📍 {profile.city || "No city"}</p>
              <p>{profile.state || ""}</p>
              <p>{profile.pincode || ""}</p>
              <button onClick={() => setEditing(true)}>✏️ Edit Profile</button>
            </div>
          )}

          <hr />
          <h3>🧾 Past Orders</h3>
          <ul className="order-history">
            <li>Pizza Palace - $450</li>
            <li>Sushi House - $850</li>
            <li>Burger Point - $320</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Profile;
