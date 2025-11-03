// import axios from './axios';

// // returns all groups user is part of
// export const getUserGroups = async () => {
//   const response = await axios.get('/groups/my-groups');
//   return response.data;
// };

// // returns details of a single group
// export const getGroupDetails = async (groupId) => {
//   const response = await axios.get(`/groups/${groupId}`);
//   return response.data;
// };

// // place order in that group
// export const placeGroupOrder = async (groupId, orderData) => {
//   const response = await axios.post(`/groups/${groupId}/orders`, orderData);
//   return response.data;
// };

import { GROUPS, GROUP_DETAILS } from '../utils/constants';

// Mock: returns all groups the user is part of
export const getUserGroups = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(GROUP_DETAILS), 500); // simulate network delay
  });
};

// Mock: returns details of a single group
export const getGroupDetails = async (groupId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = GROUP_DETAILS[groupId];
      data ? resolve(data) : reject({ message: 'Group not found' });
    }, 500);
  });
};

// Mock: place order in that group
export const placeGroupOrder = async (groupId, orderData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!GROUP_DETAILS[groupId]) return reject({ message: 'Group not found' });
      // For mock purposes, just return the order summary
      resolve({ groupId, items: orderData.items, status: 'success' });
    }, 500);
  });
};