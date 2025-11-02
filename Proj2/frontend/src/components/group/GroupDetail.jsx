import React, { useEffect, useState } from 'react';
import Button from '../common/Button/Button';
import './GroupDetail.css';
import MenuItemCard from '../restaurant/MenuItemCard';
import { useCart } from '../../context/CartContext';
import { RESTAURANTS, GROUP_POLLS } from '../../utils/constants';

const GroupDetail = ({ group, onClose, onEditGroup, onCreatePoll }) => {
  const [polls, setPolls] = useState(GROUP_POLLS[group.id] || []);
  const [showPolls, setShowPolls] = useState(false);
  const [selectedPoll, setSelectedPoll] = useState(null);
  const currentUser = "Alice"; // <- replace later with logged user
  const [orderItems, setOrderItems] = useState([]);
  const [timeLeft, setTimeLeft] = useState('');
  const { addToCart } = useCart();
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  useEffect(() => {
    if (!group?.nextOrderTime) return;
    const interval = setInterval(() => {
      const now = new Date();
      const distance = new Date(group.nextOrderTime) - now;
      if (distance <= 0) {
        setTimeLeft('00:00:00');
        clearInterval(interval);
      } else {
        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      }
    }, 1000);

    if (group?.restaurant_id) {
      const restaurant = RESTAURANTS.find(r => r.id === group.restaurant_id);
      console.log("Selected Restaurant:", restaurant);
      setSelectedRestaurant(restaurant);
    }



    return () => clearInterval(interval);
  }, [group]);


  if (!group) return null;

  const getStatus = () => {
    const membersCount = Array.isArray(group.members) ? group.members.length : 0;
    const max = group.maxMembers || 10;
    const now = new Date();
    const orderTime = new Date(group.nextOrderTime);
    if (membersCount >= max) return 'Full';
    if ((orderTime - now) / 60000 <= 15) return 'Closing soon';
    return 'Open';
  };

  const handleVote = (pollId, optionIndex) => {
    setPolls(prev => prev.map(p => {
      if (p.id !== pollId) return p;

      const updatedOptions = p.options.map((opt, i) => {
        let votes = opt.votes;

        // If user already voted this option, decrement previous vote
        if (p.votedUsers.includes(currentUser) && i === p.userVotedIndex) {
          votes -= 1;
        }

        // Increment new vote
        if (i === optionIndex) votes += 1;

        return { ...opt, votes };
      });

      return {
        ...p,
        options: updatedOptions,
        votedUsers: [...new Set([...p.votedUsers, currentUser])],
        userVotedIndex: optionIndex // track which option the user selected
      };
    }));
  };

  return (
    <div className="group-detail-card">
      {/* Header */}
      <div className="group-detail-header">
        <h2 className="group-detail-name">{group.name}</h2>

        <div className="group-detail-tags">
          {/* Status tag */}
          <span
            className="group-detail-status"
            style={{
              background:
                getStatus() === 'Full'
                  ? '#fee2e2'
                  : getStatus() === 'Closing soon'
                    ? '#fef3c7'
                    : '#d1fae5',
              color:
                getStatus() === 'Full'
                  ? '#b91c1c'
                  : getStatus() === 'Closing soon'
                    ? '#78350f'
                    : '#059669',
            }}
          >
            {getStatus()}
          </span>

          {/* Admin tag */}
          {group.organizer === currentUser && (
            <span className="group-detail-admin-tag">Admin</span>
          )}
        </div>
      </div>


      {/* Info */}
      <p className="group-detail-info"><strong>Restaurant:</strong> {selectedRestaurant?.name || "Loading..."}</p>
      <p className="group-detail-info"><strong>Organizer:</strong> {group.organizer}</p>
      <p className="group-detail-info">
        <strong>Members:</strong>{' '}
        {Array.isArray(group.members) ? group.members.join(', ') : group.members} (
        {Array.isArray(group.members) ? group.members.length : 0})
      </p>
      <p className="group-detail-info"><strong>Delivery Type:</strong> {group.deliveryType}</p>
      <p className="group-detail-info"><strong>Next Order:</strong> {new Date(group.nextOrderTime).toLocaleString()}</p>
      <p className="group-detail-info"><strong>Delivery Location:</strong> {group.deliveryLocation}</p>
      <p className="group-detail-info"><strong>Countdown:</strong> {timeLeft}</p>

      {/* Menu */}
      <h3 className="menu-title">Menu Items</h3>
      {selectedRestaurant ? (
        <div className="menu-grid">
          {selectedRestaurant.items.map(item => (
            <MenuItemCard
              key={item.id}
              item={item}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      ) : (
        <p>Loading menu...</p>
      )}

      {/* Toggle Polls Visibility */}
      <div style={{ margin: '10px 0' }}>
        <Button
          variant="secondary"
          onClick={() => setShowPolls(prev => !prev)}
        >
          {showPolls ? 'Hide Polls' : 'View Polls'}
        </Button>
      </div>

      {/* Polls */}
      <h3 className="poll-title">Group Polls</h3>
      {showPolls && (
        <div className="poll-section">
          {polls.length === 0 && <p>No polls yet.</p>}

          {polls.map(poll => (
            <div key={poll.id} className="poll-card">
              <p>{poll.question}</p>
              <p>Created By: {poll.createdBy} on {new Date(poll.createdOn).toLocaleString()}</p>

              {poll.options.map((opt, i) => (
                <button
                  key={i}
                  className={`poll-option ${poll.userVotedIndex === i ? "selected" : ""}`}
                  onClick={() => handleVote(poll.id, i)}
                >
                  {opt.text} — {opt.votes} votes
                </button>
              ))}
            </div>
          ))}
        </div>
      )}


      {/* Actions */}

      {/* Create a poll */}
      <div className="group-detail-actions">
        <Button
          variant="primary"
          onClick={() => onCreatePoll(group)}
          style={{ marginTop: '10px' }}
        >
          Create Poll
        </Button>
        <Button variant="success" onClick={() => alert('Place order')}>
          Place Order
        </Button>

        {/*Show Edit button only for group owner */}
        {group.organizer === "Alice" && (
          <Button
            variant="primary"
            onClick={() => onEditGroup(group)}
            style={{ marginTop: '10px' }}
          >
            Edit Group
          </Button>

        )}
        {onClose && <Button variant="secondary" onClick={onClose}>Close</Button>}
      </div>
    </div>
  );
};

export default GroupDetail;
