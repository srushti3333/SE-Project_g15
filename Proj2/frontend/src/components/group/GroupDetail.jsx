// src/components/group/GroupDetail.jsx
import React, { useEffect, useState } from 'react';
import Button from '../common/Button/Button';
import './GroupDetail.css';
import MenuItemCard from '../restaurant/MenuItemCard';
import { useCart } from '../../context/CartContext';
import { RESTAURANTS } from '../../utils/constants';
import { getGroupPolls, voteOnPoll } from '../../api/groups';

const GroupDetail = ({ group, onClose, onEditGroup, onCreatePoll }) => {
  const [polls, setPolls] = useState([]);
  const [showPolls, setShowPolls] = useState(false);
  const [timeLeft, setTimeLeft] = useState('');
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  
  const currentUser = localStorage.getItem('username') || "Guest"; // Replace with actual logged-in user

  // Fetch polls when component mounts or showPolls changes
  useEffect(() => {
    if (showPolls && group?.id) {
      fetchPolls();
    }
  }, [showPolls, group?.id]);

  // Setup countdown timer
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

    return () => clearInterval(interval);
  }, [group?.nextOrderTime]);

  // Load restaurant data
  useEffect(() => {
    if (group?.restaurant_id) {
      const restaurant = RESTAURANTS.find(r => r.id === group.restaurant_id);
      setSelectedRestaurant(restaurant);
    }
  }, [group?.restaurant_id]);

  const fetchPolls = async () => {
    setLoading(true);
    try {
      const pollsData = await getGroupPolls(group.id);
      setPolls(pollsData);
    } catch (error) {
      console.error('Error fetching polls:', error);
      alert('Failed to load polls');
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (poll, optionIndex) => {
    try {
      const optionId = poll.options[optionIndex].id || optionIndex; // Fallback to index if no ID
      await voteOnPoll(poll.id, currentUser, optionId);
      
      // Refresh polls to show updated votes
      await fetchPolls();
    } catch (error) {
      console.error('Error voting on poll:', error);
      alert(error.response?.data?.error || 'Failed to vote');
    }
  };

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

  const getUserVotedOption = (poll) => {
    if (!poll.votedUsers || !poll.votedUsers.includes(currentUser)) {
      return -1;
    }
    // Find which option the user voted for
    // This requires additional backend logic to track user votes per option
    return -1; // For now, return -1
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
      <p className="group-detail-info">
        <strong>Restaurant:</strong> {selectedRestaurant?.name || "Loading..."}
      </p>
      <p className="group-detail-info">
        <strong>Organizer:</strong> {group.organizer}
      </p>
      <p className="group-detail-info">
        <strong>Members:</strong>{' '}
        {Array.isArray(group.members) ? group.members.join(', ') : group.members} (
        {Array.isArray(group.members) ? group.members.length : 0}/{group.maxMembers})
      </p>
      <p className="group-detail-info">
        <strong>Delivery Type:</strong> {group.deliveryType}
      </p>
      <p className="group-detail-info">
        <strong>Next Order:</strong> {new Date(group.nextOrderTime).toLocaleString()}
      </p>
      <p className="group-detail-info">
        <strong>Delivery Location:</strong> {group.deliveryLocation}
      </p>
      <p className="group-detail-info">
        <strong>Countdown:</strong> {timeLeft}
      </p>

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
      <div style={{ margin: '20px 0' }}>
        <Button
          variant="secondary"
          onClick={() => setShowPolls(prev => !prev)}
        >
          {showPolls ? 'Hide Polls' : 'View Polls'}
        </Button>
      </div>

      {/* Polls */}
      {showPolls && (
        <div className="poll-section">
          <h3 className="poll-title">Group Polls</h3>
          
          {loading ? (
            <p>Loading polls...</p>
          ) : polls.length === 0 ? (
            <p>No polls yet. Create one to get started!</p>
          ) : (
            polls.map(poll => {
              const userVotedIndex = getUserVotedOption(poll);
              
              return (
                <div key={poll.id} className="poll-card">
                  <p className="poll-question">{poll.question}</p>
                  <p className="poll-meta">
                    Created by {poll.createdBy} on {new Date(poll.createdOn).toLocaleString()}
                  </p>

                  <div className="poll-options">
                    {poll.options.map((opt, i) => (
                      <button
                        key={i}
                        className={`poll-option ${userVotedIndex === i ? "selected" : ""}`}
                        onClick={() => handleVote(poll, i)}
                      >
                        <span className="poll-option-text">{opt.text}</span>
                        <span className="poll-option-votes">{opt.votes} votes</span>
                      </button>
                    ))}
                  </div>

                  {poll.votedUsers && poll.votedUsers.length > 0 && (
                    <p className="poll-voters">
                      Voted: {poll.votedUsers.join(', ')}
                    </p>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Actions */}
      <div className="group-detail-actions">
        <Button
          variant="primary"
          onClick={() => onCreatePoll(group)}
        >
          Create Poll
        </Button>
        
        <Button variant="success" onClick={() => alert('Place order functionality coming soon!')}>
          Place Order
        </Button>

        {/* Show Edit button only for group owner */}
        {group.organizer === currentUser && (
          <Button
            variant="primary"
            onClick={() => onEditGroup(group)}
          >
            Edit Group
          </Button>
        )}
        
        {onClose && (
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        )}
      </div>
    </div>
  );
};

export default GroupDetail;