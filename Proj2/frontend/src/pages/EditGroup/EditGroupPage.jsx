import React, { useState } from "react";
import Button from "../../components/common/Button/Button";
import { RESTAURANTS } from "../../utils/constants";
import "./EditGroupPage.css";

const EditGroupPage = ({ group, onSave, onCancel }) => {
  const [restaurantId, setRestaurantId] = useState(group.restaurant_id);
  const [deliveryLocation, setDeliveryLocation] = useState(group.deliveryLocation);
  const [nextOrderTime, setNextOrderTime] = useState(
    new Date(group.nextOrderTime).toISOString().slice(0,16)
  );

  const handleSave = () => {
    // Update group details
    onSave({
      ...group,
      restaurant_id: parseInt(restaurantId),
      deliveryLocation,
      nextOrderTime: new Date(nextOrderTime)
    });
  };

  return (
    <div className="edit-group-container">
      <h2>Edit Group Details</h2>

      <label>Restaurant</label>
      <select
        value={restaurantId}
        onChange={(e) => setRestaurantId(e.target.value)}
      >
        {RESTAURANTS.map(r => (
          <option key={r.id} value={r.id}>{r.name}</option>
        ))}
      </select>

      <label>Delivery Location</label>
      <input
        type="text"
        value={deliveryLocation}
        onChange={(e) => setDeliveryLocation(e.target.value)}
      />

      <label>Next Order Time</label>
      <input
        type="datetime-local"
        value={nextOrderTime}
        onChange={(e) => setNextOrderTime(e.target.value)}
      />

      <div className="edit-group-actions">
        <Button variant="success" onClick={handleSave}>Save Changes</Button>
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  );
};

export default EditGroupPage;
