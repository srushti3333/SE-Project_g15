import React from 'react';
import './GroupCard.css';
import Button from '../common/Button/Button';

const GroupCard = ({ group, onAction, actionLabel }) => {
  return (
    <div className="group-card p-4 border rounded shadow hover:shadow-lg cursor-pointer">
      <h3 className="font-semibold text-lg">{group.name}</h3>
      <p>{group.members.length} members</p>
      <p>Next order: {group.nextOrder}</p>
      <Button
        variant="primary"
        onClick={() => onAction(group)}
        className="mt-2"
      >
        {actionLabel || 'View Group'}
      </Button>
    </div>
  );
};

export default GroupCard;
