// src/components/group/GroupCard.jsx

import React from 'react';
import Button from '../common/Button/Button';
import './GroupCard.css';

const GroupCard = ({ group, isJoinable = false, onAction }) => {
  return (
    <div className="group-card">
      <div className="group-header">
        <h3 className="group-name">{group.name}</h3>
        <span className="group-icon">👥</span>
      </div>
      <p className="group-members">{group.members} members</p>
      <p className="group-next-order">Next Order: {group.nextOrder}</p>
      <Button 
        variant={isJoinable ? "success" : "primary"}
        size="medium"
        fullWidth
        onClick={onAction}
      >
        {isJoinable ? 'Join Group' : 'View Group'}
      </Button>
    </div>
  );
};

export default GroupCard;